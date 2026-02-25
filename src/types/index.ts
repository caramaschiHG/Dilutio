export interface PatientPrescription {
  id: string;
  name: string;
  c_alvo: string;
  v_frasco: string;
}

export type CalcMode = 'mass' | 'volume' | 'concentration';

export interface BasePasteInput {
  extractType: string;
  calcMode: CalcMode;
  m_extrato: string;
  p_coa: string;
  c_base: string;
  v_final: string;
}

export interface BasePasteResult {
  mg_total: number;
  v_final_base: number;
  v_adicional: number;
  m_extrato_final: number;
  c_base_final: number;
  isValid: boolean;
}

export interface PatientCalculation extends PatientPrescription {
  v_aliquota: number;
  v_complemento: number;
  error: boolean;
}
