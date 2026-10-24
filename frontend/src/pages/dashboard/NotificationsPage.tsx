import React, { useState } from 'react';
import { Bell, CheckCheck, FolderKanban, CheckSquare, CreditCard, HelpCircle, ShieldAlert } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDashboard();
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');

  const filtered = notifications.filter(n => filter === 'All' || !n.read);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Project update': return <FolderKanban className="w-4 h-4 text-[#e08858]" />;
      case 'Task assigned': return <CheckSquare className="w-4 h-4 text-[#c45139]" />;
      case 'Payment update': return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'Support response': return <HelpCircle className="w-4 h-4 text-sky-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
            Notification Center
          </h1>
          <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
            Real-time project updates, deployment notifications, and security alerts.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={markAllNotificationsRead} icon={<CheckCheck className="w-4 h-4" />}>
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#e08858]/30 pb-3">
        {(['All', 'Unread'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filter === f
                ? 'bg-[#5e4650] text-white dark:bg-[#e08858] dark:text-[#140a14]'
                : 'bg-white dark:bg-[#1e1220] text-[#5e4650] dark:text-[#e08858]'
            }`}
          >
            {f} Notifications
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-3xl shadow-sm overflow-hidden divide-y divide-[#f6e9de] dark:divide-[#33222c]">
        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 flex items-start justify-between gap-4 cursor-pointer transition-colors ${
              n.read ? 'hover:bg-[#fbf4ee]/50 dark:hover:bg-[#2a1a25]' : 'bg-[#e08858]/10 dark:bg-[#e08858]/15'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] shrink-0 mt-0.5">
                {getCategoryIcon(n.category)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{n.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#e08858]/20 text-[#5e4650] dark:text-[#e08858]">
                    {n.category}
                  </span>
                </div>
                <p className="text-xs text-[#5e4650]/90 dark:text-[#e08858]/80 leading-relaxed">{n.message}</p>
                <div className="text-[10px] text-[#c45139]">{n.timestamp}</div>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#e08858] shrink-0 mt-2" title="Unread" />
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#5e4650]/60 italic">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  );
};
