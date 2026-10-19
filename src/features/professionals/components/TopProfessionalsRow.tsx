import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfessionalCard } from '@/components/shared/ProfessionalCard';
import { useProfessionals } from '../hooks/useProfessionals';
import { ROUTES } from '@/app/routes';

export const TopProfessionalsRow: React.FC = () => {
  const navigate = useNavigate();
  const { professionals, isLoading } = useProfessionals(4);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Top rated near you
        </h2>
        <button
          type="button"
          onClick={() => navigate(ROUTES.CUSTOMER_RESULTS)}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {isLoading ? (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-64 h-24 rounded-2xl border border-border p-3.5 space-y-2 bg-card"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {professionals.map((pro) => (
            <ProfessionalCard
              key={pro.id}
              pro={pro}
              compact
              onClick={() => navigate(ROUTES.CUSTOMER_PRO_DETAIL(pro.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};
