import React from 'react';
import { Leaf } from 'lucide-react';

interface TraceabilityPanelProps {
  technician: string;
  setTechnician: (val: string) => void;
  batchNumber: string;
  date: string;
}

export function TraceabilityPanel({
  technician,
  setTechnician,
  batchNumber,
  date,
}: TraceabilityPanelProps) {
  return (
    <section className="pro-card mb-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-zinc-800 transition-colors duration-500">
        <Leaf className="w-5 h-5 text-blue-500" />
        <h2 className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-800 dark:text-zinc-200 transition-colors duration-500">
          I. Meta Data & Rastreabilidade
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="pro-label">
            Técnico Identificado
          </label>
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="pro-input"
            placeholder="Nome Completo"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="pro-label">
              Lote de Produção
            </label>
            <input
              type="text"
              value={batchNumber}
              readOnly
              className="pro-input font-mono bg-zinc-50 dark:bg-zinc-800/50"
            />
          </div>
          <div>
            <label className="pro-label">
              Emissão
            </label>
            <input
              type="text"
              value={date}
              readOnly
              className="pro-input font-mono bg-zinc-50 dark:bg-zinc-800/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
