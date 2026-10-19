import React from 'react';
import {
  Sparkles,
  Wrench,
  Zap,
  Tv,
  Paintbrush,
  Hammer,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { StickyCta } from '@/components/shared/StickyCta';
import { PhotoPicker } from './PhotoPicker';
import { UrgencyToggle } from './UrgencyToggle';
import { VerificationPreference } from './VerificationPreference';
import { GuidedQuestionnaire } from './GuidedQuestionnaire';
import { VoiceNoteRecorder } from './VoiceNoteRecorder';
import { useNewRequest } from '../hooks/useNewRequest';

interface TradeCategoryItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: TradeCategoryItem[] = [
  { id: 'Plumbing', label: 'Plumbing', icon: Wrench },
  { id: 'Electrical', label: 'Electrical', icon: Zap },
  { id: 'TV Repair', label: 'TV & Appliance', icon: Tv },
  { id: 'Painting', label: 'Painting', icon: Paintbrush },
  { id: 'Carpenter', label: 'Carpentry', icon: Hammer },
];

const SUBCITIES = ['Bole', 'Piassa', 'CMC', 'Kazanchis', 'Sarbet', 'Gerji'];

export const RequestForm: React.FC = () => {
  const { formData, error, isLoading, actions } = useNewRequest();

  const handleFillSample = () => {
    if (formData.category === 'Plumbing') {
      actions.setDescription('Main pressure valve under kitchen sink is leaking water onto the floor. Needs emergency seal/replacement.');
      actions.setDiagnosticAnswer('issueType', 'Leak / Burst Pipe');
      actions.setDiagnosticAnswer('location', 'Kitchen Sink');
      actions.setDiagnosticAnswer('duration', 'Just now / Emergency');
      actions.setDiagnosticAnswer('waterSupplyOff', 'Yes, water is off');
    } else if (formData.category === 'Painting') {
      actions.setDescription('Living room and dining room need complete repainting (approx 35 m²). Walls have slight surface peeling.');
      actions.setDiagnosticAnswer('areaType', 'Living room / Bedroom');
      actions.setDiagnosticAnswer('roomSize', 'Medium (15-30 m²)');
      actions.setDiagnosticAnswer('surfaceCondition', 'Peeling / Needs scraping');
    } else if (formData.category === 'Carpenter') {
      actions.setDescription('Front entrance door is sticking and hard to close, and master bedroom lock cylinder needs replacement.');
      actions.setDiagnosticAnswer('woodworkType', 'Door repair / Lock installation');
      actions.setDiagnosticAnswer('materialProvided', 'Carpenter should supply materials');
      actions.setDiagnosticAnswer('location', 'Indoor / Living space');
    } else {
      actions.setDescription('Tripping circuit breaker when heavy appliance is turned on in the kitchen.');
    }
  };

  return (
    <form onSubmit={actions.handleSubmit} className="space-y-6 pb-28">
      {/* SECTION 1: Service Category & Diagnostic Questions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
              1
            </span>
            <Label className="text-xs font-semibold text-foreground">
              Select Trade Category
            </Label>
          </div>
          <span className="text-[11px] text-muted-foreground">Adapts diagnostic checks</span>
        </div>

        {/* 5-Column Trade Picker Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = formData.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => actions.setCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-secondary/40 text-primary shadow-2xs font-semibold'
                    : 'border-border/80 bg-card hover:bg-muted/40 hover:border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl mb-1.5 transition-colors ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Trade-Specific Guided Diagnostics */}
        <GuidedQuestionnaire
          category={formData.category}
          answers={formData.diagnosticAnswers || {}}
          onChange={actions.setDiagnosticAnswer}
        />
      </section>

      {/* SECTION 2: Description, Voice Note & Photos */}
      <section className="space-y-4 pt-2 border-t border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
              2
            </span>
            <Label htmlFor="description" className="text-xs font-semibold text-foreground">
              Describe the Problem or Project
            </Label>
          </div>
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Fill sample scenario</span>
          </button>
        </div>

        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => actions.setDescription(e.target.value)}
          placeholder="Specific details about what happened, dimensions, or materials required..."
          className={`rounded-xl resize-none text-xs sm:text-sm bg-card border-border/80 focus-visible:ring-primary ${
            error ? 'border-destructive' : ''
          }`}
          aria-invalid={Boolean(error)}
        />
        {error && <p className="text-xs text-destructive font-medium">{error}</p>}

        {/* Voice Note Recording Component */}
        <VoiceNoteRecorder
          value={formData.voiceNoteUrl}
          onChange={actions.setVoiceNoteUrl}
        />

        {/* Photo Picker */}
        <PhotoPicker photos={formData.photos} onChange={actions.setPhotos} />
      </section>

      {/* SECTION 3: Location, Urgency & Verification Preference */}
      <section className="space-y-4 pt-2 border-t border-border/60">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
            3
          </span>
          <Label className="text-xs font-semibold text-foreground">
            Location & Matching Criteria
          </Label>
        </div>

        {/* Neighborhood Selector */}
        <div className="space-y-1.5">
          <label htmlFor="subCity" className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Your Neighborhood in Addis Ababa</span>
          </label>
          <Select value={formData.subCity} onValueChange={actions.setSubCity}>
            <SelectTrigger id="subCity" className="h-11 rounded-xl w-full text-xs sm:text-sm bg-card">
              <SelectValue placeholder="Select sub-city" />
            </SelectTrigger>
            <SelectContent>
              {SUBCITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city} Sub-City
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Urgency Toggle */}
        <UrgencyToggle value={formData.urgency} onChange={actions.setUrgency} />

        {/* Verification Preference */}
        <VerificationPreference
          value={formData.verificationPreference}
          onChange={actions.setVerificationPreference}
        />
      </section>

      {/* Trust & Zero Advance Guarantee Info Card */}
      <Card className="rounded-2xl border border-primary/20 bg-secondary/15 p-0">
        <CardContent className="p-3.5 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-foreground">
              Zero Advance Required • Pay on Completion
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Professionals quote fixed labor and estimated materials. You only authorize payment through Safaricom M-PESA after reviewing the finished work.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sticky Bottom Action */}
      <StickyCta
        primaryLabel={`Find Verified ${formData.category} Pros in ${formData.subCity}`}
        onPrimaryClick={actions.handleSubmit}
        primaryLoading={isLoading}
      />
    </form>
  );
};
