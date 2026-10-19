export interface DigitalReceipt {
  id: string;
  transactionCode: string;
  jobId: string;
  jobTitle: string;
  category: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  proId: string;
  proName: string;
  proPhone?: string;
  proTrade: string;
  laborAmountETB: number;
  materialsAmountETB: number;
  platformFeeETB: number;       // 8% on labor only
  professionalPayoutETB: number; // 92% of labor + materials
  totalCustomerPaidETB: number;  // labor + materials
  paymentMethod: string;        // 'M-PESA USSDPush'
  status: 'paid' | 'failed' | 'disputed';
  completedAt: string;
  paidAt: string;
}
