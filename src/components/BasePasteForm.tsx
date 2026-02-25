import React from 'react';
import { Beaker } from 'lucide-react';
import { CalcMode, BasePasteResult } from '../types';

interface BasePasteFormProps {
  extractType: string;
  setExtractType: (val: string) => void;
  calcMode: CalcMode;
  setCalcMode: (val: CalcMode) => void;
  p_coa: number | '';
  setPCoa: (val: number | '') => void;
  m_extrato: number | '';
  setMExtrato: (val: number | '') => void;
  v_final: number | '';
  setVFinal: (val: number | '') => void;
  c_base: number | '';
  setCBase: (val: number | '') => void;
  baseCalculations: BasePasteResult;
}

const formatNumber = (num: number | undefined | null) => {
  if (num === undefined || num === null || isNaN(num)) return '0.00';
  return num.toFixed(2);
};

export function BasePasteForm({
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
  baseCalculations
}: BasePasteFormProps) {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Beaker className="w-5 h-5 text-neutral-500" />
        Instância A: Padronização da Matriz
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Tipo de Matriz Extrativa</label>
          <select
            value={extractType}
            onChange={(e) => setExtractType(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            <option value="rosin">Rosin (Extratos Sem Solvente)</option>
            <option value="rso">Óleo de Rick Simpson (RSO) / Extrato Completo (FECO)</option>
            <option value="isolado">Isolados e Destilados</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Modo de Cálculo</label>
          <select
            value={calcMode}
            onChange={(e) => setCalcMode(e.target.value as CalcMode)}
            className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            <option value="mass">Calcular Volume Final (Baseado na Massa)</option>
            <option value="volume">Calcular Massa Necessária (Baseado no Volume Final)</option>
            <option value="concentration">Calcular Concentração (Baseado na Massa e Volume)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Potência COA (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={p_coa}
            onChange={(e) => setPCoa(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Ex: 75.5"
          />
        </div>
        {(calcMode === 'mass' || calcMode === 'concentration') && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Massa Bruta do Extrato (g)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={m_extrato}
              onChange={(e) => setMExtrato(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: 10.5"
            />
          </div>
        )}
        {(calcMode === 'volume' || calcMode === 'concentration') && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Volume Final Desejado (ml)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={v_final}
              onChange={(e) => setVFinal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: 1000"
            />
          </div>
        )}
        {(calcMode === 'mass' || calcMode === 'volume') && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Concentração Alvo da Pasta Base (mg/ml)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={c_base}
              onChange={(e) => setCBase(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Ex: 50"
            />
          </div>
        )}
      </div>

      {/* Base Paste Results */}
      {baseCalculations.isValid && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <h3 className="text-sm font-semibold text-emerald-800 mb-3 uppercase tracking-wider">Resultados da Pasta Base</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-emerald-700">Massa Total de Ativo:</span>
              <span className="font-mono font-medium text-emerald-900">{formatNumber(baseCalculations.mg_total)} mg</span>
            </div>
            {calcMode === 'volume' && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Massa de Extrato Necessária:</span>
                <span className="font-mono font-medium text-emerald-900">{formatNumber(baseCalculations.m_extrato_final)} g</span>
              </div>
            )}
            {calcMode === 'concentration' && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Concentração Resultante:</span>
                <span className="font-mono font-medium text-emerald-900">{formatNumber(baseCalculations.c_base_final)} mg/ml</span>
              </div>
            )}
            {calcMode === 'mass' && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-700">Volume Final da Base:</span>
                <span className="font-mono font-medium text-emerald-900">{formatNumber(baseCalculations.v_final_base)} ml</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-emerald-200/50">
              <span className="text-sm font-medium text-emerald-800">Veículo a Adicionar:</span>
              <span className="font-mono font-bold text-emerald-900">{formatNumber(baseCalculations.v_adicional)} ml</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
