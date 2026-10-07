export type RoiInputs = {
  purchasePrice: number
  downPayment: number
  mortgageRate: number
  mortgageYears: number
  monthlyRent: number
  vacancyRate: number
  maintenanceRate: number
  managementRate: number
  annualTax: number
  annualInsurance: number
  appreciationRate: number
}

export function calculateRoi(input: RoiInputs) {
  const annualRent = Math.max(0, input.monthlyRent) * 12
  const vacancy = annualRent * Math.min(100, Math.max(0, input.vacancyRate)) / 100
  const effectiveIncome = annualRent - vacancy
  const maintenance = effectiveIncome * Math.max(0, input.maintenanceRate) / 100
  const management = effectiveIncome * Math.max(0, input.managementRate) / 100
  const principal = Math.max(0, input.purchasePrice - input.downPayment)
  const monthlyRate = Math.max(0, input.mortgageRate) / 100 / 12
  const months = Math.max(1, Math.round(input.mortgageYears * 12))
  const mortgage = monthlyRate === 0 ? principal / months : principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
  const annualMortgage = mortgage * 12
  const netCashFlow = effectiveIncome - maintenance - management - Math.max(0, input.annualTax) - Math.max(0, input.annualInsurance) - annualMortgage
  const operatingIncome = effectiveIncome - maintenance - management - Math.max(0, input.annualTax) - Math.max(0, input.annualInsurance)
  const capRate = input.purchasePrice > 0 ? operatingIncome / input.purchasePrice * 100 : 0
  const invested = Math.max(0, input.downPayment)
  const cashOnCash = invested > 0 ? netCashFlow / invested * 100 : 0
  const futureValue = Math.max(0, input.purchasePrice) * (1 + Math.max(-100, input.appreciationRate) / 100) ** 10
  return { annualRent, vacancy, effectiveIncome, maintenance, management, annualMortgage, mortgage, netCashFlow, capRate, cashOnCash, monthlyCashFlow: netCashFlow / 12, futureValue }
}

export const defaultRoiInputs: RoiInputs = { purchasePrice: 300000, downPayment: 60000, mortgageRate: 3.5, mortgageYears: 25, monthlyRent: 1200, vacancyRate: 5, maintenanceRate: 10, managementRate: 10, annualTax: 500, annualInsurance: 300, appreciationRate: 3 }
