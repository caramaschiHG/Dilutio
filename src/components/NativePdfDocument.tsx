import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';
import { BasePasteResult, PatientCalculation } from '../types';

Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 600 },
        { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 700 }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Inter',
        fontSize: 10,
        color: '#000000',
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 15,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#4b5563',
    },
    metaInfo: {
        textAlign: 'right',
        fontSize: 9,
    },
    metaText: {
        marginBottom: 3,
    },
    metaBold: {
        fontWeight: 700,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        borderBottomWidth: 0.5,
        borderBottomColor: '#d1d5db',
        paddingBottom: 4,
        marginBottom: 10,
    },
    table: {
        width: '100%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#000000',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableHeader: {
        backgroundColor: '#f3f4f6',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#000000',
        padding: 6,
        fontWeight: 700,
    },
    tableCell: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#000000',
        padding: 6,
    },
    tableCellLast: {
        borderRightWidth: 0,
    },
    tableCellMono: {
        fontFamily: 'Helvetica', // Fallback to sans/mono equivalent
    },
    instructionsBox: {
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: '#f9fafb',
        padding: 12,
        marginBottom: 20,
    },
    paragraph: {
        marginBottom: 8,
        lineHeight: 1.4,
    },
    bold: {
        fontWeight: 700,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 6,
        lineHeight: 1.4,
    },
    listBullet: {
        width: 15,
    },
    listContent: {
        flex: 1,
    },
    bplContainer: {
        marginBottom: 30,
        lineHeight: 1.5,
        color: '#1f2937',
    },
    footer: {
        marginTop: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    signatureBox: {
        width: 200,
        alignItems: 'center',
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        width: '100%',
        height: 30,
        marginBottom: 8,
    },
    signatureName: {
        fontWeight: 700,
        marginBottom: 2,
    },
    signatureRole: {
        color: '#4b5563',
        fontSize: 9,
    },
});

interface NativePdfDocumentProps {
    pdfType: 'base' | 'full';
    batchNumber: string;
    date: string;
    technician: string;
    extractType: string;
    p_coa: string;
    baseCalculations: BasePasteResult;
    patientCalculations: PatientCalculation[];
}

const formatNumber = (num: number | undefined | null) => {
    if (num === undefined || num === null || isNaN(num)) return '0.00';
    return num.toFixed(2);
};

