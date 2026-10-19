import React from 'react';
import { Check, ClipboardList } from 'lucide-react';

interface GuidedQuestionnaireProps {
  category: string;
  answers: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

interface QuestionConfig {
  id: string;
  title: string;
  options: string[];
}

const TRADE_QUESTIONS: Record<string, QuestionConfig[]> = {
  Plumbing: [
    {
      id: 'issueType',
      title: 'What is the plumbing issue?',
      options: ['Leak / Burst Pipe', 'Drain Blockage', 'Faucet / Tap repair', 'Water Tank / Pump'],
    },
    {
      id: 'location',
      title: 'Where is the problem located?',
      options: ['Kitchen', 'Bathroom', 'Outdoor / Yard', 'Main Water Inflow'],
    },
    {
      id: 'duration',
      title: 'When did it start?',
      options: ['Just now / Emergency', 'Past 1-2 days', 'Ongoing for days'],
    },
    {
      id: 'waterSupplyOff',
      title: 'Is the water supply shut off?',
      options: ['Yes, water is off', 'No, still running', 'Cannot locate valve'],
    },
  ],
  Painting: [
    {
      id: 'areaType',
      title: 'What area needs painting?',
      options: ['Living room / Bedroom', 'Full apartment', 'Exterior wall', 'Doors / Wood trim'],
    },
    {
      id: 'roomSize',
      title: 'Approximate room size or area',
      options: ['Small (< 15 m²)', 'Medium (15-30 m²)', 'Large (> 30 m²)', 'Multiple rooms'],
    },
    {
      id: 'surfaceCondition',
      title: 'Current wall surface condition',
      options: ['Good (standard repaint)', 'Peeling / Needs scraping', 'Cracking / Water stains'],
    },
    {
      id: 'paintSupply',
      title: 'Paint materials & supplies',
      options: ['I will buy the paint', 'Painter should supply paint'],
    },
  ],
  Electrical: [
    {
      id: 'issueType',
      title: 'What is the electrical problem?',
      options: ['Circuit breaker tripping', 'Power outage in one room', 'Sparking outlet / switch', 'Generator switchover'],
    },
    {
      id: 'safetyHazard',
      title: 'Any burning smell or active sparks?',
      options: ['No, circuit is dead', 'Yes, emergency sparks / odor'],
    },
  ],
  'TV Repair': [
    {
      id: 'applianceType',
      title: 'What device needs repair?',
      options: ['Smart TV / LED Screen', 'Washing Machine', 'Refrigerator', 'Microwave / Stove'],
    },
    {
      id: 'symptom',
      title: 'Primary issue observed',
      options: ['No power at all', 'Sound works, screen is black', 'Strange noise / Vibration', 'Leaking water'],
    },
  ],
  Carpenter: [
    {
      id: 'woodworkType',
      title: 'What carpentry work is needed?',
      options: ['Door repair / Lock installation', 'Cabinet / Shelf fixing', 'Custom furniture', 'Window frame / Baseboards'],
    },
    {
      id: 'materialProvided',
      title: 'Wood and hardware materials',
      options: ['I already have materials', 'Carpenter should supply materials', 'Need advice on wood selection'],
    },
    {
      id: 'location',
      title: 'Where will work take place?',
      options: ['Indoor / Living space', 'Kitchen / Bathroom', 'Exterior / Balcony / Gate'],
    },
  ],
};

export const GuidedQuestionnaire: React.FC<GuidedQuestionnaireProps> = ({
  category,
  answers,
  onChange,
}) => {
  const questions = TRADE_QUESTIONS[category] || TRADE_QUESTIONS['Plumbing'];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-1 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-primary">
            <ClipboardList className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground">
              {category} Diagnostic Details
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Helps nearby professionals prepare accurate fixed quotes
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const currentVal = answers[q.id];
          return (
            <div key={q.id} className="space-y-2">
              <label className="text-xs font-medium text-foreground block">
                {q.title}
              </label>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const isSelected = currentVal === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onChange(q.id, opt)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-secondary text-primary border border-primary/30 font-semibold shadow-2xs'
                          : 'bg-muted/50 text-muted-foreground border border-border/70 hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-primary shrink-0" />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
