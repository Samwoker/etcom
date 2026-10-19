import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateJobFinancials } from './calculations.ts';

describe('calculateJobFinancials', () => {
  it('correctly calculates financials for labor-only job (ETB 1,000)', () => {
    const result = calculateJobFinancials(1000, 0);

    // Platform fee: 8% of 1000 = 80 ETB
    assert.equal(result.platformFeeETB, 80);
    // Pro payout: 92% of 1000 = 920 ETB
    assert.equal(result.professionalPayoutETB, 920);
    // Customer pays 1000 ETB
    assert.equal(result.customerTotalETB, 1000);
    assert.equal(result.laborAmountETB, 1000);
    assert.equal(result.materialsAmountETB, 0);
  });

  it('correctly calculates financials with labor (ETB 1,000) and materials (ETB 500)', () => {
    // Example from product specification:
    // When labor is ETB 1,000 and materials are ETB 500:
    // - Labor: ETB 1,000
    // - Materials: ETB 500
    // - Customer payment: ETB 1,500
    // - Etcom commission: ETB 80
    // - Professional payout: ETB 1,420
    const result = calculateJobFinancials(1000, 500);

    assert.equal(result.platformFeeETB, 80);
    assert.equal(result.professionalPayoutETB, 1420);
    assert.equal(result.customerTotalETB, 1500);
    assert.equal(result.laborAmountETB, 1000);
    assert.equal(result.materialsAmountETB, 500);
  });

  it('handles zero materials and rounding properly', () => {
    const result = calculateJobFinancials(450, 0);
    // 450 * 0.08 = 36
    assert.equal(result.platformFeeETB, 36);
    assert.equal(result.professionalPayoutETB, 414);
    assert.equal(result.customerTotalETB, 450);
  });

  it('never charges commission on materials', () => {
    const result = calculateJobFinancials(0, 800);
    assert.equal(result.platformFeeETB, 0);
    assert.equal(result.professionalPayoutETB, 800);
    assert.equal(result.customerTotalETB, 800);
  });

  it('safely handles negative or NaN input values', () => {
    const result = calculateJobFinancials(-500, -200);
    assert.equal(result.laborAmountETB, 0);
    assert.equal(result.materialsAmountETB, 0);
    assert.equal(result.platformFeeETB, 0);
    assert.equal(result.professionalPayoutETB, 0);
    assert.equal(result.customerTotalETB, 0);
  });
});
