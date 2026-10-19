import { createBrowserRouter } from 'react-router-dom';
import { MobileShell } from '@/layouts/MobileShell';
import { AuthLayout } from '@/layouts/AuthLayout';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { ProLayout } from '@/layouts/ProLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { WelcomePage } from '@/pages/auth/WelcomePage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { VerifyPhonePage } from '@/pages/auth/VerifyPhonePage';
import { HomePage } from '@/pages/customer/HomePage';
import { NewRequestPage } from '@/pages/customer/NewRequestPage';
import { ResultsPage } from '@/pages/customer/ResultsPage';
import { ProfessionalProfilePage } from '@/pages/customer/ProfessionalProfilePage';
import { JobChatPage } from '@/pages/customer/JobChatPage';
import { QuotePage } from '@/pages/customer/QuotePage';
import { ConfirmAgreementPage } from '@/pages/customer/ConfirmAgreementPage';
import { PaymentPage } from '@/pages/customer/PaymentPage';
import { JobTrackerPage } from '@/pages/customer/JobTrackerPage';
import { CompletePage } from '@/pages/customer/CompletePage';
import { DisputePage } from '@/pages/customer/DisputePage';
import { MyJobsPage } from '@/pages/customer/MyJobsPage';
import { AccountPage } from '@/pages/customer/AccountPage';
import { NotificationsPage } from '@/pages/customer/NotificationsPage';
import { OnboardingPage } from '@/pages/pro/OnboardingPage';
import { IdentityVerificationPage } from '@/pages/pro/IdentityVerificationPage';
import { SkillsEvidencePage } from '@/pages/pro/SkillsEvidencePage';
import { VerificationStatusPage } from '@/pages/pro/VerificationStatusPage';
import { DashboardPage } from '@/pages/pro/DashboardPage';
import { RequestsPage } from '@/pages/pro/RequestsPage';
import { QuoteBuilderPage } from '@/pages/pro/QuoteBuilderPage';
import { ProJobDetailPage } from '@/pages/pro/ProJobDetailPage';
import { PortfolioPage } from '@/pages/pro/PortfolioPage';
import { ReviewsPage } from '@/pages/pro/ReviewsPage';
import { ReviewQueuePage } from '@/pages/admin/ReviewQueuePage';
import { ReviewDetailPage } from '@/pages/admin/ReviewDetailPage';
import { DisputesPage } from '@/pages/admin/DisputesPage';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    element: <MobileShell />,
    children: [
      // Auth Flow (no bottom nav)
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH_WELCOME,
            element: <WelcomePage />,
          },
          {
            path: ROUTES.AUTH_SIGNUP,
            element: <SignupPage />,
          },
          {
            path: ROUTES.AUTH_VERIFY_PHONE,
            element: <VerifyPhonePage />,
          },
          {
            path: ROUTES.PRO_ONBOARDING,
            element: <OnboardingPage />,
          },
        ],
      },

      // Customer Flow (Customer header + bottom nav)
      {
        element: <CustomerLayout />,
        children: [
          {
            path: ROUTES.CUSTOMER_HOME,
            element: <HomePage />,
          },
          {
            path: ROUTES.CUSTOMER_REQUEST_NEW,
            element: <NewRequestPage />,
          },
          {
            path: ROUTES.CUSTOMER_RESULTS,
            element: <ResultsPage />,
          },
          {
            path: ROUTES.CUSTOMER_PRO_DETAIL(':id'),
            element: <ProfessionalProfilePage />,
          },
          {
            path: ROUTES.CUSTOMER_JOBS,
            element: <MyJobsPage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_DETAIL(':id'),
            element: <JobTrackerPage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_CHAT(':id'),
            element: <JobChatPage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_QUOTE(':id'),
            element: <QuotePage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_CONFIRM(':id'),
            element: <ConfirmAgreementPage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_PAY(':id'),
            element: <PaymentPage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_COMPLETE(':id'),
            element: <CompletePage />,
          },
          {
            path: ROUTES.CUSTOMER_JOB_DISPUTE(':id'),
            element: <DisputePage />,
          },
          {
            path: ROUTES.CUSTOMER_ACCOUNT,
            element: <AccountPage />,
          },
          {
            path: ROUTES.CUSTOMER_NOTIFICATIONS,
            element: <NotificationsPage />,
          },
        ],
      },

      // Professional Flow (Pro header + bottom nav)
      {
        element: <ProLayout />,
        children: [
          {
            path: ROUTES.PRO_DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: ROUTES.PRO_VERIFY_IDENTITY,
            element: <IdentityVerificationPage />,
          },
          {
            path: ROUTES.PRO_VERIFY_SKILLS,
            element: <SkillsEvidencePage />,
          },
          {
            path: ROUTES.PRO_VERIFICATION,
            element: <VerificationStatusPage />,
          },
          {
            path: ROUTES.PRO_REQUESTS,
            element: <RequestsPage />,
          },
          {
            path: ROUTES.PRO_JOB_DETAIL(':id'),
            element: <ProJobDetailPage />,
          },
          {
            path: ROUTES.PRO_JOB_QUOTE(':id'),
            element: <QuoteBuilderPage />,
          },
          {
            path: ROUTES.PRO_PORTFOLIO,
            element: <PortfolioPage />,
          },
          {
            path: ROUTES.PRO_REVIEWS,
            element: <ReviewsPage />,
          },
        ],
      },

      // Admin Flow (Admin header + bottom nav)
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.ADMIN_QUEUE,
            element: <ReviewQueuePage />,
          },
          {
            path: ROUTES.ADMIN_REVIEW_DETAIL(':id'),
            element: <ReviewDetailPage />,
          },
          {
            path: ROUTES.ADMIN_DISPUTES,
            element: <DisputesPage />,
          },
        ],
      },
    ],
  },
]);
