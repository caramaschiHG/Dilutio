import { describe, it, expect } from 'vitest';
import { calculateBasePaste, calculatePatients, round2 } from './calculations';
import { BasePasteInput, PatientPrescription } from '../types';

describe('Cannabis Medical Calculations', () => {

    describe('Math Utilities', () => {
        it('rounds to 2 decimal places exactly as intended (Regra: Precisão Numérica)', () => {
            expect(round2(2.356)).toBe(2.36);
            expect(round2(2.354)).toBe(2.35);
            expect(round2(10)).toBe(10);
            expect(round2(0.9999)).toBe(1);
        });
    });

    describe('calculateBasePaste (Instância A)', () => {

        it('sanitizes strings, strings with comma (NaN), missing, or negative values (Regra: Sanitização de Dados)', () => {
            const badInput: BasePasteInput = {
                calcMode: 'mass',
                extractType: 'rosin',
                p_coa: '-50', // Negative
                m_extrato: '10',
                c_base: '50',
                v_final: ''
            };

            const result = calculateBasePaste(badInput);
            expect(result.isValid).toBe(false);

            const nanInput: BasePasteInput = {
                calcMode: 'mass',
                extractType: 'rosin',
                p_coa: '80',
                m_extrato: 'invalid', // Not a Number
                c_base: '50',
                v_final: ''
            };

            const resultNan = calculateBasePaste(nanInput);
            expect(resultNan.isValid).toBe(false);
        });

        it('calculates mass mode correctly: m_extrato + c_base -> computes v_final_base', () => {
            // Massa = 10g
            // Potência = 75%
            // C_base alvo = 50 mg/ml
            // mg_total = 10 * 1000 * 0.75 = 7500 mg
            // v_final_base = 7500 / 50 = 150 ml
            // densidade = 0.9 g/ml -> v_base bruto = 10 * 0.9 = 9 ml
            // v_adicional = 150 - 9 = 141 ml

            const input: BasePasteInput = {
                calcMode: 'mass',
                extractType: 'rosin',
                p_coa: '75',
                m_extrato: '10',
                c_base: '50',
                v_final: ''
            };

            const result = calculateBasePaste(input);

            expect(result.isValid).toBe(true);
            expect(result.mg_total).toBe(7500);
            expect(result.v_final_base).toBe(150);
            expect(result.v_adicional).toBe(141);
        });

        it('calculates volume mode correctly: v_final + c_base -> computes m_extrato', () => {
            // v_final_base = 150
            // p_coa = 75
            // c_base = 50
            // mg_total = 150 * 50 = 7500
            // m_extrato_final = 7500 / (1000 * 0.75) = 10g
            const input: BasePasteInput = {
                calcMode: 'volume',
                extractType: 'rosin',
                p_coa: '75',
                m_extrato: '',
                c_base: '50',
                v_final: '150'
            };

            const result = calculateBasePaste(input);
            expect(result.isValid).toBe(true);
            expect(result.mg_total).toBe(7500);
            expect(result.m_extrato_final).toBe(10);
        });
    });

    describe('calculatePatients (Instância B)', () => {

        it('returns empty calculations when parameters are missing or invalid', () => {
            const patients: PatientPrescription[] = [
                { id: '1', name: 'Paciente 1', c_alvo: '', v_frasco: '30' }
            ];

            const result = calculatePatients(patients, 50);
            expect(result[0].v_aliquota).toBe(0);
            expect(result[0].v_complemento).toBe(0);
        });

        it('calculates correct aliquota and complement properly rounded', () => {
            // C_base_final = 50 mg/ml
            // C_alvo = 20 mg/ml
            // v_frasco = 30 ml
            // aliquota = (20 * 30) / 50 = 600 / 50 = 12 ml
            // complemento = 30 - 12 = 18 ml
            const patients: PatientPrescription[] = [
                { id: '1', name: 'Paciente 1', c_alvo: '20', v_frasco: '30' }
            ];

            const result = calculatePatients(patients, 50);

            expect(result[0].error).toBe(false);
            expect(result[0].v_aliquota).toBe(12);
            expect(result[0].v_complemento).toBe(18);
        });

        it('triggers error property when aliquota > flask (Regra: Validação de Limites)', () => {
            // C_base = 50 mg/ml
            // C_alvo = 100 mg/ml (IMPOSSIBLE to reach without concentrating more)
            // v_frasco = 30 ml
            // aliquota = (100 * 30) / 50 = 60 ml
            // complemento = 30 - 60 = -30 ml (triggers logical error)

            const patients: PatientPrescription[] = [
                { id: '1', name: 'Paciente 1', c_alvo: '100', v_frasco: '30' }
            ];

            const result = calculatePatients(patients, 50);

            expect(result[0].error).toBe(true);
            expect(result[0].v_aliquota).toBe(60);
            // Complement assumes minus, but error flags the situation anyway
            expect(result[0].v_complemento).toBe(-30);
        });
    });
});
