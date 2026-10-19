import { create } from 'zustand';
import type {
  Role,
  Job,
  Professional,
  Customer,
  PendingSignup,
  DraftRequest,
  Message,
  QuoteStatus,
  Quote,
  QuoteHistoryItem,
  Review,
  Dispute,
  AppNotification,
  TradeType,
  SubCity,
  IdentityStatus,
  SkillsStatus,
  DigitalReceipt,
} from '../types/index.ts';

import {
  INITIAL_JOBS,
  INITIAL_PROFESSIONALS,
  INITIAL_CUSTOMERS,
  INITIAL_MESSAGES,
  INITIAL_REVIEWS,
  INITIAL_DISPUTES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData.ts';

import { calculateJobFinancials } from '../lib/calculations.ts';

export interface CancellationRecord {
  id: string;
  userId: string;
  role: Role;
  jobId: string;
  reason: string;
  timestamp: string;
}

export type DemoScenario = 'none' | 'need_plumber' | 'plan_painting' | 'pro_onboarding';

export interface DemoStoreState {
  role: Role;
  currentUserId: string;
  paymentOutcome: 'success' | 'fail';
  jobs: Job[];
  professionals: Professional[];
  customers: Customer[];
  messages: Message[];
  reviews: Review[];
  disputes: Dispute[];
  notifications: AppNotification[];
  pendingSignup: PendingSignup | null;
  draftRequest: DraftRequest | null;
  cancellations: CancellationRecord[];
  activeScenario: DemoScenario;
  scenarioStep: number;

  // Actions
  setRole: (role: Role) => void;
  setCurrentUserId: (userId: string) => void;
  setPaymentOutcome: (outcome: 'success' | 'fail') => void;
  setPendingSignup: (pending: PendingSignup | null) => void;
  setDraftRequest: (draft: DraftRequest | null) => void;
  completePhoneVerification: () => { role: Role; userId: string };
  resetDemoData: () => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  createJob: (data: {
    proId: string;
    category?: string;
    title?: string;
    description?: string;
    subCity?: string;
    photos?: string[];
    diagnosticAnswers?: Record<string, string>;
    voiceNoteUrl?: string;
    proposedLaborETB?: number;
  }) => string;
  addMessage: (message: Message) => void;
  updateQuoteStatus: (
    jobId: string,
    status: QuoteStatus,
    counterAmount?: number,
    counterMessage?: string
  ) => void;
  reviseQuote: (jobId: string, totalAmountETB: number, message?: string) => void;
  confirmAgreement: (jobId: string, paymentTerms?: unknown, depositAmountETB?: number) => void;
  dispatchJob: (jobId: string) => void;
  arriveProAtSite: (jobId: string) => void;
  startProJob: (
    jobId: string,
    confirmedLaborETB?: number,
    confirmedMaterialsETB?: number,
    scopeReason?: string
  ) => void;
  finishProJob: (jobId: string, afterPhotos?: string[], durationMinutes?: number) => void;
  markProJobFinished: (jobId: string, afterPhotos?: string[]) => void;
  processPayment: (
    jobId: string,
    phone: string
  ) => Promise<{ success: boolean; transactionCode?: string; error?: string }>;
  completeAndReviewJob: (
    jobId: string,
    reviewData: { rating: number; comment: string; tags: string[]; photos?: string[]; consentToPublish?: boolean }
  ) => void;
  updateSubmittedReview: (
    reviewId: string,
    updates: { rating?: number; comment?: string; tags?: string[] }
  ) => { success: boolean; error?: string };
  simulateWorkFinished: (jobId?: string) => void;
  createDispute: (
    jobId: string,
    reason: string,
    description: string,
    photos?: string[]
  ) => { dispute: Dispute; referenceNumber: string };
  recordCancellation: (
    jobId: string,
    actor: 'customer' | 'professional',
    reason: string
  ) => { warningTriggered: boolean; penaltyTriggered: boolean };
  reportCustomerIssue: (jobId: string, reason: string) => void;
  reportProDidNotArrive: (jobId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: (role?: Role) => void;
  saveProOnboarding: (data: {
    fullName: string;
    trade: TradeType;
    subCity: SubCity;
    experienceYears: number;
    bio: string;
    avatarUrl?: string;
  }) => string;
  submitProIdentity: (
    proId: string,
    data: { idType: string; frontFile: string; backFile: string; selfieFile: string }
  ) => void;
  submitSkillsEvidence: (
    proId: string,
    route: 'upload' | 'assessment' | 'no_evidence',
    data?: { refereeName?: string; refereePhone?: string; refereeRelationship?: string; files?: string[] }
  ) => void;
  cycleProVerificationStatus: (proId?: string) => void;
  declineJobRequest: (jobId: string, reason?: string) => void;
  sendProQuote: (
    jobId: string,
    data: {
      laborAmountETB: number;
      materialsAmountETB: number;
      totalAmountETB: number;
      scopeDescription: string;
      scheduledDate?: string;
      inspectionNeeded?: boolean;
      revisionReason?: string;
    }
  ) => void;
  addSelfPortfolioItem: (
    proId: string,
    item: { title: string; category: string; description: string; photoUrl: string }
  ) => void;
  saveReviewDecision: (
    proId: string,
    decision: {
      category: 'identity' | 'skills';
      identityStatus?: IdentityStatus;
      skillsStatus?: SkillsStatus;
      reason?: string;
      flagForInvestigation?: boolean;
    }
  ) => void;
  resolveDispute: (
    disputeId: string,
    action: 'request_info' | 'resolve_customer' | 'resolve_pro',
    note: string
  ) => void;
  setScenario: (scenario: DemoScenario, step?: number) => void;
  advanceScenario: () => void;
}

export const useDemoStore = create<DemoStoreState>((set, get) => ({
  role: 'customer',
  currentUserId: 'c1',
  paymentOutcome: 'success',
  jobs: INITIAL_JOBS,
  professionals: INITIAL_PROFESSIONALS,
  customers: INITIAL_CUSTOMERS,
  messages: INITIAL_MESSAGES,
  reviews: INITIAL_REVIEWS,
  disputes: INITIAL_DISPUTES,
  notifications: INITIAL_NOTIFICATIONS,
  pendingSignup: null,
  draftRequest: {
    category: 'Plumbing',
    description: 'My shower is leaking and the tap is hard to turn',
    photos: [],
    subCity: 'Bole',
    urgency: 'today',
    verificationPreference: 'verified_skills',
    diagnosticAnswers: {
      issueType: 'Leak',
      location: 'Kitchen sink',
      duration: 'Past few days',
      waterSupplyOff: 'Yes',
    },
  },
  cancellations: [],
  activeScenario: 'none',
  scenarioStep: 1,

  setRole: (role: Role) => {
    set((state) => {
      let currentUserId = state.currentUserId;
      if (role === 'customer') {
        currentUserId = 'c1';
      } else if (role === 'professional') {
        currentUserId = 'p1';
      } else if (role === 'admin') {
        currentUserId = 'admin-1';
      }
      return { role, currentUserId };
    });
  },

  setCurrentUserId: (currentUserId: string) => set({ currentUserId }),

  setPaymentOutcome: (paymentOutcome: 'success' | 'fail') => set({ paymentOutcome }),

  setPendingSignup: (pendingSignup: PendingSignup | null) => set({ pendingSignup }),

  setDraftRequest: (draftRequest: DraftRequest | null) => set({ draftRequest }),

  completePhoneVerification: () => {
    const { pendingSignup, role: currentRole, customers, professionals } = get();
    if (pendingSignup) {
      const activeRole = pendingSignup.role;
      const newId = `${activeRole === 'customer' ? 'c' : 'p'}-${Date.now().toString().slice(-4)}`;

      if (activeRole === 'customer') {
        const newCustomer: Customer = {
          id: newId,
          fullName: pendingSignup.fullName,
          phone: pendingSignup.phone.startsWith('+251') ? pendingSignup.phone : `+251 ${pendingSignup.phone}`,
          subCity: 'Bole',
        };
        set({
          role: 'customer',
          currentUserId: newId,
          customers: [newCustomer, ...customers],
          pendingSignup: null,
        });
        return { role: 'customer', userId: newId };
      } else {
        const newPro: Professional = {
          id: newId,
          fullName: pendingSignup.fullName,
          phone: pendingSignup.phone.startsWith('+251') ? pendingSignup.phone : `+251 ${pendingSignup.phone}`,
          trade: pendingSignup.trade || 'Plumber',
          subCity: 'Bole',
          avatarUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150',
          bio: 'Registered independent tradesperson on Etcom.',
          identityStatus: 'not_submitted',
          skillsStatus: 'not_submitted',
          confirmedJobsCount: 0,
          listingStatus: 'in_progress',
          claimedExperienceYears: 1,
          rating: 0,
          reviewCount: 0,
        };
        set({
          role: 'professional',
          currentUserId: newId,
          professionals: [newPro, ...professionals],
          pendingSignup: null,
        });
        return { role: 'professional', userId: newId };
      }
    }

    return { role: currentRole, userId: get().currentUserId };
  },

  resetDemoData: () =>
    set({
      role: 'customer',
      currentUserId: 'c1',
      paymentOutcome: 'success',
      jobs: INITIAL_JOBS,
      professionals: INITIAL_PROFESSIONALS,
      customers: INITIAL_CUSTOMERS,
      messages: INITIAL_MESSAGES,
      reviews: INITIAL_REVIEWS,
      disputes: INITIAL_DISPUTES,
      notifications: INITIAL_NOTIFICATIONS,
      pendingSignup: null,
      cancellations: [],
      activeScenario: 'none',
      scenarioStep: 1,
    }),

  updateJob: (jobId: string, updates: Partial<Job>) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),

  createJob: (data) => {
    const { currentUserId, draftRequest, jobs, professionals } = get();
    const pro = professionals.find((p) => p.id === data.proId);
    const newJobId = `job-${Date.now().toString().slice(-4)}`;
    const category = data.category || pro?.trade || draftRequest?.category || 'General';
    const subCity = data.subCity || draftRequest?.subCity || pro?.subCity || 'Bole';
    const title =
      data.title || draftRequest?.description?.slice(0, 45) || `${category} Service Request`;
    const description =
      data.description ||
      draftRequest?.description ||
      `Initial request sent to ${pro?.fullName || 'professional'}.`;

    const photos = data.photos || draftRequest?.photos || [];
    const diagnosticAnswers = data.diagnosticAnswers || draftRequest?.diagnosticAnswers;
    const voiceNoteUrl = data.voiceNoteUrl || draftRequest?.voiceNoteUrl;

    const initialLabor = data.proposedLaborETB || (pro?.hourlyRateEstimate ? pro.hourlyRateEstimate * 2 : 1000);

    const initialQuote: Quote = {
      id: `q-${newJobId}`,
      jobId: newJobId,
      proId: data.proId,
      laborAmountETB: initialLabor,
      materialsAmountETB: 0,
      totalAmountETB: initialLabor,
      scopeDescription: description,
      validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: 'requested',
    };

    const newJob: Job = {
      id: newJobId,
      customerId: currentUserId || 'c1',
      proId: data.proId,
      title,
      description,
      category,
      subCity,
      quoteStatus: 'requested',
      paymentStatus: 'unpaid',
      completionStatus: 'not_started',
      lifecycleStage: 'request_created',
      createdAt: new Date().toISOString(),
      photos,
      diagnosticAnswers,
      voiceNoteUrl,
      activeQuote: initialQuote,
    };

    set({ jobs: [newJob, ...jobs] });
    return newJobId;
  },

  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  updateQuoteStatus: (jobId, status, counterAmount, counterMessage) => {
    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId) return job;
        const currentQuote = job.activeQuote;
        const historyItem = currentQuote
          ? {
              id: `qh-${Date.now()}`,
              quoteId: currentQuote.id,
              type: (status === 'negotiating'
                ? 'countered'
                : status === 'accepted'
                ? 'accepted'
                : status === 'declined'
                ? 'declined'
                : 'quoted') as QuoteHistoryItem['type'],
              amountETB: counterAmount || currentQuote.totalAmountETB,
              actor: 'customer' as const,
              message:
                counterMessage ||
                (status === 'accepted' ? 'Agreed price locked by customer' : undefined),
              timestamp: new Date().toISOString(),
            }
          : undefined;

        const updatedQuote: Quote | undefined = currentQuote
          ? {
              ...currentQuote,
              status,
              totalAmountETB: counterAmount || currentQuote.totalAmountETB,
              laborAmountETB: counterAmount
                ? Math.round(counterAmount - (currentQuote.materialsAmountETB || 0))
                : currentQuote.laborAmountETB,
              history: historyItem
                ? [...(currentQuote.history || []), historyItem]
                : currentQuote.history,
            }
          : undefined;

        return {
          ...job,
          quoteStatus: status,
          lifecycleStage: status === 'accepted' ? 'accepted' : job.lifecycleStage,
          activeQuote: updatedQuote,
        };
      }),
    }));
  },

  reviseQuote: (jobId, totalAmountETB, message) => {
    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId || !job.activeQuote) return job;
        const labor = Math.round(totalAmountETB * 0.75);
        const materials = totalAmountETB - labor;
        const historyItem: QuoteHistoryItem = {
          id: `qh-${Date.now()}`,
          quoteId: job.activeQuote.id,
          type: 'revised',
          amountETB: totalAmountETB,
          actor: 'professional',
          message: message || 'Updated price offer submitted.',
          timestamp: new Date().toISOString(),
        };

        const updatedQuote: Quote = {
          ...job.activeQuote,
          laborAmountETB: labor,
          materialsAmountETB: materials,
          totalAmountETB,
          status: 'quoted',
          history: [...(job.activeQuote.history || []), historyItem],
        };

        return {
          ...job,
          quoteStatus: 'quoted',
          activeQuote: updatedQuote,
        };
      }),
    }));
  },

  // Lock agreed price without requiring upfront payment
  confirmAgreement: (jobId) => {
    const { addMessage } = get();
    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId) return job;
        return {
          ...job,
          quoteStatus: 'accepted',
          lifecycleStage: 'accepted',
          paymentStatus: 'unpaid',
          completionStatus: 'not_started',
          contactRevealed: true,
        };
      }),
    }));

    addMessage({
      id: `m-agreed-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Price agreement locked. Under Etcom rules, payment is made on-site only after work is completed.',
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  },

  dispatchJob: (jobId) => {
    const { addMessage } = get();
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              lifecycleStage: 'dispatched',
              quoteStatus: 'accepted',
              completionStatus: 'not_started',
            }
          : j
      ),
    }));

    addMessage({
      id: `m-dispatch-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Professional is on the way. You can track arrival on the live map.',
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  },

  arriveProAtSite: (jobId) => {
    const { addMessage } = get();
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              lifecycleStage: 'arrived',
            }
          : j
      ),
    }));

    addMessage({
      id: `m-arrive-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Professional has arrived on-site. Scope and agreed labor price confirmation pending before work begins.',
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  },

  // Start work on site. Pro does NOT need prepayment. Runs the elapsed timer.
  startProJob: (jobId, confirmedLaborETB, confirmedMaterialsETB, scopeReason) => {
    const { addMessage } = get();
    const now = new Date().toISOString();

    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId) return job;
        const labor = confirmedLaborETB !== undefined ? confirmedLaborETB : (job.activeQuote?.laborAmountETB || 1000);
        const materials = confirmedMaterialsETB !== undefined ? confirmedMaterialsETB : (job.activeQuote?.materialsAmountETB || 0);

        return {
          ...job,
          lifecycleStage: 'in_progress',
          completionStatus: 'in_progress',
          paymentStatus: 'unpaid',
          startedAt: job.startedAt || now,
          actualLaborETB: labor,
          actualMaterialsETB: materials,
          scopeChangeReason: scopeReason || job.scopeChangeReason,
        };
      }),
    }));

    addMessage({
      id: `m-start-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Job started on site. Scope confirmed and work timer is active.',
      timestamp: now,
      type: 'system',
    });
  },

  // Pro finishes work, uploads after-photos, and stops the timer
  finishProJob: (jobId, afterPhotos = [], durationMinutes = 45) => {
    const { addMessage } = get();
    const now = new Date().toISOString();

    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId) return job;
        return {
          ...job,
          lifecycleStage: 'completed_pending_payment',
          completionStatus: 'awaiting_confirmation',
          finishedAt: now,
          durationMinutes: job.durationMinutes || durationMinutes,
          afterPhotos: afterPhotos.length > 0 ? afterPhotos : (job.afterPhotos || ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400']),
        };
      }),
    }));

    addMessage({
      id: `m-finish-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Professional has completed the job and uploaded after-photos. Customer confirmation and M-PESA payment prompt requested.',
      timestamp: now,
      type: 'system',
    });
  },

  markProJobFinished: (jobId, afterPhotos) => {
    get().finishProJob(jobId, afterPhotos);
  },

  // Process M-PESA USSDPush payment on completion
  processPayment: async (jobId, phone) => {
    const { paymentOutcome, jobs, addMessage, customers, professionals } = get();
    const job = jobs.find((j) => j.id === jobId);

    if (!job) {
      return { success: false, error: 'Job record not found.' };
    }

    // Critical Rule: Payment can ONLY be initiated after work is finished
    if (
      job.completionStatus !== 'awaiting_confirmation' &&
      job.completionStatus !== 'completed' &&
      job.lifecycleStage !== 'completed_pending_payment' &&
      job.lifecycleStage !== 'payment_pending' &&
      job.lifecycleStage !== 'paid'
    ) {
      return {
        success: false,
        error: 'Cannot process payment before work is completed by the professional.',
      };
    }

    // Duplicate payment prevention
    if (job.paymentStatus === 'confirmed' && job.receipt) {
      return {
        success: true,
        transactionCode: job.receipt.transactionCode,
      };
    }

    // Simulate network latency for USSD push
    await new Promise((resolve) => setTimeout(resolve, 2500));

    if (paymentOutcome === 'success') {
      const txCode = `MPESA-TX-${Math.floor(100000 + Math.random() * 900000)}X`;
      const now = new Date().toISOString();

      const labor = job.actualLaborETB || job.activeQuote?.laborAmountETB || 1000;
      const materials = job.actualMaterialsETB || job.activeQuote?.materialsAmountETB || 0;
      const financials = calculateJobFinancials(labor, materials);

      const customer = customers.find((c) => c.id === job.customerId);
      const pro = professionals.find((p) => p.id === job.proId);

      const receipt: DigitalReceipt = {
        id: `rec-${Date.now()}`,
        transactionCode: txCode,
        jobId: job.id,
        jobTitle: job.title,
        category: job.category,
        customerId: job.customerId,
        customerName: customer?.fullName || 'Verified Customer',
        customerPhone: customer?.phone || phone,
        proId: job.proId,
        proName: pro?.fullName || 'Professional Tradesperson',
        proPhone: pro?.phone,
        proTrade: pro?.trade || job.category,
        laborAmountETB: financials.laborAmountETB,
        materialsAmountETB: financials.materialsAmountETB,
        platformFeeETB: financials.platformFeeETB,
        professionalPayoutETB: financials.professionalPayoutETB,
        totalCustomerPaidETB: financials.customerTotalETB,
        paymentMethod: 'M-PESA USSDPush',
        status: 'paid',
        completedAt: job.finishedAt || now,
        paidAt: now,
      };

      set({
        jobs: jobs.map((j) =>
          j.id === jobId
            ? {
                ...j,
                paymentStatus: 'confirmed',
                completionStatus: 'completed',
                lifecycleStage: 'paid',
                receipt,
              }
            : j
        ),
        professionals: professionals.map((p) =>
          p.id === job.proId
            ? { ...p, confirmedJobsCount: p.confirmedJobsCount + 1 }
            : p
        ),
      });

      addMessage({
        id: `m-pay-ok-${Date.now()}`,
        jobId,
        senderId: 'system',
        senderRole: 'admin',
        text: `M-PESA Payment Confirmed (${txCode}). Customer paid ETB ${financials.customerTotalETB}. Platform fee (8% labor): ETB ${financials.platformFeeETB}. Pro payout: ETB ${financials.professionalPayoutETB}. Digital receipt generated.`,
        timestamp: now,
        type: 'system',
      });

      return { success: true, transactionCode: txCode };
    } else {
      set({
        jobs: jobs.map((j) =>
          j.id === jobId
            ? {
                ...j,
                paymentStatus: 'failed',
              }
            : j
        ),
      });

      return {
        success: false,
        error: `M-PESA prompt timed out or cancelled for ${phone}. No funds deducted. Please retry.`,
      };
    }
  },

  completeAndReviewJob: (jobId, reviewData) => {
    const { jobs, professionals, customers, currentUserId, reviews } = get();
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const customer = customers.find((c) => c.id === currentUserId);
    const now = new Date();
    const canEditUntil = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();

    const newReview: Review = {
      id: `r-${Date.now()}`,
      jobId,
      proId: job.proId,
      customerId: currentUserId,
      customerName: customer?.fullName || 'Verified Customer',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: now.toISOString(),
      tags: reviewData.tags,
      photos: reviewData.photos,
      canEditUntil,
      consentToPublish: reviewData.consentToPublish ?? true,
    };

    set({
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              lifecycleStage: 'payment_pending',
            }
          : j
      ),
      reviews: [newReview, ...reviews],
      professionals: professionals.map((pro) => {
        if (pro.id !== job.proId) return pro;
        const currentRatingTotal = pro.rating * (pro.reviewCount || 1);
        const newRating = Number(((currentRatingTotal + reviewData.rating) / (pro.reviewCount + 1)).toFixed(1));
        return {
          ...pro,
          reviewCount: pro.reviewCount + 1,
          rating: newRating,
        };
      }),
    });
  },

  updateSubmittedReview: (reviewId, updates) => {
    const { reviews, professionals } = get();
    const review = reviews.find((r) => r.id === reviewId);
    if (!review) return { success: false, error: 'Review not found.' };

    const now = new Date().getTime();
    const expiry = review.canEditUntil ? new Date(review.canEditUntil).getTime() : 0;
    if (expiry && now > expiry) {
      return { success: false, error: 'The 2-hour review editing window has expired.' };
    }

    const updatedReview: Review = {
      ...review,
      rating: updates.rating !== undefined ? updates.rating : review.rating,
      comment: updates.comment !== undefined ? updates.comment : review.comment,
      tags: updates.tags !== undefined ? updates.tags : review.tags,
    };

    set({
      reviews: reviews.map((r) => (r.id === reviewId ? updatedReview : r)),
      professionals: professionals.map((pro) => {
        if (pro.id !== review.proId) return pro;
        return pro;
      }),
    });

    return { success: true };
  },

  simulateWorkFinished: (jobId) => {
    get().finishProJob(jobId || 'job-101');
  },

  recordCancellation: (jobId, actor, reason) => {
    const { cancellations, jobs, currentUserId, role } = get();
    const now = new Date();
    const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

    const userPastCancellations = cancellations.filter(
      (c) => c.userId === currentUserId && c.role === role && new Date(c.timestamp).getTime() > thirtyDaysAgo
    );

    const newCount = userPastCancellations.length + 1;
    const warningTriggered = newCount === 2;
    const penaltyTriggered = newCount >= 3;

    const newRecord: CancellationRecord = {
      id: `canc-${Date.now()}`,
      userId: currentUserId,
      role,
      jobId,
      reason,
      timestamp: now.toISOString(),
    };

    set({
      cancellations: [...cancellations, newRecord],
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              lifecycleStage: 'cancelled',
              cancellationReason: reason,
              cancelledBy: actor,
            }
          : j
      ),
    });

    return { warningTriggered, penaltyTriggered };
  },

  reportCustomerIssue: (jobId, reason) => {
    const { jobs, addMessage } = get();
    set({
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              proReportedIssue: reason,
              lifecycleStage: 'disputed',
            }
          : j
      ),
    });

    addMessage({
      id: `m-cust-issue-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: `Professional reported an issue on arrival: "${reason}". Logged for platform mediation.`,
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  },

  reportProDidNotArrive: (jobId) => {
    const { jobs, addMessage } = get();
    set({
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              customerReportedIssue: 'Professional did not arrive',
              lifecycleStage: 'cancelled',
            }
          : j
      ),
    });

    addMessage({
      id: `m-no-show-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderRole: 'admin',
      text: 'Customer reported professional did not arrive. Strike logged against professional profile.',
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  },

  createDispute: (jobId, reason, description, photos = []) => {
    const { jobs, disputes, notifications } = get();
    const job = jobs.find((j) => j.id === jobId);
    const refNum = `DSP-${Math.floor(100000 + Math.random() * 900000)}`;

    const newDispute: Dispute = {
      id: `disp-${Date.now()}`,
      referenceNumber: refNum,
      jobId,
      proId: job?.proId || 'p1',
      customerId: job?.customerId || 'c1',
      reason,
      description,
      desiredResolution: 'Review and mediation',
      photos,
      status: 'opened',
      createdAt: new Date().toISOString(),
    };

    const newAdminNotif: AppNotification = {
      id: `notif-disp-${Date.now()}`,
      recipientId: 'admin-1',
      role: 'admin',
      type: 'dispute_opened',
      title: 'New dispute filed',
      message: `Case ${refNum} opened: ${reason} on ${job?.title || 'job'}. Evidence submitted for mediation.`,
      linkRoute: '/admin/disputes',
      read: false,
      createdAt: new Date().toISOString(),
    };

    set({
      disputes: [newDispute, ...disputes],
      notifications: [newAdminNotif, ...notifications],
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              completionStatus: 'disputed',
              lifecycleStage: 'disputed',
            }
          : j
      ),
    });

    return { dispute: newDispute, referenceNumber: refNum };
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllNotificationsAsRead: (role) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        !role || n.role === role ? { ...n, read: true } : n
      ),
    }));
  },

  saveProOnboarding: (data) => {
    const { professionals, currentUserId, role } = get();
    const existingProId =
      role === 'professional' && currentUserId.startsWith('p') ? currentUserId : `p-${Date.now().toString().slice(-4)}`;

    const newPro: Professional = {
      id: existingProId,
      fullName: data.fullName,
      phone: '+251 71 999 8888',
      trade: data.trade,
      subCity: data.subCity,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150',
      bio: data.bio,
      identityStatus: 'not_submitted',
      skillsStatus: 'not_submitted',
      confirmedJobsCount: 0,
      listingStatus: 'in_progress',
      claimedExperienceYears: data.experienceYears,
      rating: 0,
      reviewCount: 0,
      hourlyRateEstimate: 400,
    };

    const existingIndex = professionals.findIndex((p) => p.id === existingProId);
    let updatedPros: Professional[];
    if (existingIndex >= 0) {
      updatedPros = professionals.map((p, idx) => (idx === existingIndex ? newPro : p));
    } else {
      updatedPros = [newPro, ...professionals];
    }

    set({
      role: 'professional',
      currentUserId: existingProId,
      professionals: updatedPros,
    });

    return existingProId;
  },

  submitProIdentity: (proId, data) => {
    set((state) => ({
      professionals: state.professionals.map((pro) => {
        if (pro.id !== proId) return pro;
        const newEvidence = [
          ...(pro.evidenceItems || []),
          {
            id: `ev-id-front-${Date.now()}`,
            type: 'national_id' as const,
            title: `${data?.idType || 'Legal ID'} (Front)`,
            fileName: data?.frontFile || 'id_front_scan.jpg',
            submittedAt: new Date().toISOString(),
          },
          {
            id: `ev-id-back-${Date.now()}`,
            type: 'national_id' as const,
            title: `${data?.idType || 'Legal ID'} (Back)`,
            fileName: data?.backFile || 'id_back_scan.jpg',
            submittedAt: new Date().toISOString(),
          },
          {
            id: `ev-selfie-${Date.now()}`,
            type: 'national_id' as const,
            title: 'Live Selfie Match Photo',
            fileName: data?.selfieFile || 'selfie_capture.jpg',
            submittedAt: new Date().toISOString(),
          },
        ];
        return {
          ...pro,
          identityStatus: 'in_review',
          evidenceItems: newEvidence,
        };
      }),
    }));
  },

  submitSkillsEvidence: (proId, route, data) => {
    set((state) => ({
      professionals: state.professionals.map((pro) => {
        if (pro.id !== proId) return pro;
        let skillsStatus = pro.skillsStatus;
        if (route === 'upload') skillsStatus = 'in_review';
        else if (route === 'assessment') skillsStatus = 'assessment_required';
        else if (route === 'no_evidence') skillsStatus = 'not_submitted';

        const addedEvidence = (data?.files || []).map((file, idx) => ({
          id: `ev-skill-${Date.now()}-${idx}`,
          type: file.includes('tvet')
            ? ('tvet_certificate' as const)
            : file.includes('license')
            ? ('trade_license' as const)
            : ('work_sample' as const),
          title: file.includes('tvet')
            ? `${pro.trade} TVET Qualification`
            : file.includes('license')
            ? 'Trade License Certificate'
            : 'Completed Work Sample',
          fileName: file,
          submittedAt: new Date().toISOString(),
        }));

        const newReferences = data?.refereeName
          ? [
              ...(pro.references || []),
              {
                name: data.refereeName,
                phone: data.refereePhone || '+251 71 100 2233',
                relationship: data.refereeRelationship || 'Supervisor',
              },
            ]
          : pro.references;

        return {
          ...pro,
          skillsStatus,
          evidenceItems: [...(pro.evidenceItems || []), ...addedEvidence],
          references: newReferences,
        };
      }),
    }));
  },

  cycleProVerificationStatus: (proId) => {
    set((state) => {
      const targetId = proId || (state.role === 'professional' ? state.currentUserId : 'p1');
      return {
        professionals: state.professionals.map((pro) => {
          if (pro.id !== targetId) return pro;

          if (pro.skillsStatus === 'in_review' || pro.skillsStatus === 'not_submitted') {
            return {
              ...pro,
              identityStatus: 'verified',
              skillsStatus: 'evidence_accepted',
              listingStatus: 'eligible',
              adminFeedback: undefined,
            };
          } else if (pro.skillsStatus === 'evidence_accepted') {
            return {
              ...pro,
              identityStatus: 'verified',
              skillsStatus: 'more_info_needed',
              listingStatus: 'in_progress',
              adminFeedback: 'The trade license certificate scan is blurry. Please upload a clear photo of the license or TVET credential.',
            };
          } else if (pro.skillsStatus === 'more_info_needed') {
            return {
              ...pro,
              identityStatus: 'verified',
              skillsStatus: 'not_verified',
              listingStatus: 'in_progress',
              adminFeedback: undefined,
            };
          } else {
            return {
              ...pro,
              identityStatus: 'in_review',
              skillsStatus: 'in_review',
              listingStatus: 'in_progress',
              adminFeedback: undefined,
            };
          }
        }),
      };
    });
  },

  declineJobRequest: (jobId) => {
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, quoteStatus: 'declined', lifecycleStage: 'cancelled' } : j
      ),
    }));
  },

  sendProQuote: (jobId, data) => {
    const { jobs, messages } = get();
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const isRevision = job.quoteStatus === 'accepted' || job.quoteStatus === 'quoted' || Boolean(data.revisionReason);
    const newStatus: QuoteStatus = isRevision ? 'negotiating' : 'quoted';
    const quoteId = `q-${Date.now()}`;

    const newQuote: Quote = {
      id: quoteId,
      jobId,
      proId: job.proId,
      laborAmountETB: data.laborAmountETB,
      materialsAmountETB: data.materialsAmountETB,
      totalAmountETB: data.totalAmountETB,
      scopeDescription: data.scopeDescription,
      validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: newStatus,
      history: [
        ...(job.activeQuote?.history || []),
        {
          id: `qh-${Date.now()}`,
          quoteId,
          type: isRevision ? 'revised' : 'quoted',
          amountETB: data.totalAmountETB,
          actor: 'professional',
          message: data.revisionReason || data.scopeDescription,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const newMsg: Message = {
      id: `m-quote-${Date.now()}`,
      jobId,
      senderId: job.proId,
      senderRole: 'professional',
      text: data.revisionReason
        ? `Quote revised to ${data.totalAmountETB} ETB: ${data.revisionReason}`
        : `Itemized quote submitted: ${data.totalAmountETB} ETB for ${data.scopeDescription}`,
      timestamp: new Date().toISOString(),
      type: 'quote',
      quoteId,
      quoteAmountETB: data.totalAmountETB,
    };

    set({
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              activeQuote: newQuote,
              quoteStatus: newStatus,
              scheduledDate: data.scheduledDate || j.scheduledDate,
            }
          : j
      ),
      messages: [...messages, newMsg],
    });
  },

  addSelfPortfolioItem: (proId, item) => {
    set((state) => ({
      professionals: state.professionals.map((pro) => {
        if (pro.id !== proId) return pro;
        const newItem = {
          id: `self-${Date.now()}`,
          title: item.title,
          category: item.category,
          description: item.description,
          photoUrl: item.photoUrl,
          createdAt: new Date().toISOString(),
        };
        return {
          ...pro,
          selfUploads: [newItem, ...(pro.selfUploads || [])],
        };
      }),
    }));
  },

  saveReviewDecision: (proId, decision) => {
    set((state) => ({
      professionals: state.professionals.map((pro) => {
        if (pro.id !== proId) return pro;

        const updates: Partial<Professional> = {
          reviewedBy: 'Etcom Verification Team',
          reviewedAt: new Date().toISOString(),
        };

        if (decision.flagForInvestigation) {
          updates.listingStatus = 'restricted';
          updates.flaggedForInvestigation = true;
        }

        if (decision.category === 'identity') {
          if (decision.identityStatus) {
            updates.identityStatus = decision.identityStatus;
          }
          if (decision.reason) {
            updates.identityDecisionReason = decision.reason;
            updates.adminFeedback = decision.reason;
          }
        } else if (decision.category === 'skills') {
          if (decision.skillsStatus) {
            updates.skillsStatus = decision.skillsStatus;
          }
          if (decision.reason) {
            updates.skillsDecisionReason = decision.reason;
            updates.adminFeedback = decision.reason;
          }
        }

        if (!decision.flagForInvestigation && updates.listingStatus !== 'restricted') {
          const newIdStatus = updates.identityStatus || pro.identityStatus;
          const newSkillsStatus = updates.skillsStatus || pro.skillsStatus;
          if (newIdStatus === 'verified' && (newSkillsStatus === 'evidence_accepted' || newSkillsStatus === 'not_verified')) {
            updates.listingStatus = 'eligible';
          }
        }

        return { ...pro, ...updates };
      }),
    }));
  },

  resolveDispute: (disputeId, action, note) => {
    const { disputes, jobs, messages } = get();
    const dispute = disputes.find((d) => d.id === disputeId);
    if (!dispute) return;

    const now = new Date().toISOString();

    let newDisputeStatus: Dispute['status'] = dispute.status;
    let jobCompletionUpdates: Partial<Job> = {};

    if (action === 'request_info') {
      newDisputeStatus = 'under_review';
    } else if (action === 'resolve_customer') {
      newDisputeStatus = 'resolved_refund';
      jobCompletionUpdates = {
        completionStatus: 'disputed',
        lifecycleStage: 'disputed',
      };
    } else if (action === 'resolve_pro') {
      newDisputeStatus = 'resolved_payout';
      jobCompletionUpdates = {
        completionStatus: 'completed',
        lifecycleStage: 'paid',
      };
    }

    const systemMsg: Message = {
      id: `m-dispute-${Date.now()}`,
      jobId: dispute.jobId,
      senderId: 'admin-1',
      senderRole: 'admin',
      text:
        action === 'request_info'
          ? `Mediation update: ${note}. Both parties please reply with requested photos/records.`
          : action === 'resolve_customer'
          ? `Dispute concluded in favour of customer: ${note}. No payment deducted from customer M-PESA balance.`
          : `Dispute concluded in favour of professional: ${note}. Work record validated.`,
      timestamp: now,
      type: 'system',
    };

    set({
      disputes: disputes.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              status: newDisputeStatus,
              resolutionNote: note,
              resolvedAt: action !== 'request_info' ? now : d.resolvedAt,
              resolvedBy: 'Admin Mediation Team',
            }
          : d
      ),
      jobs: jobs.map((j) =>
        j.id === dispute.jobId
          ? {
              ...j,
              ...jobCompletionUpdates,
            }
          : j
      ),
      messages: [...messages, systemMsg],
    });
  },

  setScenario: (scenario, step = 1) => {
    set({ activeScenario: scenario, scenarioStep: step });
  },

  advanceScenario: () => {
    set((state) => ({ scenarioStep: state.scenarioStep + 1 }));
  },
}));
