
import { SupabaseClient } from '@supabase/supabase-js';

export class ReviewService {
  constructor(private supabase: SupabaseClient) {}

  async create(userId: string, payload: { business_id: string; rating: number; comment: string }) {
    const { data, error } = await this.supabase
      .from('reviews')
      .insert([{ ...payload, user_id: userId }])
      .select()
      .single();
    return { data, error };
  }

  async listByBusiness(businessId: string) {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*, profiles(full_name)')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });
    return { data, error };
  }
}
