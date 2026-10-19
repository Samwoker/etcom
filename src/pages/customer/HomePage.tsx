import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDemoStore } from '@/store/demoStore';
import { ServiceGrid, TopProfessionalsRow } from '@/features/professionals';
import { ActiveJobBanner } from '@/features/jobs';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { ROUTES } from '@/app/routes';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const currentUserId = useDemoStore((state) => state.currentUserId);
  const customers = useDemoStore((state) => state.customers);

  const currentCustomer =
    customers.find((c) => c.id === currentUserId) || customers[0];

  const firstName = currentCustomer?.fullName.split(' ')[0] || 'Customer';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.CUSTOMER_RESULTS}?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(ROUTES.CUSTOMER_RESULTS);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-5 px-4 pt-4 pb-6 w-full max-w-xl md:max-w-2xl mx-auto">
      {/* Top Greeting Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{currentCustomer?.subCity || 'Addis Ababa'}, ET</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mt-0.5">
            Selam, {firstName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={currentCustomer?.avatarUrl} alt={currentCustomer?.fullName} />
            <AvatarFallback className="bg-secondary text-primary font-semibold text-xs">
              {firstName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Interactive Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search trades, plumbers, electricians, Bole..."
          className="h-12 rounded-xl pl-10 pr-10 bg-card border-border text-sm shadow-xs hover:border-primary/50 focus-visible:ring-primary"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {/* Active Job in Progress (Hidden if none) */}
      <ActiveJobBanner />

      {/* 2x2 Services Grid */}
      <ServiceGrid />

      {/* Top Rated Near You */}
      <TopProfessionalsRow />

      {/* Tripartite Verification Transparency Info Card */}
      <Card className="rounded-2xl border border-border bg-muted/40 p-0">
        <CardContent className="p-4 flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-semibold text-foreground">
              Every profile shows what has been checked
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We verify National IDs, review technical trade credentials, and derive work history exclusively from completed Etcom platform jobs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
