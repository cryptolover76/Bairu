
import { z } from 'zod';

export const CitySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
});

export const BusinessSchema = z.object({
  name: z.string().min(2),
  city_id: z.string().uuid(),
  category_id: z.string().uuid(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address_text: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  website_url: z.string().url().optional().or(z.literal('')),
  instagram_url: z.string().optional(),
  delivery: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export const ClassifiedSchema = z.object({
  city_id: z.string().uuid(),
  category_id: z.string().uuid(),
  type: z.enum(['general', 'property', 'job', 'vehicle', 'service', 'event']),
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.number().positive().optional(),
  status: z.enum(['draft', 'published', 'expired', 'archived']).default('published'),
  event_date: z.string().datetime().optional(),
  event_location: z.string().optional(),
  images: z.array(z.string()).max(2).default([]),
});

export const ReviewSchema = z.object({
  business_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
});

export const ReportSchema = z.object({
  entity_type: z.enum(['business', 'classified']),
  entity_id: z.string().uuid(),
  reason: z.string().min(10),
});
