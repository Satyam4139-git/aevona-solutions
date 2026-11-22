import React, { useState } from 'react';
import { Wrench, CheckCircle, Clock, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { catalogServicesMock } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ServiceItem } from '../../types';

export const ServicesDashboardPage: React.FC = () => {
  const { serviceRequests, requestService } = useDashboard();

  const [activeTab, setActiveTab] = useState<'Catalog' | 'Requested'>('Catalog');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Form state
  const [budget, setBudget] = useState('$20,000 - $40,000');
  const [notes, setNotes] = useState('');

  const handleOpenRequest = (service: ServiceItem) => {
    setSelectedService(service);
    setIsRequestModalOpen(true);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    requestService(
      selectedService.id,
      selectedService.title,
      selectedService.category,
      budget,
      notes || 'Custom technical service request'
    );
    setIsRequestModalOpen(false);
    setActiveTab('Requested');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#12202f] ">
            Services & Solutions Directory
          </h1>
          <p className="text-xs text-[#4a5a6a]  mt-1">
            Browse enterprise technology services or track active service requests.
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center p-1 bg-white  border border-[#0b4f9c]/40 rounded-xl">
          <button
            onClick={() => setActiveTab('Catalog')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'Catalog'
                ? 'bg-[#4a5a6a] text-white  '
                : 'text-[#4a5a6a]  hover:bg-[#f3f6f9]'
            }`}
          >
            Available Services Catalog
          </button>
          <button
            onClick={() => setActiveTab('Requested')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'Requested'
                ? 'bg-[#4a5a6a] text-white  '
                : 'text-[#4a5a6a]  hover:bg-[#f3f6f9]'
            }`}
          >
            Track Requested Services ({serviceRequests.length})
          </button>
        </div>
      </div>

      {/* CATALOG TAB */}
      {activeTab === 'Catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogServicesMock.map((srv) => (
            <div
              key={srv.id}
              className="bg-white  border border-[#0b4f9c]/30 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 relative group"
            >
              {srv.popular && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-[#0b4f9c] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                  Popular
                </span>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0b4f9c]/20 border border-[#0b4f9c]/40 text-[#4a5a6a]  flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-serif font-bold text-[#12202f] ">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#4a5a6a]/80  mt-2 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <div className="space-y-1.5 pt-4">
                  {srv.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#12202f] ">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0b4f9c] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#f3f6f9]  flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#4a5a6a]">Starting From</div>
                  <div className="text-sm font-bold text-[#12202f] ">{srv.startingPrice}</div>
                </div>

                <Button variant="gold" size="sm" onClick={() => handleOpenRequest(srv)}>
                  Request Service
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REQUESTED SERVICES TRACKER TAB */}
      {activeTab === 'Requested' && (
        <div className="bg-white  border border-[#0b4f9c]/30 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-serif font-bold text-[#12202f] ">
            Service Requests & Status Tracking
          </h3>

          <div className="divide-y divide-[#f3f6f9] ">
            {serviceRequests.map((req) => (
              <div key={req.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#12202f] ">
                      {req.serviceTitle}
                    </h4>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-xs text-[#4a5a6a] ">{req.notes}</p>
                  <div className="text-[11px] text-[#0b4f9c] flex items-center gap-3 pt-1">
                    <span>Requested: {req.requestedAt}</span>
                    <span>•</span>
                    <span>Est. Delivery: {req.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-[#12202f] ">Budget: {req.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REQUEST SERVICE MODAL */}
      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title={`Request: ${selectedService?.title}`}>
        <form onSubmit={handleRequestSubmit} className="space-y-4">
          <p className="text-xs text-[#4a5a6a] ">
            Submit your requirements for <span className="font-bold">{selectedService?.title}</span>. Our technical director will assign a lead solution architect within 24 hours.
          </p>

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1">
              Target Budget Range
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50 rounded-xl text-xs"
            >
              <option value="$5,000 - $15,000">$5,000 - $15,000</option>
              <option value="$15,000 - $35,000">$15,000 - $35,000</option>
              <option value="$35,000 - $75,000">$35,000 - $75,000</option>
              <option value="$75,000+ Enterprise">$75,000+ Enterprise Scope</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1">
              Project Requirements & Specific Notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your tech stack, goals, timelines..."
              className="w-full px-3.5 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Submit Service Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
