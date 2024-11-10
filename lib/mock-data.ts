import { Company, Review, CompanyPerformance, Project, User } from './types';

const mockReviews: Review[] = [
  {
    id: 'review1',
    companyId: '1',
    customerName: 'John Smith',
    rating: 5,
    comment: 'Excellent plumbing service, very professional and quick!',
    date: '2023-06-15'
  },
  {
    id: 'review2',
    companyId: '1',
    customerName: 'Emily Davis',
    rating: 4,
    comment: 'Quick and efficient plumbing repairs. Solved my kitchen sink issue in no time.',
    date: '2023-07-20'
  },
  {
    id: 'review3',
    companyId: '2',
    customerName: 'Michael Brown',
    rating: 5,
    comment: 'Top-notch electrical work, highly recommended for home renovations!',
    date: '2023-05-10'
  }
];

const mockPerformance: CompanyPerformance[] = [
  {
    companyId: '1',
    totalJobs: 45,
    completedJobs: 43,
    averageRating: 4.7,
    revenue: 85000
  },
  {
    companyId: '2',
    totalJobs: 38,
    completedJobs: 36,
    averageRating: 4.9,
    revenue: 92000
  },
  {
    companyId: '3',
    totalJobs: 25,
    completedJobs: 24,
    averageRating: 4.5,
    revenue: 55000
  },
  {
    companyId: '4',
    totalJobs: 20,
    completedJobs: 18,
    averageRating: 4.3,
    revenue: 40000
  }
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Swift Plumbing Solutions',
    industry: 'Plumbing',
    description: 'Expert residential and commercial plumbing services. Specializing in kitchen and bathroom renovations, leak detection, and emergency repairs.',
    location: 'Melbourne, VIC',
    foundedYear: 2010,
    websiteUrl: 'https://swiftplumbing.com.au',
    logoUrl: '/logos/swift-plumbing.svg',
    contactEmail: 'contact@swiftplumbing.com.au',
    size: 'Small',
    status: 'Active',
    reviews: mockReviews.filter(review => review.companyId === '1'),
    performance: mockPerformance.find(perf => perf.companyId === '1')
  },
  {
    id: '2',
    name: 'Bright Electrical Experts',
    industry: 'Electrical',
    description: 'Comprehensive electrical services for home and business. Offering smart home installations, electrical safety checks, and energy-efficient solutions.',
    location: 'Sydney, NSW',
    foundedYear: 2015,
    websiteUrl: 'https://brightelectrical.com.au',
    logoUrl: '/logos/bright-electrical.svg',
    contactEmail: 'info@brightelectrical.com.au',
    size: 'Medium',
    status: 'Active',
    reviews: mockReviews.filter(review => review.companyId === '2'),
    performance: mockPerformance.find(perf => perf.companyId === '2')
  },
  {
    id: '3',
    name: 'Precision Carpentry Co.',
    industry: 'Carpentry',
    description: 'Custom woodworking and home renovation specialists. From deck building to interior remodeling, we transform your living spaces.',
    location: 'Brisbane, QLD',
    foundedYear: 2012,
    websiteUrl: 'https://precisioncarpentry.com.au',
    logoUrl: '/logos/precision-carpentry.svg',
    contactEmail: 'support@precisioncarpentry.com.au',
    size: 'Small',
    status: 'Active',
    reviews: mockReviews.filter(review => review.companyId === '3'),
    performance: mockPerformance.find(perf => perf.companyId === '3')
  },
  {
    id: '4',
    name: 'All-in-One Handyman Services',
    industry: 'Handyman',
    description: 'Versatile home maintenance solutions. We handle everything from minor repairs to major home improvements with professionalism and care.',
    location: 'Perth, WA',
    foundedYear: 2018,
    websiteUrl: 'https://allinonehandyman.com.au',
    logoUrl: '/logos/all-in-one-handyman.svg',
    contactEmail: 'bookings@allinonehandyman.com.au',
    size: 'Small',
    status: 'Active',
    reviews: mockReviews.filter(review => review.companyId === '4'),
    performance: mockPerformance.find(perf => perf.companyId === '4')
  }
];

export function getCompanies(params?: {
  page?: number;
  pageSize?: number;
  searchParams?: {
    query?: string;
    industry?: string;
    status?: Company['status'];
  }
}) {
  let filteredCompanies = [...mockCompanies];

  // Apply search filters
  if (params?.searchParams) {
    const { query, industry, status } = params.searchParams;
    
    filteredCompanies = filteredCompanies.filter(company => 
      (!query || company.name.toLowerCase().includes(query.toLowerCase())) &&
      (!industry || company.industry === industry) &&
      (!status || company.status === status)
    );
  }

  // Apply pagination
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    companies: filteredCompanies.slice(startIndex, endIndex),
    total: filteredCompanies.length,
    page,
    pageSize
  };
}

// Export mock projects
export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Kitchen Renovation',
    description: 'Complete kitchen remodel with modern appliances and custom cabinetry',
    status: 'In Progress',
    startDate: '2023-08-01',
    companyId: '1'
  },
  {
    id: 'proj2',
    name: 'Home Electrical Upgrade',
    description: 'Comprehensive electrical system upgrade and smart home integration',
    status: 'Completed',
    startDate: '2023-06-15',
    endDate: '2023-07-30',
    companyId: '2'
  },
  {
    id: 'proj3',
    name: 'Deck Construction',
    description: 'Custom wooden deck with modern design and sustainable materials',
    status: 'Pending',
    startDate: '2023-09-15',
    companyId: '3'
  }
];

export function getProjects(params?: {
  page?: number;
  pageSize?: number;
  searchParams?: {
    query?: string;
    status?: Project['status'];
    companyId?: string;
  }
}) {
  let filteredProjects = [...mockProjects];

  // Apply search filters
  if (params?.searchParams) {
    const { query, status, companyId } = params.searchParams;
    
    filteredProjects = filteredProjects.filter(project => 
      (!query || project.name.toLowerCase().includes(query.toLowerCase())) &&
      (!status || project.status === status) &&
      (!companyId || project.companyId === companyId)
    );
  }

  // Apply pagination
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    projects: filteredProjects.slice(startIndex, endIndex),
    total: filteredProjects.length,
    page,
    pageSize
  };
}

export function createProject(projectData: Omit<Project, 'id'>) {
  const newProject: Project = {
    id: `proj${mockProjects.length + 1}`,
    ...projectData
  };

  mockProjects.push(newProject);
  return newProject;
}

// Add mock user data
export const mockUser: User = {
  id: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+61 412 345 678',
  profilePictureUrl: '/images/testimonial-1.svg',
  address: {
    street: '123 Main St',
    city: 'Melbourne',
    state: 'VIC',
    postalCode: '3000',
    country: 'Australia'
  },
  projects: mockProjects.slice(0, 2),
  savedCompanies: mockCompanies.slice(0, 2),
  preferences: {
    notifications: true,
    darkMode: false,
    language: 'en'
  }
};
