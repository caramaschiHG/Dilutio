import React from 'react';
import { Activity } from 'lucide-react';
import { CalcMode, BasePasteResult } from '../types';

interface MatrixStandardizationFormProps {
    extractType: string;
    setExtractType: (val: string) => void;
    calcMode: CalcMode;
    setCalcMode: (val: CalcMode) => void;
    p_coa: string;
    setPCoa: (val: string) => void;
    m_extrato: string;
    setMExtrato: (val: string) => void;
    v_final: string;
    setVFinal: (val: string) => void;
    c_base: string;
    setCBase: (val: string) => void;
    baseCalculations: BasePasteResult;
}

const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) return '0.00';
    return num.toFixed(2);
};

export function MatrixStandardizationForm({
    extractType,
    setExtractType,
    calcMode,
    setCalcMode,
    p_coa,
    setPCoa,
    m_extrato,
    setMExtrato,
    v_final,
    setVFinal,
    c_base,
    setCBase,
    baseCalculations,
}: MatrixStandardizationFormProps) {
    return (
        <section className="pro-card mb-12">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-100">
                <Activity className="w-5 h-5 text-blue-500" />
                <h2 className="text-xs uppercase tracking-[0.15em] font-bold text-zinc-800">
                    II. Parâmetros da Base
                </h2>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <label className="pro-label">
                            Composição da Matriz
                        </label>
                        <select
                            value={extractType}
                            onChange={(e) => setExtractType(e.target.value)}
                            className="pro-select"
                        >
                            <option value="rosin">Rosin (Sem Solvente)</option>
                            <option value="rso">RSO / FECO (Extrato Completo)</option>
                            <option value="isolado">Isolado / Destilado</option>
                        </select>
                    </div>
                    <div>
                        <label className="pro-label">
                            Diretriz Matemático-Volumétrica
                        </label>
                        <select
                            value={calcMode}
                            onChange={(e) => setCalcMode(e.target.value as CalcMode)}
                            className="pro-select"
                        >
                            <option value="mass">Fixar Massa → Calcular Volume</option>
                            <option value="volume">Fixar Volume → Calcular Massa</option>
                            <option value="concentration">Derivar Concentração Final</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50/50 border border-zinc-100 p-6 rounded-xl">
                    <div>
                        <label className="pro-label">
                            Potência Aferida (COA) / %
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={p_coa}
                            onChange={(e) => setPCoa(e.target.value)}
                            className="pro-input font-mono"
                            placeholder="00.0"
                        />
                    </div>

                    {(calcMode === 'mass' || calcMode === 'concentration') && (
                        <div>
                            <label className="pro-label">
                                Massa da Amostra (g)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={m_extrato}
                                onChange={(e) => setMExtrato(e.target.value)}
                                className="pro-input font-mono"
                                placeholder="0.00"
                            />
                        </div>
                    )}

                    {(calcMode === 'volume' || calcMode === 'concentration') && (
                        <div>
                            <label className="pro-label">
                                Volume TCM / Óleo (ml)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={v_final}
                                onChange={(e) => setVFinal(e.target.value)}
                                className="pro-input font-mono"
                                placeholder="0"
                            />
                        </div>
                    )}

                    {(calcMode === 'mass' || calcMode === 'volume') && (
                        <div>
                            <label className="pro-label">
                                Carga Desejada (mg/ml)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={c_base}
                                onChange={(e) => setCBase(e.target.value)}
                                className="pro-input font-mono"
                                placeholder="0"
                            />
                        </div>
                    )}
                </div>
            </div>

            {baseCalculations.isValid && (
                <div className="mt-8 pt-6 border-t border-zinc-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex flex-col justify-center">
                            <span className="block text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold mb-2">
                                Yield (Ativo)
                            </span>
                            <div className="font-mono text-2xl tracking-tight text-zinc-900 font-medium break-words">
                                {formatNumber(baseCalculations.mg_total)}<span className="text-xs tracking-normal text-zinc-500 ml-1.5 font-sans font-bold">mg</span>
                            </div>
                        </div>
                        {calcMode === 'volume' && (
                            <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex flex-col justify-center">
                                <span className="block text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold mb-2">
                                    Massa Exigida
                                </span>
                                <div className="font-mono text-2xl tracking-tight text-zinc-900 font-medium break-words">
                                    {formatNumber(baseCalculations.m_extrato_final)}<span className="text-xs tracking-normal text-zinc-500 ml-1.5 font-sans font-bold">g</span>
                                </div>
                            </div>
                        )}
                        {calcMode === 'concentration' && (
                            <div className="bg-zinc-900 border border-zinc-900 p-5 rounded-xl shadow-md flex flex-col justify-center">
                                <span className="block text-xs uppercase tracking-[0.15em] text-zinc-400 font-bold mb-2">
                                    Potência Base
                                </span>
                                <div className="font-mono text-2xl tracking-tight text-white font-medium break-words">
                                    {formatNumber(baseCalculations.c_base_final)}<span className="text-xs tracking-normal text-zinc-400 ml-1.5 font-sans font-bold">mg/ml</span>
                                </div>
                            </div>
                        )}
                        {calcMode === 'mass' && (
                            <div className="bg-zinc-900 border border-zinc-900 p-5 rounded-xl shadow-md flex flex-col justify-center">
                                <span className="block text-xs uppercase tracking-[0.15em] text-zinc-400 font-bold mb-2">
                                    Volume Total
                                </span>
                                <div className="font-mono text-2xl tracking-tight text-white font-medium break-words">
                                    {formatNumber(baseCalculations.v_final_base)}<span className="text-xs tracking-normal text-zinc-400 ml-1.5 font-sans font-bold">ml</span>
                                </div>
                            </div>
                        )}
                        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm flex flex-col justify-center">
                            <span className="block text-xs uppercase tracking-[0.15em] text-zinc-500 font-bold mb-2">
                                Aditivo Veicular
                            </span>
                            <div className="font-mono text-2xl tracking-tight text-zinc-900 font-medium break-words">
                                {formatNumber(baseCalculations.v_adicional)}<span className="text-xs tracking-normal text-zinc-500 ml-1.5 font-sans font-bold">ml</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
