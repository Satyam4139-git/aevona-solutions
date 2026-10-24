import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckSquare,
  FileText,
  Activity,
  Plus,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, tasks, files, addTask, toggleTaskComplete, addFile } = useDashboard();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Tasks' | 'Files' | 'Activity'>('Overview');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('High');

  const [fileName, setFileName] = useState('');

  const project = projects.find(p => p.id === id) || projects[0];
  const projectTasks = tasks.filter(t => t.projectId === project.id || !t.projectId);
  const projectFiles = files.filter(f => f.projectId === project.id || !f.projectId);

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask({
      projectId: project.id,
      title: taskTitle,
      description: 'Project milestone deliverable task',
      status: 'In Progress',
      priority: taskPriority,
      assignee: {
        name: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        email: 'alex@aevona.com'
      },
      dueDate: '2024-11-01'
    });
    setTaskTitle('');
    setIsAddTaskModalOpen(false);
  };

  const handleAddFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    addFile({
      projectId: project.id,
      name: fileName,
      size: '3.6 MB',
      type: 'pdf',
      category: 'Document',
      uploadedBy: 'Alex Morgan'
    });
    setFileName('');
    setIsAddFileModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <div>
        <Link
          to="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e4650] dark:text-[#e08858] hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects Directory
        </Link>
      </div>

      {/* Project Header Card */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 dark:border-[#3a2530] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c45139] dark:text-[#e08858] px-2.5 py-0.5 rounded-full bg-[#e08858]/15">
                {project.serviceType}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
              {project.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#5e4650]/80 dark:text-[#e08858]/80 mt-1 max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddFileModalOpen(true)} icon={<FileText className="w-4 h-4" />}>
              Add File
            </Button>
            <Button variant="gold" size="sm" onClick={() => setIsAddTaskModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
              Add Task
            </Button>
          </div>
        </div>

        {/* Metrics summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#5e4650] dark:text-[#e08858]">Start Date</div>
            <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-0.5">{project.startDate}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#5e4650] dark:text-[#e08858]">Deadline</div>
            <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-0.5">{project.deadline}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#5e4650] dark:text-[#e08858]">Budget</div>
            <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-0.5">{project.budget || '$45,000'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-[#5e4650] dark:text-[#e08858]">Priority</div>
            <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee] mt-0.5">{project.priority}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#5e4650] dark:text-[#e08858]">Overall Milestone Completion</span>
            <span className="text-[#1c1019] dark:text-[#fbf4ee] font-bold">{project.progress}%</span>
          </div>
          <div className="h-3 w-full bg-[#f6e9de] dark:bg-[#2a1a25] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e08858] via-[#c45139] to-[#5e4650] rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="border-b border-[#e08858]/30 flex items-center space-x-2">
        {(['Overview', 'Tasks', 'Files', 'Activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-[#5e4650] text-[#5e4650] dark:border-[#e08858] dark:text-[#e08858]'
                : 'border-transparent text-[#1c1019]/60 dark:text-[#fbf4ee]/60 hover:text-[#5e4650] dark:hover:text-[#e08858]'
            }`}
          >
            {tab} {tab === 'Tasks' ? `(${projectTasks.length})` : tab === 'Files' ? `(${projectFiles.length})` : ''}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-3 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                  Project Summary & Goals
                </h3>
                <p className="text-xs text-[#5e4650]/90 dark:text-[#e08858]/80 leading-relaxed">
                  This project delivers high-performance digital infrastructure for {project.name}. Our engineering SLA covers architecture design, automated staging environments, security hardening, and deployment.
                </p>
                <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20">
                    <div className="font-bold text-[#1c1019] dark:text-[#fbf4ee]">Infrastructure Cluster</div>
                    <div className="text-[11px] text-[#5e4650]">Multi-region AWS cluster (us-east-1, eu-west-1)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20">
                    <div className="font-bold text-[#1c1019] dark:text-[#fbf4ee]">Security Level</div>
                    <div className="text-[11px] text-[#5e4650]">SOC2 Type II & End-to-End Encryption</div>
                  </div>
                </div>
              </div>

              {/* Tasks preview inside overview */}
              <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                    Active Project Tasks
                  </h3>
                  <button onClick={() => setActiveTab('Tasks')} className="text-xs text-[#5e4650] font-semibold hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {projectTasks.slice(0, 3).map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleTaskComplete(t.id)}>
                          <CheckCircle2 className={`w-4 h-4 ${t.status === 'Completed' ? 'text-emerald-600' : 'text-gray-400'}`} />
                        </button>
                        <span className={`text-xs font-semibold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-[#1c1019] dark:text-[#fbf4ee]'}`}>
                          {t.title}
                        </span>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Assigned Team Members */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                  Assigned Team
                </h3>
                <div className="space-y-3">
                  {project.teamMembers.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14]">
                      <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{m.name}</div>
                        <div className="text-[10px] text-[#5e4650] dark:text-[#e08858]">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'Tasks' && (
          <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                Tasks & Milestones
              </h3>
              <Button variant="gold" size="sm" onClick={() => setIsAddTaskModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Add Task
              </Button>
            </div>

            <div className="space-y-2">
              {projectTasks.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleTaskComplete(t.id)} className="shrink-0">
                      <CheckCircle2 className={`w-5 h-5 ${t.status === 'Completed' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`} />
                    </button>
                    <div>
                      <div className={`text-sm font-bold ${t.status === 'Completed' ? 'line-through text-gray-400' : 'text-[#1c1019] dark:text-[#fbf4ee]'}`}>
                        {t.title}
                      </div>
                      <div className="text-xs text-[#5e4650] dark:text-[#e08858]/70">{t.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#5e4650]">Due {t.dueDate}</span>
                    <StatusBadge status={t.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'Files' && (
          <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
                Project Deliverables & Files
              </h3>
              <Button variant="gold" size="sm" onClick={() => setIsAddFileModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
                Upload File
              </Button>
            </div>

            <div className="divide-y divide-[#f6e9de] dark:divide-[#33222c]">
              {projectFiles.map(f => (
                <div key={f.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#e08858]" />
                    <div>
                      <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">{f.name}</div>
                      <div className="text-[10px] text-[#5e4650]">{f.size} • Uploaded by {f.uploadedBy} on {f.uploadedAt}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'Activity' && (
          <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
              Recent Activity Stream
            </h3>
            <div className="space-y-4 relative pl-4 border-l-2 border-[#e08858]/40">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#e08858]" />
                <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Sophia Bennett updated Terraform multi-region subnets</div>
                <div className="text-[10px] text-[#5e4650] dark:text-[#e08858]/60">2 hours ago</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-[#c45139]" />
                <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Alex Morgan added milestone task "Implement OAuth 2.0 Callback"</div>
                <div className="text-[10px] text-[#5e4650] dark:text-[#e08858]/60">1 day ago</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600" />
                <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee]">Daniel Carter completed penetration security audit</div>
                <div className="text-[10px] text-[#5e4650] dark:text-[#e08858]/60">2 days ago</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD TASK MODAL */}
      <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="Add Task to Project">
        <form onSubmit={handleAddTaskSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Audit Redis Cache Strategy"
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Priority
            </label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-xs"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddTaskModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Save Task</Button>
          </div>
        </form>
      </Modal>

      {/* ADD FILE MODAL */}
      <Modal isOpen={isAddFileModalOpen} onClose={() => setIsAddFileModalOpen(false)} title="Upload Project File">
        <form onSubmit={handleAddFileSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              File Title *
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. Architecture_Whitepaper.pdf"
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddFileModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Upload File</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
