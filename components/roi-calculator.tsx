'use client'

import { useMemo, useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { calculateRoi, defaultRoiInputs, type RoiInputs } from '@/lib/roi'

const fields: { key: keyof RoiInputs; label: string; suffix?: string }[] = [
  { key: 'purchasePrice', label: 'Precio de compra', suffix: '€' }, { key: 'downPayment', label: 'Entrada inicial', suffix: '€' },
  { key: 'mortgageRate', label: 'Interés hipotecario', suffix: '%' }, { key: 'mortgageYears', label: 'Plazo hipoteca', suffix: 'años' },
  { key: 'monthlyRent', label: 'Alquiler mensual', suffix: '€' }, { key: 'vacancyRate', label: 'Tasa de vacancia', suffix: '%' },
  { key: 'maintenanceRate', label: 'Mantenimiento sobre renta', suffix: '%' }, { key: 'managementRate', label: 'Gestión sobre renta', suffix: '%' },
  { key: 'annualTax', label: 'IBI anual', suffix: '€' }, { key: 'annualInsurance', label: 'Seguro anual', suffix: '€' },
  { key: 'appreciationRate', label: 'Apreciación anual estimada', suffix: '%' },
]
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const percent = (value: number) => `${value.toFixed(2)}%`

export function RoiCalculator() {
  const [values, setValues] = useState<RoiInputs>(defaultRoiInputs)
  const result = useMemo(() => calculateRoi(values), [values])
  const update = (key: keyof RoiInputs, raw: string) => setValues(current => ({ ...current, [key]: Math.max(0, Number(raw) || 0) }))
  return <section className="roi-calculator" aria-labelledby="roi-title"><div className="roi-form"><div className="eyebrow"><Calculator size={15} /> CALCULADORA ROI</div><h2 id="roi-title">Datos de la <em>inversión.</em></h2><div className="roi-fields">{fields.map(field => <label key={field.key}>{field.label}<span className="roi-input"><input type="number" min="0" step="any" value={values[field.key]} onChange={event => update(field.key, event.target.value)} /><small>{field.suffix}</small></span></label>)}</div></div><aside className="roi-results"><div className="eyebrow eyebrow-dark"><TrendingUp size={15} /> RESULTADOS</div><div className="roi-highlight"><div><span>Cash on Cash ROI</span><strong>{percent(result.cashOnCash)}</strong></div><div><span>Cap Rate</span><strong>{percent(result.capRate)}</strong></div><div><span>Flujo mensual</span><strong>{euro.format(result.monthlyCashFlow)}</strong></div></div><h3>Desglose anual</h3>{[['Ingresos por alquiler', result.annualRent], ['- Vacancia', -result.vacancy], ['Ingresos efectivos', result.effectiveIncome], ['- Hipoteca', -result.annualMortgage], ['- Mantenimiento', -result.maintenance], ['- Gestión', -result.management], ['- IBI y seguro', -(values.annualTax + values.annualInsurance)], ['Flujo de caja neto', result.netCashFlow]].map(([label, value]) => <div className="roi-line" key={String(label)}><span>{label}</span><strong>{euro.format(Number(value))}</strong></div>)}<div className="roi-future"><span>Valor futuro estimado a 10 años</span><strong>{euro.format(result.futureValue)}</strong></div></aside></section>
}
