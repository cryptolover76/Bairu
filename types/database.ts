
export interface City {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  city_id: string;
  category_id: string;
  phone?: string;
  whatsapp?: string;
  address_text?: string;
  lat?: number;
  lng?: number;
  website_url?: string;
  instagram_url?: string;
  delivery: boolean;
  weekday_open?: string;
  weekday_close?: string;
  closes_at_midday: boolean;
  midday_break_start?: string;
  midday_break_end?: string;
  saturday_open?: string;
  saturday_close?: string;
  sunday_open?: string;
  sunday_close?: string;
  is_active: boolean;
  source?: string;
  data_quality_score: number;
  needs_review: boolean;
  created_at: string;
  updated_at: string;
}

export interface Classified {
  id: string;
  user_id: string;
  city_id: string;
  category_id: string;
  type: 'general' | 'property' | 'job' | 'vehicle' | 'service' | 'event';
  title: string;
  slug: string;
  description: string;
  price?: number;
  status: 'draft' | 'published' | 'expired' | 'archived';
  expires_at?: string;
  images: string[];
  // Event specific
  event_date?: string;
  event_location?: string;
  created_at: string;
  updated_at: string;
}
