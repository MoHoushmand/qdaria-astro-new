import React, { useState, useRef, useCallback } from 'react';
import {
  Database, Upload, Play, CheckCircle, XCircle, Cpu, BarChart3,
  GitCompare, Trash2, Eye, Plus, Loader2,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Tab = 'datasets' | 'jobs' | 'models' | 'evaluate';
type DatasetFormat = 'jsonl' | 'csv';
type DatasetStatus = 'valid' | 'invalid' | 'validating';
type JobStatus = 'queued' | 'training' | 'completed' | 'failed';

interface DatasetRow { role?: string; content?: string; prompt?: string; completion?: string; }
interface Dataset {
  id: string; name: string; format: DatasetFormat; rows: number;
  size: string; status: DatasetStatus; preview: DatasetRow[];
}
interface Job {
  id: string; datasetId: string; datasetName: string; baseModel: string;
  status: JobStatus; created: string; progress: number; epochs: number;
  learningRate: number; batchSize: number;
  logs: string[];
}
interface FineTunedModel {
  id: string; name: string; baseModel: string; datasetName: string;
  created: string; status: 'ready' | 'deploying'; evalScore: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: 'datasets', label: 'Datasets' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'models', label: 'Models' },
  { key: 'evaluate', label: 'Evaluate' },
];

const BASE_MODELS = [
  'QDaria-7B', 'QDaria-13B', 'QDaria-70B', 'Llama-3-8B', 'Mistral-7B-v0.3',
];

