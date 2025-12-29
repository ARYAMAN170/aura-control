export type UserRole = 'admin' | 'moderator' | 'user';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  lastLoginAt: Date;
  department?: string;
  location?: string;
}

// Generate unique gradient colors for avatars based on user id
export const getAvatarGradient = (id: string): string => {
  const gradients = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-cyan-500',
    'from-orange-400 to-red-500',
    'from-pink-400 to-purple-500',
    'from-yellow-400 to-orange-500',
    'from-teal-400 to-green-500',
    'from-indigo-400 to-purple-500',
    'from-rose-400 to-pink-500',
    'from-emerald-400 to-teal-500',
  ];
  
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Mock user data - 25 diverse users
export const mockUsers: User[] = [
  {
    id: 'usr_001',
    firstName: 'Alexandra',
    lastName: 'Chen',
    email: 'alexandra.chen@company.io',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2023-01-15'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Engineering',
    location: 'San Francisco, CA',
  },
  {
    id: 'usr_002',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.j@company.io',
    role: 'moderator',
    status: 'active',
    createdAt: new Date('2023-03-22'),
    lastLoginAt: new Date('2024-12-27'),
    department: 'Support',
    location: 'New York, NY',
  },
  {
    id: 'usr_003',
    firstName: 'Yuki',
    lastName: 'Tanaka',
    email: 'yuki.tanaka@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-05-10'),
    lastLoginAt: new Date('2024-12-26'),
    department: 'Design',
    location: 'Tokyo, Japan',
  },
  {
    id: 'usr_004',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.rodriguez@company.io',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2023-02-28'),
    lastLoginAt: new Date('2024-11-15'),
    department: 'Marketing',
    location: 'Madrid, Spain',
  },
  {
    id: 'usr_005',
    firstName: 'James',
    lastName: 'O\'Brien',
    email: 'james.obrien@company.io',
    role: 'moderator',
    status: 'active',
    createdAt: new Date('2023-04-05'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Operations',
    location: 'Dublin, Ireland',
  },
  {
    id: 'usr_006',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-06-18'),
    lastLoginAt: new Date('2024-12-25'),
    department: 'Engineering',
    location: 'Mumbai, India',
  },
  {
    id: 'usr_007',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.io',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2022-11-30'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Executive',
    location: 'Seoul, South Korea',
  },
  {
    id: 'usr_008',
    firstName: 'Sophie',
    lastName: 'Laurent',
    email: 'sophie.laurent@company.io',
    role: 'user',
    status: 'pending',
    createdAt: new Date('2024-12-20'),
    lastLoginAt: new Date('2024-12-20'),
    department: 'Sales',
    location: 'Paris, France',
  },
  {
    id: 'usr_009',
    firstName: 'Mohammed',
    lastName: 'Al-Hassan',
    email: 'mohammed.alhassan@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-07-12'),
    lastLoginAt: new Date('2024-12-24'),
    department: 'Finance',
    location: 'Dubai, UAE',
  },
  {
    id: 'usr_010',
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'emma.w@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-08-25'),
    lastLoginAt: new Date('2024-12-27'),
    department: 'HR',
    location: 'London, UK',
  },
  {
    id: 'usr_011',
    firstName: 'Carlos',
    lastName: 'Mendez',
    email: 'carlos.mendez@company.io',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2023-04-14'),
    lastLoginAt: new Date('2024-10-05'),
    department: 'Engineering',
    location: 'Mexico City, Mexico',
  },
  {
    id: 'usr_012',
    firstName: 'Aisha',
    lastName: 'Okonkwo',
    email: 'aisha.okonkwo@company.io',
    role: 'moderator',
    status: 'active',
    createdAt: new Date('2023-09-03'),
    lastLoginAt: new Date('2024-12-26'),
    department: 'Support',
    location: 'Lagos, Nigeria',
  },
  {
    id: 'usr_013',
    firstName: 'Henrik',
    lastName: 'Johansson',
    email: 'henrik.johansson@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-10-17'),
    lastLoginAt: new Date('2024-12-23'),
    department: 'Product',
    location: 'Stockholm, Sweden',
  },
  {
    id: 'usr_014',
    firstName: 'Mei',
    lastName: 'Wong',
    email: 'mei.wong@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-11-08'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Design',
    location: 'Singapore',
  },
  {
    id: 'usr_015',
    firstName: 'Lucas',
    lastName: 'Silva',
    email: 'lucas.silva@company.io',
    role: 'user',
    status: 'pending',
    createdAt: new Date('2024-12-15'),
    lastLoginAt: new Date('2024-12-15'),
    department: 'Engineering',
    location: 'São Paulo, Brazil',
  },
  {
    id: 'usr_016',
    firstName: 'Olga',
    lastName: 'Petrova',
    email: 'olga.petrova@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2023-12-02'),
    lastLoginAt: new Date('2024-12-22'),
    department: 'Research',
    location: 'Moscow, Russia',
  },
  {
    id: 'usr_017',
    firstName: 'Thomas',
    lastName: 'Müller',
    email: 'thomas.mueller@company.io',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2022-08-20'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Executive',
    location: 'Berlin, Germany',
  },
  {
    id: 'usr_018',
    firstName: 'Fatima',
    lastName: 'Zahra',
    email: 'fatima.zahra@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-10'),
    lastLoginAt: new Date('2024-12-27'),
    department: 'Marketing',
    location: 'Casablanca, Morocco',
  },
  {
    id: 'usr_019',
    firstName: 'Ryan',
    lastName: 'Thompson',
    email: 'ryan.t@company.io',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2023-06-30'),
    lastLoginAt: new Date('2024-09-18'),
    department: 'Sales',
    location: 'Sydney, Australia',
  },
  {
    id: 'usr_020',
    firstName: 'Nina',
    lastName: 'Andersson',
    email: 'nina.andersson@company.io',
    role: 'moderator',
    status: 'active',
    createdAt: new Date('2024-02-14'),
    lastLoginAt: new Date('2024-12-28'),
    department: 'Community',
    location: 'Oslo, Norway',
  },
  {
    id: 'usr_021',
    firstName: 'Kenji',
    lastName: 'Yamamoto',
    email: 'kenji.yamamoto@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-03-20'),
    lastLoginAt: new Date('2024-12-26'),
    department: 'Engineering',
    location: 'Osaka, Japan',
  },
  {
    id: 'usr_022',
    firstName: 'Isabella',
    lastName: 'Costa',
    email: 'isabella.costa@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-04-05'),
    lastLoginAt: new Date('2024-12-25'),
    department: 'Legal',
    location: 'Rome, Italy',
  },
  {
    id: 'usr_023',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-05-12'),
    lastLoginAt: new Date('2024-12-24'),
    department: 'Finance',
    location: 'Cairo, Egypt',
  },
  {
    id: 'usr_024',
    firstName: 'Sarah',
    lastName: 'MacLeod',
    email: 'sarah.macleod@company.io',
    role: 'user',
    status: 'pending',
    createdAt: new Date('2024-12-22'),
    lastLoginAt: new Date('2024-12-22'),
    department: 'HR',
    location: 'Edinburgh, UK',
  },
  {
    id: 'usr_025',
    firstName: 'Wei',
    lastName: 'Zhang',
    email: 'wei.zhang@company.io',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-06-18'),
    lastLoginAt: new Date('2024-12-27'),
    department: 'Engineering',
    location: 'Shanghai, China',
  },
];

// Current logged-in user (admin for demo purposes)
export const currentUser: User = mockUsers[0];

// Stats calculations
export const getUserStats = () => {
  const total = mockUsers.length;
  const active = mockUsers.filter(u => u.status === 'active').length;
  const inactive = mockUsers.filter(u => u.status === 'inactive').length;
  const pending = mockUsers.filter(u => u.status === 'pending').length;
  const admins = mockUsers.filter(u => u.role === 'admin').length;
  const moderators = mockUsers.filter(u => u.role === 'moderator').length;
  const users = mockUsers.filter(u => u.role === 'user').length;
  
  // Recent signups (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newUsersThisMonth = mockUsers.filter(u => u.createdAt >= thirtyDaysAgo).length;
  
  return {
    total,
    active,
    inactive,
    pending,
    admins,
    moderators,
    users,
    newUsersThisMonth,
  };
};