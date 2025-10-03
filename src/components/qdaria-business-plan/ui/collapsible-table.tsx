import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from '@/components/pitch-deck/ui/card';

interface TableRow {
  id: string;
  name: string;
  value: string | number;
  details?: { label: string; value: string | number }[];
  children?: TableRow[];
}

interface CollapsibleTableProps {
  data: TableRow[];
  title: string;
  className?: string;
}

export const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ 
  data, 
  title, 
  className = "" 
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const renderRow = (row: TableRow, level = 0) => {
    const isExpanded = expandedRows.has(row.id);
    const hasChildren = row.children && row.children.length > 0;
    const hasDetails = row.details && row.details.length > 0;

    return (
      <div key={row.id} className={`${level > 0 ? 'ml-6 border-l border-cyan-400/20 pl-4' : ''}`}>
        <div 
          className={`flex items-center justify-between p-3 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-colors ${
            level === 0 ? 'border-b border-slate-700/50' : ''
          }`}
          onClick={() => (hasChildren || hasDetails) && toggleRow(row.id)}
        >
          <div className="flex items-center space-x-3">
            {(hasChildren || hasDetails) && (
              <div className="text-cyan-400">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            )}
            <span className="text-gray-200 font-medium">{row.name}</span>
          </div>
          <span className="text-cyan-400 font-semibold">{row.value}</span>
        </div>
        
        {isExpanded && hasDetails && (
          <div className="ml-6 mt-2 space-y-2">
            {row.details?.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-slate-800/20 rounded text-sm">
                <span className="text-gray-300">{detail.label}</span>
                <span className="text-gray-200">{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        
        {isExpanded && hasChildren && (
          <div className="mt-2">
            {row.children?.map(child => renderRow(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={`qdaria-card p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-1">
        {data.map(row => renderRow(row))}
      </div>
    </Card>
  );
};