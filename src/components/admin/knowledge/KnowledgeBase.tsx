import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  BookOpen,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  FolderTree,
  Shield,
  FileText,
  Package,
  GraduationCap,
  Library,
  ChevronDown,
  ChevronRight,
  File,
  Image,
  X,
} from 'lucide-react';
import { readingProgram, readingPolicy } from '../../../data/admin/reading-program';
import type { Book } from '../../../data/admin/reading-program';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface KBDocument {
  id: string;
  name: string;
  category: string;
  type: string; // mime type
  size: number;
  uploadDate: string;
  tags: string[];
  content?: string;
  url?: string; // object URL for uploaded files
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const ICON_SIZE = 16;

const CATEGORY_DEFS: Omit<Category, 'count'>[] = [
  { id: 'all', name: 'All Documents', icon: <FolderTree size={ICON_SIZE} /> },
  { id: 'policies', name: 'Company Policies', icon: <Shield size={ICON_SIZE} /> },
  { id: 'contracts', name: 'Contracts & Legal', icon: <FileText size={ICON_SIZE} /> },
  { id: 'research', name: 'Research Papers', icon: <BookOpen size={ICON_SIZE} /> },
  { id: 'products', name: 'Product Docs', icon: <Package size={ICON_SIZE} /> },
  { id: 'training', name: 'Training Materials', icon: <GraduationCap size={ICON_SIZE} /> },
  { id: 'reading', name: 'Reading Program', icon: <Library size={ICON_SIZE} /> },
];

const READING_LEVELS = [
  { id: 'c-level', label: 'C-Level' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'specialist', label: 'Specialists' },
  { id: 'all', label: 'All' },
] as const;

/* -------------------------------------------------------------------------- */
/*  Demo seed data                                                            */
/* -------------------------------------------------------------------------- */

const DEMO_DOCS: KBDocument[] = [
  {
    id: 'd1',
    name: 'Employee Handbook 2026.pdf',
    category: 'policies',
    type: 'application/pdf',
    size: 2_400_000,
    uploadDate: '2026-01-15',
    tags: ['handbook', 'policy', 'hr'],
  },
  {
    id: 'd2',
    name: 'NDA Template.pdf',
    category: 'contracts',
    type: 'application/pdf',
    size: 340_000,
    uploadDate: '2026-01-10',
    tags: ['nda', 'legal', 'template'],
  },
  {
    id: 'd3',
    name: 'QRC Depth Optimization.pdf',
    category: 'research',
    type: 'application/pdf',
    size: 5_100_000,
    uploadDate: '2026-02-05',
    tags: ['quantum', 'reservoir computing', 'paper'],
  },
  {
    id: 'd4',
    name: 'Q1 Product Roadmap.md',
    category: 'products',
    type: 'text/markdown',
    size: 48_000,
    uploadDate: '2026-02-01',
    tags: ['roadmap', 'planning'],
    content:
      '# Q1 2026 Product Roadmap\n\n## Milestones\n- QDaria Cloud Platform beta\n- Quantum SDK v2.0 release\n- Enterprise dashboard launch',
  },
  {
    id: 'd5',
    name: 'Onboarding Checklist.md',
    category: 'training',
    type: 'text/markdown',
    size: 12_500,
    uploadDate: '2026-01-20',
    tags: ['onboarding', 'new hire'],
    content:
      '# New Hire Onboarding\n\n1. Sign contracts\n2. Setup development environment\n3. Complete security training\n4. Meet your team lead',
  },
  {
    id: 'd6',
    name: 'Architecture Diagram.png',
    category: 'products',
    type: 'image/png',
    size: 890_000,
    uploadDate: '2026-02-10',
    tags: ['architecture', 'diagram'],
  },
  {
    id: 'd7',
    name: 'TQRC Finance Analysis.ipynb',
    category: 'research',
    type: 'application/x-ipynb+json',
    size: 3_200_000,
    uploadDate: '2026-02-12',
    tags: ['quantum', 'finance', 'notebook'],
  },
  {
    id: 'd8',
    name: 'Security Policy v3.pdf',
    category: 'policies',
    type: 'application/pdf',
    size: 1_100_000,
    uploadDate: '2025-12-01',
    tags: ['security', 'policy', 'compliance'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return <Image size={20} className="text-purple-400" />;
  if (mimeType === 'application/pdf') return <FileText size={20} className="text-red-400" />;
  if (mimeType === 'text/markdown') return <BookOpen size={20} className="text-cyan-400" />;
  return <File size={20} className="text-gray-400" />;
}

function autoCategorize(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  if (['pdf', 'docx'].includes(ext)) return 'contracts';
  if (['py', 'ipynb'].includes(ext)) return 'research';
  if (['md', 'txt'].includes(ext)) return 'training';
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return 'products';
  return 'policies';
}

function getMimeType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    md: 'text/markdown',
    txt: 'text/plain',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    py: 'text/x-python',
    ipynb: 'application/x-ipynb+json',
  };
  return map[ext] || 'application/octet-stream';
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KBDocument[]>(DEMO_DOCS);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewDoc, setPreviewDoc] = useState<KBDocument | null>(null);
  const [readingOpen, setReadingOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* -- Derived ------------------------------------------------------------ */

  const categories: Category[] = useMemo(
    () =>
      CATEGORY_DEFS.map((c) => ({
        ...c,
        count:
          c.id === 'all'
            ? documents.length
            : documents.filter((d) => d.category === c.id).length,
      })),
    [documents],
  );

  const filtered = useMemo(() => {
    let result = [...documents];
    if (activeCategory !== 'all') {
      result = result.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result.sort(
      (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
    );
  }, [documents, activeCategory, search]);

  const bookCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const level of READING_LEVELS) {
      counts[level.id] = readingProgram.filter((b) => b.level === level.id).length;
    }
    return counts;
  }, []);

  /* -- Handlers ----------------------------------------------------------- */

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        const mimeType = file.type || getMimeType(file.name);
        const doc: KBDocument = {
          id: `d${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          category: autoCategorize(file.name),
          type: mimeType,
          size: file.size,
          uploadDate: new Date().toISOString().split('T')[0],
          tags: [],
          url: objectUrl,
        };

        // For text-based files, also read the content for inline preview
        if (mimeType === 'text/markdown' || mimeType === 'text/plain') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const textContent = e.target?.result as string;
            setDocuments((prev) =>
              prev.map((d) =>
                d.id === doc.id ? { ...d, content: textContent } : d
              )
            );
          };
          reader.readAsText(file);
        }

        setDocuments((prev) => [doc, ...prev]);
      });
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleDelete = useCallback((id: string) => {
    setDocuments((prev) => {
      const doc = prev.find((d) => d.id === id);
      if (doc?.url) {
        URL.revokeObjectURL(doc.url);
      }
      return prev.filter((d) => d.id !== id);
    });
    setPreviewDoc((prev) => (prev?.id === id ? null : prev));
  }, []);

  const handleDocumentDownload = useCallback((doc: KBDocument) => {
    if (doc.url) {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.content) {
      const blob = new Blob([doc.content], { type: doc.type });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } else {
      // Seed doc without file - generate a placeholder text download
      const placeholder = `${doc.name}\n\nThis is a placeholder for: ${doc.name}\nCategory: ${doc.category}\nOriginal size: ${formatFileSize(doc.size)}\nDate: ${doc.uploadDate}\n\nUpload the actual file to replace this placeholder.`;
      const blob = new Blob([placeholder], { type: 'text/plain' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.name.replace(/\.[^.]+$/, '.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }
  }, []);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      documents.forEach((doc) => {
        if (doc.url) {
          URL.revokeObjectURL(doc.url);
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* -- Render ------------------------------------------------------------- */

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-6">
      {/* ------------------------------------------------------------------ */}
      {/*  Left Sidebar: Categories + Reading Program                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex w-64 flex-shrink-0 flex-col gap-4 overflow-y-auto">
        {/* Category Tree */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
          <div className="mb-3 flex items-center gap-2">
            <FolderTree size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white">Categories</h3>
          </div>
          <nav className="space-y-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <span className="flex-shrink-0">{cat.icon}</span>
                <span className="flex-1 truncate">{cat.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Reading Program */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
          <button
            onClick={() => setReadingOpen((v) => !v)}
            className="flex w-full items-center gap-2"
          >
            <Library size={16} className="text-cyan-400" />
            <h3 className="flex-1 text-left text-sm font-semibold text-white">
              Reading Program
            </h3>
            {readingOpen ? (
              <ChevronDown size={14} className="text-gray-500" />
            ) : (
              <ChevronRight size={14} className="text-gray-500" />
            )}
          </button>

          {readingOpen && (
            <div className="mt-3 space-y-1.5">
              <p className="mb-2 text-xs text-gray-500">{readingPolicy.description}</p>
              {READING_LEVELS.map((level) => (
                <div
                  key={level.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-gray-500" />
                    <span>{level.label}</span>
                  </div>
                  <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-500">
                    {bookCounts[level.id]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Center: Upload + Search + Document Grid                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Knowledge Base</h2>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
              {filtered.length}
            </span>
          </div>
        </div>

        {/* Upload Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-6 transition-colors ${
            dragOver
              ? 'border-cyan-400 bg-cyan-500/5'
              : 'border-gray-700 bg-[#0a0e1a] hover:border-gray-600'
          }`}
        >
          <Upload
            size={28}
            className={dragOver ? 'text-cyan-400' : 'text-gray-500'}
          />
          <p className="text-sm text-gray-400">
            Drop files here or{' '}
            <span className="text-cyan-400 underline underline-offset-2">
              click to browse
            </span>
          </p>
          <p className="text-xs text-gray-600">PDF, DOCX, MD, images, notebooks</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents and tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-800 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-cyan-500/50"
          />
        </div>

        {/* Document Grid */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500">
              <File size={40} className="text-gray-700" />
              <p className="text-sm">
                {documents.length === 0
                  ? 'No documents yet. Upload your first file above.'
                  : 'No documents match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doc) => {
                const catDef = CATEGORY_DEFS.find((c) => c.id === doc.category);
                return (
                  <div
                    key={doc.id}
                    className="group rounded-xl border border-gray-800 bg-[#111827] p-4 transition-colors hover:border-gray-700"
                  >
                    {/* Card top row */}
                    <div className="mb-3 flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-200">
                          {doc.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {formatFileSize(doc.size)} &middot; {formatDate(doc.uploadDate)}
                        </p>
                      </div>
                    </div>

                    {/* Category badge */}
                    {catDef && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-400">
                        {catDef.icon}
                        {catDef.name}
                      </span>
                    )}

                    {/* Tags */}
                    {doc.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 border-t border-gray-800/50 pt-3">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-cyan-400"
                      >
                        <Eye size={13} />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDocumentDownload(doc)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-cyan-400"
                      >
                        <Download size={13} />
                        {doc.url || doc.content ? 'Download' : 'Export Info'}
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Document Preview Overlay                                          */}
      {/* ------------------------------------------------------------------ */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl border border-gray-800 bg-[#0a0e1a]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
              <div className="flex items-center gap-3 overflow-hidden">
                {getFileIcon(previewDoc.type)}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {previewDoc.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(previewDoc.size)} &middot;{' '}
                    {formatDate(previewDoc.uploadDate)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {previewDoc.type === 'application/pdf' && (
                <>
                  {previewDoc.url ? (
                    <iframe
                      src={previewDoc.url}
                      title={previewDoc.name}
                      className="h-[60vh] w-full rounded-xl border border-gray-800"
                    />
                  ) : (
                    <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <FileText size={32} className="text-red-400/60" />
                        <div>
                          <p className="text-sm font-medium text-gray-200">{previewDoc.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(previewDoc.size)}</p>
                        </div>
                      </div>
                      <h3 className="mb-3 text-sm font-semibold text-white">Document Info</h3>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Type</dt>
                          <dd className="text-gray-300">PDF Document</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Size</dt>
                          <dd className="text-gray-300">{formatFileSize(previewDoc.size)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Uploaded</dt>
                          <dd className="text-gray-300">{formatDate(previewDoc.uploadDate)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Category</dt>
                          <dd className="text-gray-300">{CATEGORY_DEFS.find((c) => c.id === previewDoc.category)?.name || previewDoc.category}</dd>
                        </div>
                        {previewDoc.tags.length > 0 && (
                          <div className="flex justify-between">
                            <dt className="text-gray-500">Tags</dt>
                            <dd className="flex flex-wrap gap-1">
                              {previewDoc.tags.map((tag) => (
                                <span key={tag} className="rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">{tag}</span>
                              ))}
                            </dd>
                          </div>
                        )}
                      </dl>
                      <p className="mt-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 px-3 py-2 text-xs text-cyan-400">
                        Upload the actual file via drag-and-drop to enable inline PDF preview.
                      </p>
                    </div>
                  )}
                </>
              )}

              {previewDoc.type.startsWith('image/') && (
                <div className="flex items-center justify-center rounded-xl border border-gray-800 bg-[#111827] p-4">
                  {previewDoc.url ? (
                    <img
                      src={previewDoc.url}
                      alt={previewDoc.name}
                      className="max-h-[60vh] max-w-full rounded-lg object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Image size={48} className="text-purple-400/60" />
                      <p className="text-sm text-gray-400">
                        Image preview: {previewDoc.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatFileSize(previewDoc.size)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {previewDoc.type === 'text/markdown' && previewDoc.content && (
                <div className="prose prose-invert prose-sm max-w-none rounded-xl border border-gray-800 bg-[#111827] p-6">
                  {previewDoc.content.split('\n').map((line, i) => {
                    if (line.startsWith('# '))
                      return (
                        <h1 key={i} className="mb-3 text-lg font-bold text-white">
                          {line.slice(2)}
                        </h1>
                      );
                    if (line.startsWith('## '))
                      return (
                        <h2 key={i} className="mb-2 mt-4 text-base font-semibold text-gray-200">
                          {line.slice(3)}
                        </h2>
                      );
                    if (line.startsWith('- '))
                      return (
                        <li key={i} className="ml-4 text-gray-400">
                          {line.slice(2)}
                        </li>
                      );
                    if (line.trim() === '') return <div key={i} className="h-2" />;
                    return (
                      <p key={i} className="text-gray-400">
                        {line}
                      </p>
                    );
                  })}
                </div>
              )}

              {!['application/pdf', 'text/markdown'].includes(previewDoc.type) &&
                !previewDoc.type.startsWith('image/') && (
                  <div className="rounded-xl border border-gray-800 bg-[#111827] p-6">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                      Document Metadata
                    </h3>
                    <dl className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">File Name</dt>
                        <dd className="text-gray-300">{previewDoc.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Type</dt>
                        <dd className="text-gray-300">{previewDoc.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Size</dt>
                        <dd className="text-gray-300">
                          {formatFileSize(previewDoc.size)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Uploaded</dt>
                        <dd className="text-gray-300">
                          {formatDate(previewDoc.uploadDate)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Category</dt>
                        <dd className="text-gray-300">
                          {CATEGORY_DEFS.find((c) => c.id === previewDoc.category)
                            ?.name || previewDoc.category}
                        </dd>
                      </div>
                      {previewDoc.tags.length > 0 && (
                        <div className="flex justify-between">
                          <dt className="text-gray-500">Tags</dt>
                          <dd className="flex flex-wrap gap-1">
                            {previewDoc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-800 px-6 py-4">
              <button
                onClick={() => handleDocumentDownload(previewDoc)}
                className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400 transition-colors hover:bg-cyan-500/20"
              >
                <Download size={14} />
                Download
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
