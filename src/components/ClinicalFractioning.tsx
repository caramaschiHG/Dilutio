import React from 'react';
import { Microscope, Plus, X } from 'lucide-react';
import { PatientPrescription, PatientCalculation } from '../types';

interface ClinicalFractioningProps {
    patients: PatientPrescription[];
    patientCalculations: PatientCalculation[];
    basePasteIsValid: boolean;
    basePasteSufficient: boolean;
    totalAliquotaRequired: number;
    v_final_base: number;
    handleAddPatient: () => void;
    handleRemovePatient: (id: string) => void;
    handlePatientChange: (id: string, field: keyof PatientPrescription, value: string) => void;
}

const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) return '0.00';
    return num.toFixed(2);
};

export function ClinicalFractioning({
    patients,
    patientCalculations,
    basePasteIsValid,
    basePasteSufficient,
    totalAliquotaRequired,
    v_final_base,
    handleAddPatient,
    handleRemovePatient,
    handlePatientChange,
}: ClinicalFractioningProps) {
    return (
        <section className="pro-card mb-12 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-500">
                <div className="flex items-center gap-3">
                    <Microscope className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xs uppercase tracking-[0.15em] font-bold text-zinc-800 dark:text-zinc-200 transition-colors duration-500">
                        III. Prescrições & Alíquotas
                    </h2>
                </div>

                <button
                    onClick={handleAddPatient}
                    className="pro-button-secondary py-1.5 px-3 text-[10px] tracking-widest text-zinc-700"
                >
                    <Plus className="w-3 h-3 text-blue-500" />
                    Novo Registro
                </button>
            </div>

            {!basePasteIsValid && (
                <div className="mb-6 py-3 px-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 text-xs tracking-wide rounded-xl flex items-center gap-2 font-medium transition-colors duration-500">
                    Aguardando estabilização dos parâmetros da base extrativa.
                </div>
            )}

            {basePasteIsValid && !basePasteSufficient && (
                <div className="mb-6 py-3 px-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-400 text-xs tracking-wide rounded-xl flex items-center gap-2 font-medium transition-colors duration-500">
                    ⚠️ CRÍTICO: Demanda requisitada ({formatNumber(totalAliquotaRequired)} ml) superior ao estoque de base gerada ({formatNumber(v_final_base)} ml).
                </div>
            )}

            <div className="space-y-4 flex-1">
                {patientCalculations.map((patient, index) => (
                    <div
                        key={patient.id}
                        className={`p-6 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all duration-500 ${patient.error ? 'opacity-70 grayscale border-red-200 dark:border-red-500/30 bg-red-50/30 dark:bg-red-500/5' : 'opacity-100'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-6 group">
                            <input
                                type="text"
                                value={patient.name}
                                onChange={(e) => handlePatientChange(patient.id, 'name', e.target.value)}
                                className="font-sans font-bold text-lg tracking-wide text-zinc-900 dark:text-zinc-100 bg-transparent border-0 border-b border-transparent focus:border-blue-500 outline-none px-0 py-1 transition-colors w-full max-w-[80%] placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                                placeholder={`Paciente / ID Nº ${index + 1}`}
                            />
                            <button
                                onClick={() => handleRemovePatient(patient.id)}
                                className="text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-800 p-2 rounded-lg transition-colors"
                                title="Excluir Registro"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Entradas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="pro-label">
                                        Carga Alvo (mg/ml)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={patient.c_alvo}
                                        onChange={(e) => handlePatientChange(patient.id, 'c_alvo', e.target.value)}
                                        className="pro-input font-mono shadow-none"
                                        placeholder="000"
                                    />
                                </div>
                                <div>
                                    <label className="pro-label">
                                        Volume (ml)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={patient.v_frasco}
                                        onChange={(e) => handlePatientChange(patient.id, 'v_frasco', e.target.value)}
                                        className="pro-input font-mono shadow-none"
                                        placeholder="00"
                                    />
                                </div>
                            </div>

                            {/* Saídas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-center transition-colors duration-500">
                                    <span className="block text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold mb-1.5 flex-shrink-0 transition-colors duration-500">
                                        Alíquota Matriz
                                    </span>
                                    <div className={`font-mono text-xl tracking-tight font-medium break-words transition-colors duration-500 ${patient.error ? 'text-red-600 dark:text-red-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {formatNumber(patient.v_aliquota)} <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-1 tracking-normal font-sans font-bold">ml</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col justify-center transition-colors duration-500">
                                    <span className="block text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold mb-1.5 flex-shrink-0 transition-colors duration-500">
                                        Veículo Comp.
                                    </span>
                                    <div className={`font-mono text-xl tracking-tight font-medium break-words transition-colors duration-500 ${patient.error ? 'text-red-600 dark:text-red-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                        {formatNumber(patient.v_complemento)} <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-1 tracking-normal font-sans font-bold">ml</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {patient.error && (
                            <p className="mt-4 text-[10px] text-red-700 dark:text-red-400 uppercase tracking-widest bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 font-semibold transition-colors duration-500">
                                Erro Crítico: Demanda de alvo incompatível. (Alíquota excede recipiente).
                            </p>
                        )}
                    </div>
                ))}

                {patients.length === 0 && (
                    <div className="py-16 flex flex-col items-center justify-center opacity-60">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-500">
                            Nenhum protocolo registrado
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
