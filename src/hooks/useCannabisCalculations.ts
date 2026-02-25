import { useMemo } from 'react';
import { BasePasteInput, PatientPrescription } from '../types';
import { calculateBasePaste, calculatePatients } from '../utils/calculations';

export function useCannabisCalculations(
  baseInput: BasePasteInput,
  patients: PatientPrescription[]
) {
  const baseCalculations = useMemo(() => calculateBasePaste(baseInput), [
    baseInput.calcMode,
    baseInput.m_extrato,
    baseInput.p_coa,
    baseInput.c_base,
    baseInput.v_final
  ]);

  const patientCalculations = useMemo(() =>
    calculatePatients(patients, baseCalculations.c_base_final),
    [patients, baseCalculations.c_base_final]);

  const hasErrors = patientCalculations.some(p => p.error);
  const totalAliquotaRequired = patientCalculations.reduce((acc, p) => acc + (p.error ? 0 : p.v_aliquota), 0);
  const basePasteSufficient = baseCalculations.isValid && totalAliquotaRequired <= baseCalculations.v_final_base;

  return {
    baseCalculations,
    patientCalculations,
    hasErrors,
    totalAliquotaRequired,
    basePasteSufficient
  };
}
