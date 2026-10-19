import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { useDemoStore } from './demoStore.ts';

describe('Job Lifecycle & Payment Rules', () => {
  it('prevents upfront payment before work is completed', async () => {
    const store = useDemoStore.getState();
    store.resetDemoData();

    // job-101 is not_started
    const job101 = useDemoStore.getState().jobs.find((j) => j.id === 'job-101');
    assert.equal(job101?.completionStatus, 'not_started');

    // Attempting to pay upfront should fail
    const payResult = await store.processPayment('job-101', '+251 91 123 4567');
    assert.equal(payResult.success, false);
    assert.match(payResult.error || '', /completed/i);

    // Job remains unpaid
    const updatedJob = useDemoStore.getState().jobs.find((j) => j.id === 'job-101');
    assert.equal(updatedJob?.paymentStatus, 'unpaid');
  });

  it('allows professional to start work without prepayment', () => {
    const store = useDemoStore.getState();
    store.resetDemoData();

    // Start job-101 without prior payment
    store.startProJob('job-101', 1200, 450, 'Scope confirmed on site');

    const job = useDemoStore.getState().jobs.find((j) => j.id === 'job-101');
    assert.equal(job?.completionStatus, 'in_progress');
    assert.equal(job?.lifecycleStage, 'in_progress');
    assert.equal(job?.paymentStatus, 'unpaid'); // explicitly unpaid!
    assert.ok(job?.startedAt, 'startedAt timestamp must be set');
    assert.equal(job?.actualLaborETB, 1200);
    assert.equal(job?.actualMaterialsETB, 450);
  });

  it('records finish with after-photos and duration', () => {
    const store = useDemoStore.getState();
    store.resetDemoData();

    store.startProJob('job-101', 1200, 450);
    store.finishProJob('job-101', ['https://example.com/after1.jpg'], 45);

    const job = useDemoStore.getState().jobs.find((j) => j.id === 'job-101');
    assert.equal(job?.completionStatus, 'awaiting_confirmation');
    assert.equal(job?.lifecycleStage, 'completed_pending_payment');
    assert.ok(job?.finishedAt);
    assert.equal(job?.durationMinutes, 45);
    assert.equal(job?.afterPhotos?.length, 1);
  });

  it('processes payment on completion with 8% labor commission and creates digital receipt', async () => {
    const store = useDemoStore.getState();
    store.resetDemoData();
    store.setPaymentOutcome('success');

    // Complete job
    store.startProJob('job-101', 1000, 500);
    store.finishProJob('job-101', ['https://example.com/after.jpg'], 60);

    // Now process payment
    const result = await store.processPayment('job-101', '+251 91 123 4567');
    assert.equal(result.success, true);
    assert.ok(result.transactionCode);

    const job = useDemoStore.getState().jobs.find((j) => j.id === 'job-101');
    assert.equal(job?.paymentStatus, 'confirmed');
    assert.equal(job?.completionStatus, 'completed');
    assert.equal(job?.lifecycleStage, 'paid');

    // Receipt verification
    assert.ok(job?.receipt);
    assert.equal(job.receipt.laborAmountETB, 1000);
    assert.equal(job.receipt.materialsAmountETB, 500);
    assert.equal(job.receipt.platformFeeETB, 80); // 8% of 1000
    assert.equal(job.receipt.professionalPayoutETB, 1420); // 920 + 500
    assert.equal(job.receipt.totalCustomerPaidETB, 1500);
  });

  it('prevents duplicate payments once paid', async () => {
    const store = useDemoStore.getState();
    store.resetDemoData();
    store.setPaymentOutcome('success');

    store.startProJob('job-101', 1000, 0);
    store.finishProJob('job-101', []);
    const firstPay = await store.processPayment('job-101', '+251 91 123 4567');
    assert.equal(firstPay.success, true);

    const secondPay = await store.processPayment('job-101', '+251 91 123 4567');
    assert.equal(secondPay.success, true);
    assert.equal(secondPay.transactionCode, firstPay.transactionCode);
  });

  it('enforces 2-hour review editing window', () => {
    const store = useDemoStore.getState();
    store.resetDemoData();

    store.completeAndReviewJob('job-101', {
      rating: 5,
      comment: 'Excellent plumbing work!',
      tags: ['Punctual', 'Clean work'],
      consentToPublish: true,
    });

    const reviews = useDemoStore.getState().reviews;
    const review = reviews.find((r) => r.jobId === 'job-101');
    assert.ok(review);
    assert.ok(review.canEditUntil);

    // Edit within window
    const editRes = store.updateSubmittedReview(review.id, {
      rating: 4,
      comment: 'Updated: Very good work',
    });
    assert.equal(editRes.success, true);

    // If canEditUntil is expired:
    useDemoStore.setState((state) => ({
      reviews: state.reviews.map((r) =>
        r.id === review.id
          ? { ...r, canEditUntil: new Date(Date.now() - 10000).toISOString() }
          : r
      ),
    }));
    const expiredRes = store.updateSubmittedReview(review.id, {
      rating: 5,
      comment: 'Too late edit',
    });
    assert.equal(expiredRes.success, false);
    assert.match(expiredRes.error || '', /expired/i);
  });

  it('tracks rolling 30-day cancellations with warning at 2 and penalty at 3', () => {
    const store = useDemoStore.getState();
    store.resetDemoData();

    // 1st cancellation: no warning
    const c1 = store.recordCancellation('job-101', 'customer', 'Customer plans changed');
    assert.equal(c1.warningTriggered, false);
    assert.equal(c1.penaltyTriggered, false);

    // 2nd cancellation: warning triggered
    const c2 = store.recordCancellation('job-102', 'customer', 'Needed to reschedule');
    assert.equal(c2.warningTriggered, true);
    assert.equal(c2.penaltyTriggered, false);

    // 3rd cancellation: penalty triggered
    const c3 = store.recordCancellation('job-105', 'customer', 'No longer available');
    assert.equal(c3.penaltyTriggered, true);
  });
});
