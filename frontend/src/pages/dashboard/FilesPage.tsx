import React, { useState } from 'react';
import {
  FileText,
  Folder,
  Search,
  Upload,
  Download,
  Trash2,
  Eye,
  FolderPlus,
  FileCode,
  FileArchive,
  Image as ImageIcon
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProjectFile } from '../../types';

export const FilesPage: React.FC = () => {
  const { files, addFile, deleteFile } = useDashboard();

  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All Files');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<'Document' | 'Design' | 'Archive' | 'Code' | 'Media'>('Document');

  const folders = ['All Files', 'Document', 'Design', 'Archive', 'Code', 'Media'];

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === 'All Files' || f.category === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    addFile({
      name: fileName,
      size: '4.8 MB',
      type: fileCategory === 'Design' ? 'figma' : fileCategory === 'Archive' ? 'zip' : 'pdf',
      category: fileCategory,
      uploadedBy: 'Alex Morgan'
    });
    setFileName('');
    setIsUploadModalOpen(false);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'docx':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'figma':
      case 'png':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'zip':
        return <FileArchive className="w-5 h-5 text-amber-500" />;
      default:
        return <FileCode className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1019] dark:text-[#fbf4ee]">
            File Management
          </h1>
          <p className="text-xs text-[#5e4650] dark:text-[#e08858]/80 mt-1">
            Centralized document repository, architectural blueprints, and deliverables.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setIsUploadModalOpen(true)} icon={<Upload className="w-4 h-4" />}>
          Upload File
        </Button>
      </div>

      {/* Folders Navigation Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFolder(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              selectedFolder === f
                ? 'bg-[#5e4650] text-white dark:bg-[#e08858] dark:text-[#140a14] border-[#5e4650]'
                : 'bg-white dark:bg-[#1e1220] text-[#5e4650] dark:text-[#e08858] border-[#e08858]/30 hover:border-[#e08858]'
            }`}
          >
            <Folder className="w-4 h-4" /> {f}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#1e1220] p-3.5 rounded-2xl border border-[#e08858]/30 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#c45139]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files by name..."
            className="w-full pl-9 pr-4 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/40 rounded-xl text-xs text-[#1c1019] dark:text-[#fbf4ee]"
          />
        </div>
        <span className="text-xs text-[#5e4650] dark:text-[#e08858]">
          Showing {filteredFiles.length} items
        </span>
      </div>

      {/* File List Table */}
      <div className="bg-white dark:bg-[#1e1220] border border-[#e08858]/30 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-[#f6e9de] dark:divide-[#33222c]">
          {filteredFiles.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#fbf4ee]/50 dark:hover:bg-[#2a1a25]/50 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-2 rounded-xl bg-[#fbf4ee] dark:bg-[#140a14] shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#1c1019] dark:text-[#fbf4ee] truncate">
                    {file.name}
                  </div>
                  <div className="text-[11px] text-[#5e4650] dark:text-[#e08858]/70">
                    {file.size} • Category: {file.category} • Uploaded by {file.uploadedBy} on {file.uploadedAt}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewFile(file)}
                  className="p-2 rounded-lg text-[#5e4650] dark:text-[#e08858] hover:bg-[#f6e9de] dark:hover:bg-[#2a1a25]"
                  title="Preview UI"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Downloading ${file.name}...`)}
                  className="p-2 rounded-lg text-[#5e4650] dark:text-[#e08858] hover:bg-[#f6e9de] dark:hover:bg-[#2a1a25]"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD MODAL */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload New File">
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              File Title / Filename *
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. AWS_Infrastructure_Specification.pdf"
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1019] dark:text-[#fbf4ee] mb-1">
              Category
            </label>
            <select
              value={fileCategory}
              onChange={(e) => setFileCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/50 rounded-xl text-xs"
            >
              <option value="Document">Document</option>
              <option value="Design">Design</option>
              <option value="Archive">Archive</option>
              <option value="Code">Code</option>
              <option value="Media">Media</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Upload File</Button>
          </div>
        </form>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal isOpen={!!previewFile} onClose={() => setPreviewFile(null)} title={`Preview: ${previewFile?.name}`}>
        <div className="space-y-4 text-center py-6">
          <div className="p-8 rounded-2xl bg-[#fbf4ee] dark:bg-[#140a14] border border-[#e08858]/30">
            <FileText className="w-16 h-16 text-[#e08858] mx-auto mb-3" />
            <div className="text-sm font-bold text-[#1c1019] dark:text-[#fbf4ee]">{previewFile?.name}</div>
            <div className="text-xs text-[#5e4650] mt-1">Size: {previewFile?.size} • Category: {previewFile?.category}</div>
            <div className="text-[11px] text-[#c45139] mt-2">Uploaded by {previewFile?.uploadedBy}</div>
          </div>
          <Button variant="gold" size="sm" onClick={() => { alert(`Downloading ${previewFile?.name}`); setPreviewFile(null); }}>
            Download Copy
          </Button>
        </div>
      </Modal>
    </div>
  );
};
