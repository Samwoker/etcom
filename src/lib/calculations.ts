/**
 * Centralized financial calculations for Etcom marketplace jobs.
 * Rule: Platform charges 8% commission on labor ONLY.
 * Materials incur 0% commission and are 100% reimbursed to professional.
 */

export interface JobFinancialBreakdown {
  laborAmountETB: number;
  materialsAmountETB: number;
  platformFeeETB: number;       // 8% on labor only
  professionalPayoutETB: number; // 92% of labor + 100% of materials
  customerTotalETB: number;      // labor + materials
  commissionRate: number;        // 0.08 (8%)
}

export function calculateJobFinancials(
  laborAmountETB: number,
  materialsAmountETB: number = 0
): JobFinancialBreakdown {
  const safeLabor = Math.max(0, Math.round(laborAmountETB || 0));
  const safeMaterials = Math.max(0, Math.round(materialsAmountETB || 0));

  const platformFeeETB = Math.round(safeLabor * 0.08);
  const professionalPayoutETB = (safeLabor - platformFeeETB) + safeMaterials;
  const customerTotalETB = safeLabor + safeMaterials;

  return {
    laborAmountETB: safeLabor,
    materialsAmountETB: safeMaterials,
    platformFeeETB,
    professionalPayoutETB,
    customerTotalETB,
    commissionRate: 0.08,
  };
}
