import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { ProfessionalCard } from '@/components/shared/ProfessionalCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ListSkeleton } from '@/components/shared/ListSkeleton';
import { Pagination } from '@/components/shared/Pagination';
import { ResultsFilters } from '@/features/professionals/components/ResultsFilters';
import { useProfessionalSearch } from '@/features/professionals/hooks/useProfessionalSearch';
import { ROUTES } from '@/app/routes';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    professionals,
    allFilteredCount,
    isLoading,
    searchQuery,
    selectedTrade,
    sortBy,
    verificationFilter,
    currentPage,
    totalPages,
    pageSize,
    draftRequest,
    actions,
  } = useProfessionalSearch();

  const subtitle =
    selectedTrade && selectedTrade !== 'all'
      ? `${selectedTrade} • ${draftRequest?.subCity || 'Addis Ababa'}`
      : `All Trades • ${draftRequest?.subCity || 'Addis Ababa'}`;

  return (
    <div className="flex flex-1 flex-col pb-10">
      <PageHeader title="Find Professionals" subtitle={subtitle} showBack />

      <div className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        {/* Interactive Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => actions.setSearchQuery(e.target.value)}
            placeholder="Search by name, trade, pipe, wiring, Bole..."
            className="h-11 rounded-xl pl-10 pr-10 bg-card border-border text-xs sm:text-sm shadow-2xs focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => actions.setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls: Sort, Trade Categories, and Verification */}
        <ResultsFilters
          sortBy={sortBy}
          onSortChange={actions.setSortBy}
          verificationFilter={verificationFilter}
          onVerificationChange={actions.setVerificationFilter}
          selectedTrade={selectedTrade}
          onTradeChange={actions.setSelectedTrade}
          totalCount={allFilteredCount}
        />

        {/* Results List */}
        {isLoading ? (
          <ListSkeleton count={pageSize} />
        ) : professionals.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No matching professionals"
            description={
              searchQuery
                ? `No professionals matched "${searchQuery}". Try different search terms or clear your filters.`
                : 'No professionals match the selected criteria. Try selecting "Show all" to see all independent tradespeople.'
            }
            actionLabel="Reset search & filters"
            onAction={actions.resetFilters}
          />
        ) : (
          <div className="space-y-3 pt-1">
            {professionals.map((pro) => (
              <ProfessionalCard
                key={pro.id}
                pro={pro}
                customerSubCity={draftRequest?.subCity || 'Bole'}
                onClick={() => navigate(ROUTES.CUSTOMER_PRO_DETAIL(pro.id))}
              />
            ))}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={allFilteredCount}
              pageSize={pageSize}
              onPageChange={actions.setPage}
              className="mt-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};
