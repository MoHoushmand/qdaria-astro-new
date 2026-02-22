import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const CONTRACT_TYPES = [
  { value: 'employment', label: 'Employment' },
  { value: 'nda', label: 'NDA' },
  { value: 'board_agreement', label: 'Board Agreement' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
] as const;

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_EXTENSIONS = '.pdf,.docx';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ContractUploadProps {
  teamMembers: { id: string; name: string }[];
  onClose: () => void;
  onUpload: () => void;
}

export default function ContractUpload({ teamMembers, onClose, onUpload }: ContractUploadProps) {
  const [teamMemberId, setTeamMemberId] = useState('');
  const [contractType, setContractType] = useState('employment');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return 'Only PDF and DOCX files are accepted.';
    }
    if (f.size > MAX_FILE_SIZE) {
      return 'File size must be under 10 MB.';
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (f: File) => {
      const err = validateFile(f);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      setFile(f);
    },
    [validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFileSelect(dropped);
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFileSelect(selected);
    },
    [handleFileSelect]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!teamMemberId) {
      setError('Please select a team member.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a contract title.');
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('team_member_id', teamMemberId);
      formData.append('type', contractType);
      formData.append('title', title.trim());
      formData.append('file', file);

      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const res = await fetch('/api/admin/contracts', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }

      setUploadProgress(100);
      setSuccess(true);

      setTimeout(() => {
        onUpload();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-gray-800 bg-[#0a0e1a] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isUploading}
          className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-300 disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white">Upload Contract</h2>
        <p className="mt-1 text-sm text-gray-400">Upload a new contract document for a team member.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Team Member */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Team Member</label>
            <select
              value={teamMemberId}
              onChange={(e) => setTeamMemberId(e.target.value)}
              disabled={isUploading}
              className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
            >
              <option value="">Select a team member...</option>
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contract Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Contract Type</label>
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              disabled={isUploading}
              className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
            >
              {CONTRACT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUploading}
              placeholder="e.g. Employment Agreement 2026"
              className="w-full rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-cyan-500/50 disabled:opacity-50"
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">Document</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors ${
                isDragging
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : file
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-gray-700 bg-[#111827] hover:border-gray-600'
              } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
            >
              {file ? (
                <>
                  <FileText className="mb-2 h-8 w-8 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">{file.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB - Click to change
                  </p>
                </>
              ) : (
                <>
                  <Upload className="mb-2 h-8 w-8 text-gray-500" />
                  <p className="text-sm text-gray-400">
                    Drag & drop your file here, or <span className="text-cyan-400">browse</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-600">PDF or DOCX, max 10 MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS}
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Contract uploaded successfully!
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="flex-1 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || success}
              className="flex-1 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-cyan-400 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
