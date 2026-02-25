import React from 'react';
import { motion } from 'motion/react';
import { Download, X } from 'lucide-react';

interface PdfPreviewModalProps {
  pdfUrl: string;
  batchNumber: string;
  onClose: () => void;
}

export function PdfPreviewModal({ pdfUrl, batchNumber, onClose }: PdfPreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4 md:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-6xl h-full flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-500"
      >
        <div className="flex justify-between items-center px-8 py-5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-500">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-900 dark:text-zinc-100 mb-1 transition-colors duration-500">
              Dossiê Padrão Operacional Emitido
            </h3>
            <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 tracking-wider transition-colors duration-500">REF: {batchNumber}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={pdfUrl}
              download={`POP_${batchNumber}.pdf`}
              className="pro-button-primary py-2"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              Transferir Arquivo
            </a>
            <button
              onClick={onClose}
              className="text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 p-2 rounded-lg transition-colors"
              title="Encerrar Visualização"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-950 p-6 md:p-8 flex transition-colors duration-500">
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-1 transition-colors duration-500"
            title="Dossiê POP Preview"
          />
        </div>
      </motion.div>
    </div>
  );
}
