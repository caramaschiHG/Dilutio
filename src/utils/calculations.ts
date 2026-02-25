import { BasePasteInput, BasePasteResult, PatientPrescription, PatientCalculation } from '../types';

export const round2 = (num: number): number => {
    return Math.round(num * 100) / 100;
};

export function calculateBasePaste(baseInput: BasePasteInput): BasePasteResult {
    const p = Number(baseInput.p_coa);

    // Business Rule: Sanitização de Dados
    if (!p || p <= 0 || isNaN(p) || p > 100) {
        return { mg_total: 0, v_final_base: 0, v_adicional: 0, m_extrato_final: 0, c_base_final: 0, isValid: false };
    }

    if (baseInput.calcMode === 'mass') {
        const m = Number(baseInput.m_extrato);
        const c = Number(baseInput.c_base);
        if (!m || !c || m <= 0 || c <= 0 || isNaN(m) || isNaN(c)) {
            return { mg_total: 0, v_final_base: 0, v_adicional: 0, m_extrato_final: 0, c_base_final: 0, isValid: false };
        }

        // mg_total = m * 1000 * (p / 100)
        const mg_total = round2(m * 1000 * (p / 100));
        // v_final_base = mg_total / c
        const v_final_base = round2(mg_total / c);
        // v_adicional = max(0, v_final_base - (m * 0.9)) -> assume density 0.9 g/ml for extract
        const v_adicional = round2(Math.max(0, v_final_base - (m * 0.9)));

        return { mg_total, v_final_base, v_adicional, m_extrato_final: m, c_base_final: c, isValid: true };
    }

    if (baseInput.calcMode === 'volume') {
        const v = Number(baseInput.v_final);
        const c = Number(baseInput.c_base);
        if (!v || !c || v <= 0 || c <= 0 || isNaN(v) || isNaN(c)) {
            return { mg_total: 0, v_final_base: 0, v_adicional: 0, m_extrato_final: 0, c_base_final: 0, isValid: false };
        }

        const mg_total = round2(v * c);
        const m_extrato_final = round2(mg_total / (1000 * (p / 100)));
        const v_adicional = round2(Math.max(0, v - (m_extrato_final * 0.9)));

        return { mg_total, v_final_base: v, v_adicional, m_extrato_final, c_base_final: c, isValid: true };
    }

    if (baseInput.calcMode === 'concentration') {
        const m = Number(baseInput.m_extrato);
        const v = Number(baseInput.v_final);
        if (!m || !v || m <= 0 || v <= 0 || isNaN(m) || isNaN(v)) {
            return { mg_total: 0, v_final_base: 0, v_adicional: 0, m_extrato_final: 0, c_base_final: 0, isValid: false };
        }

        const mg_total = round2(m * 1000 * (p / 100));
        const c_base_final = round2(mg_total / v);
        const v_adicional = round2(Math.max(0, v - (m * 0.9)));

        return { mg_total, v_final_base: v, v_adicional, m_extrato_final: m, c_base_final, isValid: true };
    }

    return { mg_total: 0, v_final_base: 0, v_adicional: 0, m_extrato_final: 0, c_base_final: 0, isValid: false };
}

export function calculatePatients(patients: PatientPrescription[], c_base_final: number): PatientCalculation[] {
    return patients.map(p => {
        const c_alvo = Number(p.c_alvo);
        const v_frasco = Number(p.v_frasco);

        // Business Rule: Sanitização de Dados
        if (!c_alvo || !v_frasco || !c_base_final || c_alvo <= 0 || v_frasco <= 0 || c_base_final <= 0 || isNaN(c_alvo) || isNaN(v_frasco)) {
            return { ...p, v_aliquota: 0, v_complemento: 0, error: false };
        }

        // Business Rule: Precisão Numérica (2 casas)
        const v_aliquota_raw = (c_alvo * v_frasco) / c_base_final;
        const v_aliquota = round2(v_aliquota_raw);

        const v_complemento_raw = v_frasco - v_aliquota;
        const v_complemento = round2(v_complemento_raw);

        // Business Rule: Validação de Limites
        const error = v_aliquota > v_frasco;

        return { ...p, v_aliquota, v_complemento, error };
    });
}
