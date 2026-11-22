import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, ArrowUpDown, Calendar, Clock, DollarSign, Users, ChevronRight, FolderKanban } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { ProjectStatus } from '../../types';

export const ProjectsPage: React.FC = () => {
  const { projects, addProject } = useDashboard();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('Cloud Infrastructure');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');
  const [deadline, setDeadline] = useState('2024-12-15');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addProject({
      name,
      description,
      serviceType,
      status: 'In Progress',
      priority,
      startDate: new Date().toISOString().split('T')[0],
      deadline,
      budget: '$35,000'
    });
    setName('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  const statuses: (ProjectStatus | 'All')[] = ['All', 'Planning', 'In Progress', 'Review', 'Completed', 'Archived'];

  return (
    <div className="space-y-6">
      {/* Top Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#12202f] ">
            Projects Directory
          </h1>
          <p className="text-xs text-[#4a5a6a]  mt-1">
            Monitor, manage, and create client initiatives and digital projects.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setIsCreateModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Create Project
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white  p-3.5 rounded-2xl border border-[#0b4f9c]/30 ">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#0b4f9c]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name..."
            className="w-full pl-9 pr-4 py-2 bg-[#ffffff]  border border-[#0b4f9c]/40  rounded-xl text-xs text-[#12202f]  focus:ring-2 focus:ring-[#0b4f9c]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#4a5a6a] text-white  '
                  : 'text-[#4a5a6a]  hover:bg-[#f3f6f9] '
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white  border border-[#0b4f9c]/30  rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b4f9c]  px-2.5 py-0.5 rounded-full bg-[#0b4f9c]/15">
                  {project.serviceType}
                </span>
                <StatusBadge status={project.status} />
              </div>

              <Link
                to={`/dashboard/projects/${project.id}`}
                className="text-lg font-serif font-bold text-[#12202f]  group-hover:text-[#4a5a6a]  transition-colors line-clamp-1"
              >
                {project.name}
              </Link>

              <p className="text-xs text-[#4a5a6a]/80  mt-2 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Middle Stats */}
            <div className="space-y-3 pt-2 border-t border-[#f3f6f9] ">
              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#4a5a6a] ">Completion Progress</span>
                  <span className="text-[#12202f] ">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-[#f3f6f9]  rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0b4f9c] to-[#1a63b5] rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4a5a6a]  pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0b4f9c]" />
                  <span>Due {project.deadline}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#0b4f9c]" />
                  <span>Budget: {project.budget || 'Custom'}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#f3f6f9] ">
              <div className="flex -space-x-2 overflow-hidden">
                {project.teamMembers.map((m, idx) => (
                  <img
                    key={idx}
                    src={m.avatar}
                    alt={m.name}
                    title={`${m.name} (${m.role})`}
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white  object-cover"
                  />
                ))}
              </div>

              <Link
                to={`/dashboard/projects/${project.id}`}
                className="text-xs font-bold text-[#4a5a6a]  hover:underline inline-flex items-center gap-1"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center bg-white  rounded-3xl border border-[#0b4f9c]/30 space-y-3">
          <FolderKanban className="w-10 h-10 text-[#0b4f9c] mx-auto" />
          <h3 className="text-base font-serif font-bold text-[#12202f] ">No projects found</h3>
          <p className="text-xs text-[#4a5a6a]">Try adjusting your search query or status filter.</p>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Enterprise Project">
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NextGen Microservices Platform"
              className="w-full px-3.5 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f] "
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project scope details..."
              className="w-full px-3.5 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50  rounded-xl text-sm text-[#12202f] "
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#12202f]  mb-1">
                Service Type
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50  rounded-xl text-xs text-[#12202f] "
              >
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Web & Application Development">Web Application</option>
                <option value="Mobile App Development">Mobile App</option>
                <option value="Data & Analytics Solutions">Data Solutions</option>
                <option value="Business Automation">Business Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#12202f]  mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50  rounded-xl text-xs text-[#12202f] "
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#12202f]  mb-1">
              Estimated Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#ffffff]  border border-[#0b4f9c]/50  rounded-xl text-xs text-[#12202f] "
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
