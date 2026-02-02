
import { SupabaseClient } from '@supabase/supabase-js';

export class ClaimService {
  constructor(private supabase: SupabaseClient) {}

  async create(userId: string, businessId: string, details: string) {
    const { data, error } = await this.supabase
      .from('business_claims')
      .insert([{ 
        user_id: userId, 
        business_id: businessId, 
        details, 
        status: 'pending' 
      }])
      .select()
      .single();
    return { data, error };
  }
}
