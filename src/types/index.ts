export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'civic' | 'disaster' | 'missing-person' | 'security';
  status: 'pending' | 'verified' | 'in-progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  reportedBy: string;
  reportedAt: string;
  verifiedAt?: string;
  aiVerificationStatus: 'pending' | 'verified' | 'flagged' | 'rejected';
  aiVerificationScore?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'admin' | 'authority';
  avatar?: string;
}

export interface FacialMatchRequest {
  id: string;
  personName: string;
  description: string;
  image: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'scanning' | 'match-found' | 'no-match' | 'expired';
  matchLocation?: {
    lat: number;
    lng: number;
    cameraId: string;
    timestamp: string;
  };
}