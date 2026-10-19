import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDemoStore } from '@/store/demoStore';
import type { VerificationPreferenceOption } from '@/types';

export type SortOption = 'best_match' | 'rating' | 'most_jobs';

const SYNONYMS: Record<string, string[]> = {
  plumber: ['leak', 'pipe', 'tap', 'drain', 'water', 'shower', 'sink', 'toilet', 'tank', 'fitting', 'plumb'],
  electrician: ['wire', 'wiring', 'power', 'light', 'breaker', 'fuse', 'socket', 'generator', 'ups', 'switch', 'electric'],
  'tv repair': ['tv', 'television', 'screen', 'led', 'oled', 'display', 'motherboard', 'appliance', 'sound', 'audio', 'electronics'],
  painter: ['paint', 'wall', 'stucco', 'color', 'coating', 'plaster', 'brush', 'ceiling', 'decor'],
  carpenter: ['wood', 'furniture', 'door', 'window', 'cabinet', 'framing', 'table', 'chair', 'carpent'],
};

export function useProfessionalSearch() {
  const { professionals: allPros, draftRequest } = useDemoStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query and category from URL or draft
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || draftRequest?.category || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTrade, setSelectedTrade] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('best_match');
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationPreferenceOption>(
      draftRequest?.verificationPreference || 'verified_skills'
    );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if URL search params change externally
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
    const cat = searchParams.get('category');
    if (cat && cat !== selectedTrade) {
      setSelectedTrade(cat);
      setCurrentPage(1);
    }
  }, [searchParams, searchQuery, selectedTrade]);

  // Master Filtered List
  const filteredProfessionals = useMemo(() => {
    let list = [...allPros];

    // 1. Trade Category Filter
    if (selectedTrade && selectedTrade !== 'all') {
      const target = selectedTrade.toLowerCase();
      list = list.filter((pro) => {
        const trade = pro.trade.toLowerCase();
        if (target.includes('plumb') && trade.includes('plumb')) return true;
        if (target.includes('electr') && trade.includes('electr')) return true;
        if (target.includes('tv') && trade.includes('tv')) return true;
        if (target.includes('paint') && trade.includes('paint')) return true;
        if (target.includes('carpent') && trade.includes('carpent')) return true;
        return trade === target;
      });
    }

    // 2. Text Search Query Matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();

      list = list.filter((pro) => {
        const nameMatch = pro.fullName.toLowerCase().includes(q);
        const tradeMatch = pro.trade.toLowerCase().includes(q);
        const subCityMatch = pro.subCity.toLowerCase().includes(q);
        const bioMatch = pro.bio.toLowerCase().includes(q);

        // Check semantic synonyms for the query
        const proTradeKey = pro.trade.toLowerCase();
        const relatedTerms = SYNONYMS[proTradeKey] || [];
        const synonymMatch = relatedTerms.some((term) => q.includes(term) || term.includes(q));

        return nameMatch || tradeMatch || subCityMatch || bioMatch || synonymMatch;
      });
    }

    // 3. Tripartite Verification Level Filter
    if (verificationFilter === 'verified_skills') {
      list = list.filter(
        (pro) =>
          pro.skillsStatus === 'evidence_accepted' &&
          pro.identityStatus === 'verified'
      );
    } else if (verificationFilter === 'identity_verified') {
      list = list.filter((pro) => pro.identityStatus === 'verified');
    }
    // 'all' includes newly registered / unverified pros

    // 4. Sorting
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.confirmedJobsCount - a.confirmedJobsCount);
    } else if (sortBy === 'most_jobs') {
      list.sort((a, b) => b.confirmedJobsCount - a.confirmedJobsCount || b.rating - a.rating);
    } else {
      // Best match: subCity affinity + rating + confirmed jobs
      list.sort((a, b) => {
        const aAreaMatch = a.subCity === draftRequest?.subCity ? 1 : 0;
        const bAreaMatch = b.subCity === draftRequest?.subCity ? 1 : 0;
        if (bAreaMatch !== aAreaMatch) return bAreaMatch - aAreaMatch;
        return b.rating - a.rating || b.confirmedJobsCount - a.confirmedJobsCount;
      });
    }

    return list;
  }, [allPros, draftRequest, selectedTrade, searchQuery, verificationFilter, sortBy]);

  // Pagination Calculations
  const totalCount = filteredProfessionals.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProfessionals = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredProfessionals.slice(startIndex, startIndex + pageSize);
  }, [filteredProfessionals, safeCurrentPage, pageSize]);

  // Action handlers
  const handleSetSearchQuery = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);

    // Update URL query parameters cleanly
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSetSelectedTrade = (val: string) => {
    setSelectedTrade(val);
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);
    if (val && val !== 'all') {
      newParams.set('category', val);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSetVerificationFilter = (val: VerificationPreferenceOption) => {
    setIsLoading(true);
    setVerificationFilter(val);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 150);
  };

  const handleSetSortBy = (val: SortOption) => {
    setIsLoading(true);
    setSortBy(val);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 150);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 120);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTrade('all');
    setVerificationFilter('all');
    setSortBy('best_match');
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  return {
    professionals: paginatedProfessionals,
    allFilteredCount: totalCount,
    isLoading,
    searchQuery,
    selectedTrade,
    sortBy,
    verificationFilter,
    currentPage: safeCurrentPage,
    totalPages,
    pageSize,
    totalCount,
    draftRequest,
    actions: {
      setSearchQuery: handleSetSearchQuery,
      setSelectedTrade: handleSetSelectedTrade,
      setSortBy: handleSetSortBy,
      setVerificationFilter: handleSetVerificationFilter,
      setPage: handlePageChange,
      resetFilters: handleResetFilters,
    },
  };
}
