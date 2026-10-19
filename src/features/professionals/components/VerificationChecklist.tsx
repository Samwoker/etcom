import React from 'react';
import { ShieldCheck, Award, Briefcase, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import type { Professional } from '@/types';

interface VerificationChecklistProps {
  pro: Professional;
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({ pro }) => {
  const isUnverified =
    pro.identityStatus !== 'verified' ||
    pro.skillsStatus !== 'evidence_accepted' ||
    pro.confirmedJobsCount === 0;

  const getSkillsDescription = () => {
    if (pro.skillsStatus === 'evidence_accepted') {
      if (pro.trade === 'Plumber') return 'TVET Level IV Plumbing & Sanitary Certificate verified';
      if (pro.trade === 'Electrician') return 'City Trade License & Electrical competency verified';
      if (pro.trade === 'TV Repair') return 'Electronics Diagnostic Technician Certificate verified';
      return `${pro.trade} competency evidence verified`;
    }
    if (pro.skillsStatus === 'in_review') return 'Credentials submitted • Under admin review';
    return 'Not independently assessed yet';
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">Tripartite Verification</CardTitle>
          <span className="text-[11px] text-muted-foreground">Etcom Trust Checklist</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${pro.identityStatus === 'verified' ? 'text-primary' : 'text-muted-foreground'}`} />
            <div>
              <p className="font-medium text-foreground">Identity Verification</p>
              <p className="text-muted-foreground">{pro.identityStatus === 'verified' ? 'National ID / Kebele ID verified' : 'ID documents not submitted'}</p>
            </div>
          </div>
          {pro.identityStatus === 'verified' ? (
            <Badge className="bg-primary text-primary-foreground hover:bg-emerald-600 shrink-0">Verified</Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground shrink-0">Not verified</Badge>
          )}
        </div>
        <Separator />
        <div className="flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Award className={`mt-0.5 h-4 w-4 shrink-0 ${pro.skillsStatus === 'evidence_accepted' ? 'text-primary' : 'text-muted-foreground'}`} />
            <div>
              <p className="font-medium text-foreground">Skills Assessment</p>
              <p className="text-muted-foreground">{getSkillsDescription()}</p>
            </div>
          </div>
          {pro.skillsStatus === 'evidence_accepted' ? (
            <Badge className="bg-primary text-primary-foreground hover:bg-emerald-600 shrink-0">Verified</Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground shrink-0">Not verified</Badge>
          )}
        </div>
        <Separator />
        <div className="flex items-start justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Briefcase className={`mt-0.5 h-4 w-4 shrink-0 ${pro.confirmedJobsCount > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
            <div>
              <p className="font-medium text-foreground">Etcom Work History</p>
              <p className="text-muted-foreground">{pro.confirmedJobsCount > 0 ? `${pro.confirmedJobsCount} completed jobs` : 'No completed jobs yet'}</p>
            </div>
          </div>
          {pro.confirmedJobsCount > 0 ? (
            <Badge className="bg-primary text-primary-foreground hover:bg-emerald-600 shrink-0">{pro.confirmedJobsCount} Jobs</Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground shrink-0">No completed jobs yet</Badge>
          )}
        </div>
        {isUnverified && (
          <Alert className="mt-2 border-border bg-muted/40 py-2.5">
            <Info className="h-4 w-4 text-muted-foreground" />
            <AlertTitle className="text-xs font-semibold text-foreground">Unverified Professional Notice</AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground mt-0.5">
              This professional has newly registered on Etcom. Credentials have not been independently assessed yet.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