export function NativePdfDocument({
    pdfType,
    batchNumber,
    date,
    technician,
    extractType,
    p_coa,
    baseCalculations,
    patientCalculations,
}: NativePdfDocumentProps) {
    const getExtractTypeName = (type: string) => {
        switch (type) {
            case 'rosin': return 'Rosin (Sem Solvente)';
            case 'rso': return 'RSO / FECO';
            case 'isolado': return 'Isolados / Destilados';
            default: return type;
        }
    };

    const InstructionList = () => {
        if (extractType === 'rosin') {
            return (
                <View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>1.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Aferição de Massa:</Text> Pesar {formatNumber(baseCalculations.m_extrato_final)}g do extrato Rosin em um béquer de vidro borossilicato.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>2.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Descarboxilação Térmica:</Text> Submeter o béquer a aquecimento (110°C a 120°C). Observar efervescência (liberação de CO2). Manter até cessação quase total (30 a 45 min). Não exceder 120°C.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>3.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Resfriamento Controlado:</Text> Interromper calor e permitir redução gradual até 60°C a 70°C.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>4.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Incorporação do Veículo:</Text> Adicionar exatamente {formatNumber(baseCalculations.v_adicional)} ml de veículo lipídico (pré-aquecido a ~40°C).</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>5.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Homogeneização:</Text> Submeter à agitação magnética ou mecânica rigorosa (50°C) por 15 a 20 minutos, até aspecto translúcido.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>6.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Envase:</Text> Proceder ao fracionamento em recipientes de vidro âmbar. O volume final estimado é de {formatNumber(baseCalculations.v_final_base)} ml.</Text>
                    </View>
                </View>
            );
        }

        if (extractType === 'rso') {
            return (
                <View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>1.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Validação de Descarboxilação:</Text> Analisar metodologia pregressa. Se evaporado a frio, requer descarboxilação (110°C-120°C).</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>2.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Condicionamento Térmico:</Text> Aquecimento prévio do recipiente original em banho-maria (50°C a 60°C) para adequação da viscosidade.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>3.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Aferição e Transferência:</Text> Pesar {formatNumber(baseCalculations.m_extrato_final)}g do extrato no béquer calibrado.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>4.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Adição do Veículo Lipídico:</Text> Incorporar exatamente {formatNumber(baseCalculations.v_adicional)} ml de veículo lipídico.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>5.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Homogeneização Alta Intens.:</Text> Agitação magnética acoplada a aquecimento (50°C a 60°C) por no mínimo 30 minutos.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>6.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Filtração (Recomendado):</Text> Filtrar a solução ainda aquecida (0,22 um a 0,45 um ou papel filtro) para retenção de ceras.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>7.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Envase Final:</Text> Transferir a solução purificada. O volume final estimado é de {formatNumber(baseCalculations.v_final_base)} ml.</Text>
                    </View>
                </View>
            );
        }

        if (extractType === 'isolado') {
            return (
                <View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>1.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Aferição de Massa:</Text> Proceder à pesagem de {formatNumber(baseCalculations.m_extrato_final)}g do insumo cristalino ou destilado.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>2.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Adição do Veículo Lipídico:</Text> Incorporar exatamente {formatNumber(baseCalculations.v_adicional)} ml de veículo lipídico.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>3.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Homogeneização Branda:</Text> Aplicar aquecimento moderado (40°C a 50°C). Promover agitação por 5 a 10 minutos.</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>4.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Infusão Terpênica (Opcional):</Text> Adicionar terpenos isolados em temperaturas {'<'} 40°C (1% a 3% do volume total).</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.listBullet}>5.</Text>
                        <Text style={styles.listContent}><Text style={styles.bold}>Envase Final:</Text> Realizar o fracionamento imediatamente após homogeneização. O volume final estimado é de {formatNumber(baseCalculations.v_final_base)} ml.</Text>
                    </View>
                </View>
            );
        }

        return null;
    };

    return (
        <Document title={`POP_${batchNumber}`}>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.headerTitle}>Procedimento Operacional Padrão</Text>
                        <Text style={styles.headerSubtitle}>
                            {pdfType === 'base'
                                ? 'Padronização de Matriz Extrativa (Pasta Base)'
                                : 'Fracionamento de Extrato Canabinoide'}
                        </Text>
                    </View>
                    <View style={styles.metaInfo}>
                        <Text style={styles.metaText}><Text style={styles.metaBold}>Lote: </Text>{batchNumber}</Text>
                        <Text style={styles.metaText}><Text style={styles.metaBold}>Data: </Text>{date}</Text>
                        <Text style={styles.metaText}><Text style={styles.metaBold}>Técnico: </Text>{technician}</Text>
                    </View>
                </View>

                {/* Section 1: Dados Brutos */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>1. Dados Brutos e Rastreabilidade</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow} wrap={false}>
                            <View style={[styles.tableCell, { width: '33%', backgroundColor: '#f3f4f6' }]}><Text style={styles.bold}>Tipo de Matriz</Text></View>
                            <View style={[styles.tableCell, { width: '67%' }]}><Text>{getExtractTypeName(extractType)}</Text></View>
                        </View>
                        <View style={styles.tableRow} wrap={false}>
                            <View style={[styles.tableCell, { width: '33%', backgroundColor: '#f3f4f6' }]}><Text style={styles.bold}>Massa Bruta do Extrato</Text></View>
                            <View style={[styles.tableCell, { width: '67%' }]}><Text>{formatNumber(baseCalculations.m_extrato_final)} g</Text></View>
                        </View>
                        <View style={styles.tableRow} wrap={false}>
                            <View style={[styles.tableCell, { width: '33%', backgroundColor: '#f3f4f6' }]}><Text style={styles.bold}>Potência (COA)</Text></View>
                            <View style={[styles.tableCell, { width: '67%' }]}><Text>{formatNumber(Number(p_coa))} %</Text></View>
                        </View>
                        <View style={styles.tableRow} wrap={false}>
                            <View style={[styles.tableCell, { width: '33%', backgroundColor: '#f3f4f6' }]}><Text style={styles.bold}>Massa Total (Ativo)</Text></View>
                            <View style={[styles.tableCell, { width: '67%' }]}><Text style={styles.bold}>{formatNumber(baseCalculations.mg_total)} mg</Text></View>
                        </View>
                    </View>
                </View>

                {/* Section 2: Preparação da Pasta Base */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>2. Preparação da Pasta Base (Instância A)</Text>
                    <View style={styles.instructionsBox}>
                        <Text style={styles.paragraph}>
                            <Text style={styles.bold}>Objetivo:</Text> Produzir {formatNumber(baseCalculations.v_final_base)} ml de solução estoque com concentração de {formatNumber(baseCalculations.c_base_final)} mg/ml.
                        </Text>
                        <InstructionList />
                    </View>
                </View>

                {/* Section 3: Fracionamento Final */}
                {pdfType === 'full' && (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.sectionTitle}>3. Tabela de Fracionamento Final (Instância B)</Text>
                        <View style={styles.table}>
                            {/* Table Header Row */}
                            <View style={styles.tableRow} wrap={false}>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '25%' }]}><Text>Paciente / ID</Text></View>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '15%', textAlign: 'center' }]}><Text>Conc. Alvo (mg/ml)</Text></View>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '15%', textAlign: 'center' }]}><Text>Vol. Frasco (ml)</Text></View>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '17%', textAlign: 'center', backgroundColor: '#e5e7eb' }]}><Text>Alíquota Base (ml)</Text></View>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '18%', textAlign: 'center', backgroundColor: '#e5e7eb' }]}><Text>Veículo Comp. (ml)</Text></View>
                                <View style={[styles.tableCell, styles.tableHeader, { width: '10%', textAlign: 'center' }]}><Text>Check</Text></View>
                            </View>
                            {/* Table Body Rows */}
                            {patientCalculations.map((p, i) => {
                                return (
                                    <View style={styles.tableRow} key={p.id} wrap={false}>
                                        <View style={[styles.tableCell, { width: '25%' }]}>
                                            <Text>{p.name || `Paciente ${i + 1}`}</Text>
                                        </View>
                                        <View style={[styles.tableCell, { width: '15%', textAlign: 'center' }]}>
                                            <Text>{formatNumber(Number(p.c_alvo))}</Text>
                                        </View>
                                        <View style={[styles.tableCell, { width: '15%', textAlign: 'center' }]}>
                                            <Text>{formatNumber(Number(p.v_frasco))}</Text>
                                        </View>
                                        <View style={[styles.tableCell, { width: '17%', textAlign: 'center' }]}>
                                            <Text style={styles.bold}>{formatNumber(p.v_aliquota)}</Text>
                                        </View>
                                        <View style={[styles.tableCell, { width: '18%', textAlign: 'center' }]}>
                                            <Text style={styles.bold}>{formatNumber(p.v_complemento)}</Text>
                                        </View>
                                        <View style={[styles.tableCell, { width: '10%', textAlign: 'center', justifyContent: 'center' }]}>
                                            <Text style={{ fontSize: 13, lineHeight: 1 }}>☐</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Section BPL */}
                <View style={styles.bplContainer}>
                    <Text style={styles.sectionTitle}>
                        {pdfType === 'full' ? '4' : '3'}. Diretrizes Gerais de BPL
                    </Text>
                    <View style={styles.paragraph}>
                        <Text><Text style={styles.bold}>Seleção de Veículo Lipídico: </Text>O emprego de Triglicerídeos de Cadeia Média (TCM) é considerado a prática padrão devido à sua neutralidade organoléptica, resistência à oxidação lipídica, estabilidade sob refrigeração e perfil farmacocinético otimizado.</Text>
                    </View>
                    <View style={styles.paragraph}>
                        <Text><Text style={styles.bold}>Protocolos de Assepsia: </Text>É imperativa a sanitização prévia de todas as superfícies de contato, instrumentos de medição e vidrarias utilizando Álcool Isopropílico a 70% ou 99%.</Text>
                    </View>
                    <View style={styles.paragraph}>
                        <Text><Text style={styles.bold}>Acondicionamento e Estabilidade: </Text>Armazenar as formulações de estoque (Pasta Base) em recipientes de vidro âmbar, hermeticamente selados, mantidos em ambiente refrigerado ou sob temperatura controlada, e ao abrigo da incidência luminosa.</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer} wrap={false}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.signatureName}>{technician || 'Técnico Responsável'}</Text>
                        <Text style={styles.signatureRole}>Manipulação</Text>
                    </View>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine}></View>
                        <Text style={styles.signatureName}>Analista de Qualidade</Text>
                        <Text style={styles.signatureRole}>Conferência e Liberação</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