const STATUS_BADGE: Record<string, string> = {
  valid: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  invalid: 'bg-red-500/20 text-red-400 border-red-500/30',
  validating: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  queued: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  training: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
  ready: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  deploying: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

// ── Seed Data ──────────────────────────────────────────────────────────────────

const SEED_DATASETS: Dataset[] = [
  {
    id: 'ds-1', name: 'QDaria FAQ', format: 'jsonl', rows: 10, size: '4.2 KB', status: 'valid',
    preview: [
      { role: 'user', content: 'What is quantum reservoir computing?' },
      { role: 'assistant', content: 'Quantum reservoir computing (QRC) leverages the complex dynamics of quantum systems as a computational resource for temporal processing tasks.' },
      { role: 'user', content: 'How does QDaria differ from classical approaches?' },
      { role: 'assistant', content: 'QDaria uses topological qubits with inherently lower error rates, enabling deeper circuits without error correction overhead.' },
      { role: 'user', content: 'What problems can QRC solve?' },
    ],
  },
  {
    id: 'ds-2', name: 'Contract Clauses', format: 'csv', rows: 5, size: '1.8 KB', status: 'valid',
    preview: [
      { prompt: 'Draft a confidentiality clause for an NDA.', completion: 'The Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose...' },
      { prompt: 'Write a termination clause.', completion: 'Either party may terminate this Agreement upon thirty (30) days written notice to the other party...' },
      { prompt: 'Add an intellectual property assignment clause.', completion: 'All inventions, discoveries, and works of authorship conceived during the term shall be assigned to the Company...' },
      { prompt: 'Draft a non-compete provision.', completion: 'For a period of twelve (12) months following termination, the Employee shall not engage in any business...' },
      { prompt: 'Write a force majeure clause.', completion: 'Neither party shall be liable for any failure to perform due to causes beyond its reasonable control...' },
    ],
  },
];

const SEED_JOBS: Job[] = [
  {
    id: 'ft-abc123', datasetId: 'ds-1', datasetName: 'QDaria FAQ', baseModel: 'QDaria-7B',
    status: 'completed', created: '2026-02-17T10:30:00Z', progress: 100, epochs: 3,
    learningRate: 0.0002, batchSize: 4,
    logs: ['[Epoch 1/3] loss=2.41 lr=0.0002', '[Epoch 2/3] loss=1.12 lr=0.00018', '[Epoch 3/3] loss=0.58 lr=0.00016', 'Training complete. Final loss: 0.58'],
  },
  {
    id: 'ft-def456', datasetId: 'ds-2', datasetName: 'Contract Clauses', baseModel: 'Mistral-7B-v0.3',
    status: 'training', created: '2026-02-19T08:15:00Z', progress: 62, epochs: 5,
    learningRate: 0.0001, batchSize: 8,
    logs: ['[Epoch 1/5] loss=3.05 lr=0.0001', '[Epoch 2/5] loss=2.14 lr=0.00009', '[Epoch 3/5] loss=1.67 lr=0.00008', 'Training in progress...'],
  },
  {
    id: 'ft-ghi789', datasetId: 'ds-1', datasetName: 'QDaria FAQ', baseModel: 'Llama-3-8B',
    status: 'queued', created: '2026-02-19T11:00:00Z', progress: 0, epochs: 2,
    learningRate: 0.0003, batchSize: 4,
    logs: ['Job queued. Waiting for GPU resources...'],
  },
];

const SEED_MODELS: FineTunedModel[] = [
  { id: 'mdl-1', name: 'qdaria-faq-7b-v1', baseModel: 'QDaria-7B', datasetName: 'QDaria FAQ', created: '2026-02-17T14:30:00Z', status: 'ready', evalScore: 87.4 },
  { id: 'mdl-2', name: 'contract-assist-mistral', baseModel: 'Mistral-7B-v0.3', datasetName: 'Contract Clauses', created: '2026-02-15T09:00:00Z', status: 'ready', evalScore: 91.2 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Badge({ status }: { status: string }) {
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs capitalize ${STATUS_BADGE[status] ?? ''}`}>
      {status}
    </span>
  );
}

// ── Datasets Tab ───────────────────────────────────────────────────────────────

function DatasetsTab({ datasets, setDatasets }: {
  datasets: Dataset[];
  setDatasets: React.Dispatch<React.SetStateAction<Dataset[]>>;
}) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const ext = file.name.split('.').pop()?.toLowerCase();
      let rows = 0;
      let status: DatasetStatus = 'valid';
      const preview: DatasetRow[] = [];
      const format: DatasetFormat = ext === 'csv' ? 'csv' : 'jsonl';

      if (format === 'jsonl') {
        const lines = text.trim().split('\n');
        rows = lines.length;
        for (let i = 0; i < Math.min(5, lines.length); i++) {
          try {
            const obj = JSON.parse(lines[i]);
            if (!obj.messages || !Array.isArray(obj.messages)) { status = 'invalid'; }
            else {
              const valid = obj.messages.every((m: any) => m.role && m.content);
              if (!valid) status = 'invalid';
              preview.push({ role: obj.messages[0]?.role, content: obj.messages[0]?.content });
            }
          } catch { status = 'invalid'; }
        }
      } else {
        const lines = text.trim().split('\n');
        if (lines.length < 2) { status = 'invalid'; }
        else {
          const header = lines[0].toLowerCase();
          if (!header.includes('prompt') || !header.includes('completion')) { status = 'invalid'; }
          rows = lines.length - 1;
          for (let i = 1; i < Math.min(6, lines.length); i++) {
            const parts = lines[i].split(',');
            preview.push({ prompt: parts[0]?.trim(), completion: parts.slice(1).join(',').trim() });
          }
        }
      }

      const sizeKB = (file.size / 1024).toFixed(1);
      const ds: Dataset = {
        id: `ds-${Date.now()}`, name: file.name, format, rows, size: `${sizeKB} KB`,
        status, preview,
      };
      setDatasets((prev) => [...prev, ds]);
    };
    reader.readAsText(file);
  }, [setDatasets]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const previewDs = previewId ? datasets.find((d) => d.id === previewId) : null;

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 bg-[#111827] hover:border-gray-600'
        }`}
      >
        <Upload className="mb-3 h-8 w-8 text-gray-500" />
        <p className="text-sm text-gray-400">
          Drag & drop a JSONL or CSV file, or <span className="text-cyan-400">browse</span>
        </p>
        <p className="mt-1 text-xs text-gray-600">JSONL: messages array per line | CSV: prompt,completion columns</p>
      </div>
      <input ref={inputRef} type="file" accept=".jsonl,.csv" onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} className="hidden" />

      {/* Dataset Table */}
      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-[#111827]">
              <th className="px-4 py-3 font-medium text-gray-400">Name</th>
              <th className="px-4 py-3 font-medium text-gray-400">Format</th>
              <th className="px-4 py-3 font-medium text-gray-400">Rows</th>
              <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">Size</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((ds) => (
              <tr key={ds.id} className="border-b border-gray-800/50 hover:bg-[#111827]/70">
                <td className="px-4 py-3 font-medium text-gray-200">{ds.name}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400 uppercase">{ds.format}</span>
                </td>
                <td className="px-4 py-3 text-gray-400">{ds.rows}</td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{ds.size}</td>
                <td className="px-4 py-3"><Badge status={ds.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPreviewId(previewId === ds.id ? null : ds.id)} className="text-cyan-400 hover:text-cyan-300 transition-colors" title="Preview">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDatasets((prev) => prev.filter((d) => d.id !== ds.id))} className="text-gray-500 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {datasets.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No datasets uploaded yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Panel */}
      {previewDs && (
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Preview: {previewDs.name} (first 5 rows)</h4>
            <button onClick={() => setPreviewId(null)} className="text-gray-500 hover:text-gray-300"><XCircle className="h-4 w-4" /></button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {previewDs.preview.map((row, i) => (
              <div key={i} className="rounded-lg border border-gray-800 bg-[#0a0e1a] p-3 text-xs">
                {previewDs.format === 'jsonl' ? (
                  <><span className="text-cyan-400">{row.role}:</span> <span className="text-gray-300">{row.content}</span></>
                ) : (
                  <><span className="text-cyan-400">prompt:</span> <span className="text-gray-300">{row.prompt}</span><br /><span className="text-emerald-400">completion:</span> <span className="text-gray-300">{row.completion}</span></>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Jobs Tab ───────────────────────────────────────────────────────────────────

function JobsTab({ jobs, setJobs, datasets }: {
  jobs: Job[]; setJobs: React.Dispatch<React.SetStateAction<Job[]>>; datasets: Dataset[];
}) {
  const [showNew, setShowNew] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [newDataset, setNewDataset] = useState('');
  const [newModel, setNewModel] = useState(BASE_MODELS[0]);
  const [newEpochs, setNewEpochs] = useState(3);
  const [newLr, setNewLr] = useState('0.0002');
  const [newBatch, setNewBatch] = useState(4);

  const createJob = () => {
    const ds = datasets.find((d) => d.id === newDataset);
    if (!ds) return;
    const job: Job = {
      id: `ft-${Math.random().toString(36).slice(2, 8)}`, datasetId: ds.id, datasetName: ds.name,
      baseModel: newModel, status: 'queued', created: new Date().toISOString(), progress: 0,
      epochs: newEpochs, learningRate: parseFloat(newLr), batchSize: newBatch,
      logs: ['Job queued. Waiting for GPU resources...'],
    };
    setJobs((prev) => [job, ...prev]);
    setShowNew(false);
  };

  const viewJob = selectedJob ? jobs.find((j) => j.id === selectedJob) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Fine-tuning Jobs</h3>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-400">
          <Plus className="h-4 w-4" /> New Job
        </button>
      </div>

      {/* New Job Form */}
      {showNew && (
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-5 space-y-4">
          <h4 className="text-sm font-medium text-white">Create Fine-tuning Job</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Dataset</label>
              <select value={newDataset} onChange={(e) => setNewDataset(e.target.value)} className="w-full rounded-lg border border-gray-800 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-500/50">
                <option value="">Select dataset...</option>
                {datasets.filter((d) => d.status === 'valid').map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Base Model</label>
              <select value={newModel} onChange={(e) => setNewModel(e.target.value)} className="w-full rounded-lg border border-gray-800 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-500/50">
                {BASE_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Epochs (1-10)</label>
              <input type="number" min={1} max={10} value={newEpochs} onChange={(e) => setNewEpochs(Number(e.target.value))} className="w-full rounded-lg border border-gray-800 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Learning Rate</label>
              <input type="text" value={newLr} onChange={(e) => setNewLr(e.target.value)} className="w-full rounded-lg border border-gray-800 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-400">Batch Size</label>
              <input type="number" min={1} max={64} value={newBatch} onChange={(e) => setNewBatch(Number(e.target.value))} className="w-full rounded-lg border border-gray-800 bg-[#0a0e1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => setShowNew(false)} className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">Cancel</button>
            <button onClick={createJob} disabled={!newDataset} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400 transition-colors disabled:opacity-40">Create Job</button>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="overflow-hidden rounded-xl border border-gray-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-[#111827]">
              <th className="px-4 py-3 font-medium text-gray-400">Job ID</th>
              <th className="px-4 py-3 font-medium text-gray-400">Dataset</th>
              <th className="px-4 py-3 font-medium text-gray-400 hidden md:table-cell">Base Model</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 font-medium text-gray-400 hidden lg:table-cell">Created</th>
              <th className="px-4 py-3 font-medium text-gray-400">Progress</th>
              <th className="px-4 py-3 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-800/50 hover:bg-[#111827]/70">
                <td className="px-4 py-3 font-mono text-xs text-gray-200">{job.id}</td>
                <td className="px-4 py-3 text-gray-300">{job.datasetName}</td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{job.baseModel}</td>
                <td className="px-4 py-3"><Badge status={job.status} /></td>
                <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{formatDate(job.created)}</td>
                <td className="px-4 py-3 w-36">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          job.status === 'failed' ? 'bg-red-500' : job.status === 'completed' ? 'bg-emerald-500' : 'bg-cyan-500'
                        } ${job.status === 'training' ? 'animate-pulse' : ''}`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{job.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)} className="text-cyan-400 hover:text-cyan-300 transition-colors" title="View logs">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">No fine-tuning jobs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Log Viewer */}
      {viewJob && (
        <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-medium text-white">Logs: {viewJob.id}</h4>
            <button onClick={() => setSelectedJob(null)} className="text-gray-500 hover:text-gray-300"><XCircle className="h-4 w-4" /></button>
          </div>
          <div className="rounded-lg bg-[#070b14] p-3 font-mono text-xs text-gray-400 max-h-48 overflow-y-auto space-y-1">
            {viewJob.logs.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-600 select-none">{String(i + 1).padStart(2, '0')}</span>
                <span className={line.includes('loss=') ? 'text-cyan-400' : line.includes('complete') ? 'text-emerald-400' : ''}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Models Tab ─────────────────────────────────────────────────────────────────

function ModelsTab({ models }: { models: FineTunedModel[] }) {
  const [deploying, setDeploying] = useState<string | null>(null);

  const handleDeploy = (id: string) => {
    setDeploying(id);
    setTimeout(() => setDeploying(null), 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Model Registry</h3>
      {models.length === 0 && (
        <div className="rounded-xl border border-gray-800 bg-[#111827] px-6 py-12 text-center text-gray-500">
          No fine-tuned models yet. Complete a training job first.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((m) => (
          <div key={m.id} className="rounded-xl border border-gray-800 bg-[#111827] p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-white">{m.name}</h4>
                <p className="mt-0.5 text-xs text-gray-500">Based on {m.baseModel}</p>
              </div>
              <Badge status={m.status} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-500">Dataset:</span> <span className="text-gray-300">{m.datasetName}</span></div>
              <div><span className="text-gray-500">Created:</span> <span className="text-gray-300">{formatDate(m.created)}</span></div>
              <div><span className="text-gray-500">Eval Score:</span> <span className="text-emerald-400 font-medium">{m.evalScore}%</span></div>
            </div>
            <button
              onClick={() => handleDeploy(m.id)}
              disabled={deploying === m.id}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 disabled:opacity-60"
            >
              {deploying === m.id ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Deploying...</>
              ) : (
                <><Play className="h-4 w-4" /> Deploy to Playground</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Evaluate Tab ───────────────────────────────────────────────────────────────

function EvaluateTab() {
  const [prompt, setPrompt] = useState('');
  const [baseResponse, setBaseResponse] = useState('');
  const [ftResponse, setFtResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [votes, setVotes] = useState<{ base: 'up' | 'down' | null; ft: 'up' | 'down' | null }>({ base: null, ft: null });

  const mockResponses: Record<string, [string, string]> = {
    default: [
      'Quantum computing uses quantum bits (qubits) that can exist in superposition states, enabling parallel computation. This allows certain algorithms to achieve exponential speedups over classical approaches.',
      'Quantum computing leverages the unique properties of quantum mechanics -- superposition, entanglement, and interference -- to process information in fundamentally new ways. QDaria\'s topological qubit architecture provides inherent error protection through non-Abelian anyons, allowing deeper circuits without the overhead of traditional error correction codes. This makes QRC particularly effective for temporal pattern recognition in financial and scientific data.',
    ],
  };

  const handleSend = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setVotes({ base: null, ft: null });
    setTimeout(() => {
      const [base, ft] = mockResponses.default;
      setBaseResponse(base);
      setFtResponse(ft);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Side-by-Side Evaluation</h3>

      {/* Prompt Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Enter a prompt to compare base vs fine-tuned model..."
          className="flex-1 rounded-lg border border-gray-800 bg-[#111827] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-cyan-500/50"
        />
        <button
          onClick={handleSend}
          disabled={isGenerating || !prompt.trim()}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-cyan-400 disabled:opacity-40"
        >
          {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <GitCompare className="h-4 w-4" />}
          Compare
        </button>
      </div>

      {/* Side by Side */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Base Model */}
        <div className="rounded-xl border border-gray-800 bg-[#111827] flex flex-col">
          <div className="border-b border-gray-800 px-4 py-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-300">Base Model</span>
          </div>
          <div className="flex-1 p-4 min-h-[120px]">
            {isGenerating ? (
              <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" /> Generating...</div>
            ) : baseResponse ? (
              <p className="text-sm text-gray-300 leading-relaxed">{baseResponse}</p>
            ) : (
              <p className="text-sm text-gray-600 italic">Response will appear here...</p>
            )}
          </div>
          {baseResponse && !isGenerating && (
            <div className="border-t border-gray-800 px-4 py-2 flex gap-2">
              <button onClick={() => setVotes((v) => ({ ...v, base: v.base === 'up' ? null : 'up' }))} className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${votes.base === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}>
                <CheckCircle className="h-4 w-4" />
              </button>
              <button onClick={() => setVotes((v) => ({ ...v, base: v.base === 'down' ? null : 'down' }))} className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${votes.base === 'down' ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-gray-300'}`}>
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Fine-tuned Model */}
        <div className="rounded-xl border border-cyan-500/30 bg-[#111827] flex flex-col">
          <div className="border-b border-gray-800 px-4 py-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Fine-tuned Model</span>
          </div>
          <div className="flex-1 p-4 min-h-[120px]">
            {isGenerating ? (
              <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" /> Generating...</div>
            ) : ftResponse ? (
              <p className="text-sm text-gray-300 leading-relaxed">{ftResponse}</p>
            ) : (
              <p className="text-sm text-gray-600 italic">Response will appear here...</p>
            )}
          </div>
          {ftResponse && !isGenerating && (
            <div className="border-t border-gray-800 px-4 py-2 flex gap-2">
              <button onClick={() => setVotes((v) => ({ ...v, ft: v.ft === 'up' ? null : 'up' }))} className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${votes.ft === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}>
                <CheckCircle className="h-4 w-4" />
              </button>
              <button onClick={() => setVotes((v) => ({ ...v, ft: v.ft === 'down' ? null : 'down' }))} className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${votes.ft === 'down' ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-gray-300'}`}>
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────

export default function FineTuningDashboard() {
  const [tab, setTab] = useState<Tab>('datasets');
  const [datasets, setDatasets] = useState<Dataset[]>(SEED_DATASETS);
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS);
  const [models] = useState<FineTunedModel[]>(SEED_MODELS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Database className="h-6 w-6 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white">Fine-tuning</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-800">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'datasets' && <DatasetsTab datasets={datasets} setDatasets={setDatasets} />}
      {tab === 'jobs' && <JobsTab jobs={jobs} setJobs={setJobs} datasets={datasets} />}
      {tab === 'models' && <ModelsTab models={models} />}
      {tab === 'evaluate' && <EvaluateTab />}
    </div>
  );
}
