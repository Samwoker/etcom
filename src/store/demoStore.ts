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
  PaymentTerms,
  Review,
  Dispute,
  AppNotification,
  TradeType,
  SubCity,
  IdentityStatus,
  SkillsStatus,
} from '@/types';

import {
  INITIAL_JOBS,
  INITIAL_PROFESSIONALS,
  INITIAL_CUSTOMERS,
  INITIAL_MESSAGES,
  INITIAL_REVIEWS,
  INITIAL_DISPUTES,
  INITIAL_NOTIFICATIONS,
} from '@/data/initialData';


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
  }) => string;
  addMessage: (message: Message) => void;
  updateQuoteStatus: (
    jobId: string,
    status: QuoteStatus,
    counterAmount?: number,
    counterMessage?: string
  ) => void;
  reviseQuote: (jobId: string, totalAmountETB: number, message?: string) => void;
  confirmAgreement: (
    jobId: string,
    paymentTerms: PaymentTerms,
    depositAmountETB?: number
  ) => void;
  processPayment: (
    jobId: string,
    phone: string
  ) => Promise<{ success: boolean; transactionCode?: string; error?: string }>;
  completeAndReviewJob: (
    jobId: string,
    reviewData: { rating: number; comment: string; tags: string[]; photos?: string[] }
  ) => void;
  simulateWorkFinished: (jobId?: string) => void;
  createDispute: (
    jobId: string,
    reason: string,
    description: string,
    photos?: string[]
  ) => { dispute: Dispute; referenceNumber: string };
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
  startProJob: (jobId: string) => void;
  markProJobFinished: (jobId: string) => void;
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
  },

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
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
      `Initial quote request sent to ${pro?.fullName || 'professional'}.`;

    const photos = data.photos || draftRequest?.photos || [];

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
      createdAt: new Date().toISOString(),
      photos,
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
                (status === 'accepted' ? 'Price agreed by customer' : undefined),
              timestamp: new Date().toISOString(),
            }
          : undefined;

        const updatedQuote: Quote | undefined = currentQuote
          ? {
              ...currentQuote,
              status,
              history: historyItem
                ? [...(currentQuote.history || []), historyItem]
                : currentQuote.history,
            }
          : undefined;

        return {
          ...job,
          quoteStatus: status,
          activeQuote: updatedQuote,
        };
      }),
    }));
  },

  reviseQuote: (jobId, totalAmountETB, message) => {
    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId || !job.activeQuote) return job;
        const labor = Math.round(totalAmountETB * 0.7);
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

  confirmAgreement: (jobId, paymentTerms, depositAmountETB) => {
    set((state) => ({
      jobs: state.jobs.map((job) => {
        if (job.id !== jobId) return job;
        const total = job.activeQuote?.totalAmountETB || 1000;
        const deposit =
          depositAmountETB || (paymentTerms === 'deposit_split' ? Math.round(total * 0.4) : total);
        return {
          ...job,
          quoteStatus: 'accepted',
          paymentTerms,
          depositAmountETB: deposit,
          contactRevealed: true,
        };
      }),
    }));
  },

  processPayment: async (jobId, phone) => {
    const { paymentOutcome, jobs, addMessage } = get();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (paymentOutcome === 'success') {
      const txCode = `QJK7${Math.floor(1000 + Math.random() * 9000)}X`;
      set({
        jobs: jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                paymentStatus: 'confirmed',
                completionStatus: 'in_progress',
              }
            : job
        ),
      });

      addMessage({
        id: `m-${Date.now()}`,
        jobId,
        senderId: 'system',
        senderRole: 'admin',
        text: `Payment confirmed via M-PESA (${txCode}). Work is now officially in progress.`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });

      return { success: true, transactionCode: txCode };
    } else {
      set({
        jobs: jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                paymentStatus: 'failed',
              }
            : job
        ),
      });

      return {
        success: false,
        error: `M-PESA prompt was cancelled or timed out for ${phone}. No funds were deducted.`,
      };
    }
  },

  completeAndReviewJob: (jobId, reviewData) => {
    const { jobs, professionals, customers, currentUserId, reviews } = get();
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const customer = customers.find((c) => c.id === currentUserId);
    const newReview: Review = {
      id: `r-${Date.now()}`,
      jobId,
      proId: job.proId,
      customerId: currentUserId,
      customerName: customer?.fullName || 'Verified Customer',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString(),
      tags: reviewData.tags,
      photos: reviewData.photos,
    };

    set({
      jobs: jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              completionStatus: 'completed',
            }
          : j
      ),
      reviews: [newReview, ...reviews],
      professionals: professionals.map((pro) => {
        if (pro.id !== job.proId) return pro;
        const newCount = pro.confirmedJobsCount + 1;
        const currentRatingTotal = pro.rating * (pro.reviewCount || 1);
        const newRating = Number(((currentRatingTotal + reviewData.rating) / (pro.reviewCount + 1)).toFixed(1));
        return {
          ...pro,
          confirmedJobsCount: newCount,
          reviewCount: pro.reviewCount + 1,
          rating: newRating,
        };
      }),
    });
  },

  simulateWorkFinished: (jobId) => {
    set((state) => {
      const targetJob = jobId
        ? state.jobs.find((j) => j.id === jobId)
        : state.jobs.find((j) => j.completionStatus === 'in_progress');

      if (!targetJob) return state;

      return {
        jobs: state.jobs.map((job) =>
          job.id === targetJob.id
            ? { ...job, completionStatus: 'awaiting_confirmation' }
            : job
        ),
      };
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
      message: `Case ${refNum} opened: ${reason} on ${job?.title || 'job'}.`,
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
      phone: '+251 91 999 8888',
      trade: data.trade,
      subCity: data.subCity,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
                phone: data.refereePhone || '+251 91 100 2233',
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

          // Cycle through 4 verification states:
          // 1: in_review
          // 2: verified
          // 3: more_info_needed
          // 4: not_verified
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
        j.id === jobId ? { ...j, quoteStatus: 'declined' } : j
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

  startProJob: (jobId) => {
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, completionStatus: 'in_progress' } : j
      ),
    }));
  },

  markProJobFinished: (jobId) => {
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, completionStatus: 'awaiting_confirmation' } : j
      ),
    }));
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

        // Recalculate listing status if not restricted
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
    const { disputes, jobs, professionals, messages } = get();
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
      };
    } else if (action === 'resolve_pro') {
      newDisputeStatus = 'resolved_payout';
      jobCompletionUpdates = {
        completionStatus: 'completed',
        paymentStatus: 'confirmed',
      };
    }

    const systemMsg: Message = {
      id: `m-dispute-${Date.now()}`,
      jobId: dispute.jobId,
      senderId: 'admin-1',
      senderRole: 'admin',
      text:
        action === 'request_info'
          ? `Arbitration update: ${note}. Both parties please reply with requested evidence.`
          : action === 'resolve_customer'
          ? `Dispute resolved in favour of customer: ${note}.`
          : `Dispute resolved in favour of professional: ${note}. Payout released.`,
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
              resolvedBy: 'Admin Arbitration Team',
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
      professionals:
        action === 'resolve_pro'
          ? professionals.map((p) =>
              p.id === dispute.proId
                ? { ...p, confirmedJobsCount: p.confirmedJobsCount + 1 }
                : p
            )
          : professionals,
    });
  },
}));
