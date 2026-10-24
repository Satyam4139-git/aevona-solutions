import React, { useState } from 'react';
import { HelpCircle, Search, Plus, MessageSquare, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { SupportTicket } from '../../types';

export const SupportPage: React.FC = () => {
  const { supportTickets, createSupportTicket, faqs } = useDashboard();

  const [search, setSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Technical');
  const [priority, setPriority] = useState<SupportTicket['priority']>('High');
  const [description, setDescription] = useState('');

  const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()));

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    createSupportTicket(subject, category, priority, description);
    setSubject('');
    setDescription('');
    setIsTicketModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
            Help & Enterprise Support
          </h1>
          <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
            Access documentation, FAQs, or submit support tickets directly to engineering.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setIsTicketModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Create Support Ticket
        </Button>
      </div>

      {/* Support Tickets Table */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
          Your Active Support Tickets ({supportTickets.length})
        </h3>

        <div className="divide-y divide-[#f6e9de] dark:divide-[#33222c]">
          {supportTickets.map((t) => (
            <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#e08858]">{t.ticketNumber}</span>
                  <span className="text-sm font-bold text-[#1c1019] dark:text-[#fbf4ee]">{t.subject}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 line-clamp-1">{t.description}</p>
                <div className="text-[10px] text-[#c45139]">Category: {t.category} • Priority: {t.priority} • Opened {t.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
            Frequently Asked Questions
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#c45139]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/40 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#e08858]/30 rounded-2xl overflow-hidden bg-[#fbf4ee]/50 dark:bg-[#140a14]"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#e08858]" /> : <ChevronDown className="w-4 h-4 text-[#e08858]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#5e4650]/90 dark:text-[#e08858]/80 leading-relaxed border-t border-[#e08858]/20 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      <Modal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} title="Create Engineering Support Ticket">
        <form onSubmit={handleTicketSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Ticket Subject *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. AWS Multi-Region Subnet Latency Query"
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-xs"
              >
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Project">Project</option>
                <option value="Consulting">Consulting</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-xs"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">Detailed Description *</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue, step-by-step logs or error messages..."
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsTicketModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Submit Ticket</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
