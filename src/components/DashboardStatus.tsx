import React from 'react';
import { motion } from 'motion/react';

interface DashboardStatusProps {
    isValid: boolean;
}

export function DashboardStatus({ isValid }: DashboardStatusProps) {
    return (
        <section className="pro-card mb-12 flex flex-col justify-between h-40 relative overflow-hidden group">
            {/* Background subtle glow when valid */}
            {isValid && (
                <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            <div className="flex justify-between items-start relative z-10 transition-colors duration-500">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 transition-colors duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 block transition-colors duration-500" />
                    Telemetria do Sistema
                </h2>
                <div className="flex items-center gap-2">
                    {isValid ? (
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full transition-colors duration-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-sm shadow-green-500/50"></span>
                            </span>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-green-700 dark:text-green-400 transition-colors duration-500">Online</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full transition-colors duration-500">
                            <span className="relative flex h-2 w-2">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-amber-700 dark:text-amber-400 transition-colors duration-500">Offline</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 transition-colors duration-500">
                <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3 font-semibold transition-colors duration-500">
                    {isValid ? 'STATUS: ATIVO / PADRÃO ATINGIDO' : 'STATUS: AGUARDANDO PARAMETROS COA'}
                </p>

                {/* Minimalist Progress Line */}
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full relative overflow-hidden transition-colors duration-500">
                    <motion.div
                        className={`absolute top-0 left-0 h-full rounded-full transition-colors duration-500 ${isValid ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isValid ? '100%' : '5%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </section>
    );
}
