export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  location: string;
  foundedYear: number;
  websiteUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  size: 'Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Pending';
  reviews?: Review[];
  performance?: CompanyPerformance;
}

export interface Review {
  id: string;
  companyId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CompanyPerformance {
  companyId: string;
  totalJobs: number;
  completedJobs: number;
  averageRating: number;
  revenue: number;
}

export interface Project {
  id: string;
  name: string;
  title?: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  tradeType?: string;
  startDate?: string;
  createdAt?: string;
  endDate?: string;
  estimatedBudget?: number;
  location?: string;
  customerName?: string;
  customerEmail?: string;
  assignedCompanyId?: string;
  companyId?: string;
}

export interface ProjectSearchParams {
  query?: string;
  status?: Project['status'];
  tradeType?: string;
  companyId?: string;
}

export interface CompanyListProps {
  companies: Company[];
  onCompanySelect?: (company: Company) => void;
}

export interface CompanySearchParams {
  query?: string;
  industry?: string;
  size?: Company['size'];
  status?: Company['status'];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  projects?: Project[];
  savedCompanies?: Company[];
  preferences?: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
}
