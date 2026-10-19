import React from 'react';
import { FileText, Phone, User, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/format';
import { isDisplayableImage } from '@/lib/fileUtils';
import type { Professional } from '@/types';

interface EvidenceViewerProps {
  category: 'identity' | 'skills';
  pro: Professional;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ category, pro }) => {
  const documents =
    category === 'identity'
      ? pro.evidenceItems?.filter(
          (e) => e.type === 'national_id' || e.type === 'kebele_id'
        ) || [
          {
            id: 'ev-default-id',
            type: 'national_id',
            title: 'Ethiopian National ID Card (Front & Back)',
            fileName: 'national_id_scan.pdf',
            submittedAt: '2026-10-18T08:00:00Z',
          },
        ]
      : pro.evidenceItems?.filter(
          (e) => e.type !== 'national_id' && e.type !== 'kebele_id'
        ) || [
          {
            id: 'ev-default-cert',
            type: 'tvet_certificate',
            title: `${pro.trade} TVET Qualification Level Certificate`,
            fileName: 'qualification_cert.pdf',
            submittedAt: '2026-10-18T08:15:00Z',
          },
        ];

  const references = pro.references || [
    {
      name: 'Haile Lemma',
      phone: '+251 71 234 5678',
      relationship: 'Senior Contractor / Project Supervisor',
    },
  ];

  return (
    <div className="space-y-4 pt-1">
      {/* Uploaded Documents List */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span>Submitted Documentation ({documents.length})</span>
        </h4>

        <div className="space-y-2">
          {documents.map((doc) => {
            const hasImg = isDisplayableImage(doc.fileName);
            return (
              <Card key={doc.id} className="border-border shadow-2xs bg-muted/20">
                <CardContent className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {hasImg ? (
                      <img
                        src={doc.fileName}
                        alt={doc.title}
                        className="h-10 w-10 object-cover rounded-lg border border-primary/30 shrink-0"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {doc.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {hasImg ? 'Document Scan (Image)' : doc.fileName} • {formatRelativeTime(doc.submittedAt)}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs gap-1 shrink-0 border-border"
                    onClick={() => {
                      if (hasImg) {
                        const win = window.open();
                        if (win) {
                          win.document.write(`<img src="${doc.fileName}" style="max-width:100%;height:auto;display:block;margin:auto;" />`);
                        }
                      } else {
                        alert(`Viewing ${doc.fileName}`);
                      }
                    }}
                  >
                    <ExternalLink className="h-3 w-3" />
                    View
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reference List (shown primarily for skills or when available) */}
      {category === 'skills' && references.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border/70">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" />
            <span>Professional Referees ({references.length})</span>
          </h4>

          <div className="space-y-2">
            {references.map((ref, idx) => (
              <Card key={idx} className="border-border shadow-2xs bg-muted/10">
                <CardContent className="p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground">{ref.name}</span>
                    <Badge variant="outline" className="text-[10px] text-muted-foreground font-normal">
                      {ref.relationship}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3 text-primary" />
                    <span>{ref.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
