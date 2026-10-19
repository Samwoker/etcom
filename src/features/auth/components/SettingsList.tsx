import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CreditCard, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/app/routes';

interface SettingsListProps {
  onLogout: () => void;
}

export const SettingsList: React.FC<SettingsListProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardContent className="p-0 divide-y divide-border/60">
        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate(ROUTES.CUSTOMER_NOTIFICATIONS)}
          className="w-full flex items-center justify-between p-3.5 hover:bg-muted/30 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Notifications</p>
              <p className="text-[11px] text-muted-foreground">Alerts, price offers & payment updates</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Payment Number */}
        <div className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">M-PESA Phone</p>
              <p className="text-[11px] text-muted-foreground">+251 91 123 4567</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
            Default
          </Badge>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Language</p>
              <p className="text-[11px] text-muted-foreground">Interface language</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-medium">English</span>
        </div>

        {/* Help & Support */}
        <div className="flex items-center justify-between p-3.5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Help & Support</p>
              <p className="text-[11px] text-muted-foreground">Support hotline: 8492 (Toll-free)</p>
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground">24/7</span>
        </div>

        <Separator />

        {/* Log Out */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3.5 hover:bg-destructive/5 text-destructive transition-colors text-left"
        >
          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">Log out of account</span>
        </button>
      </CardContent>
    </Card>
  );
};
