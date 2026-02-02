
import { SupabaseClient } from '@supabase/supabase-js';

export class AddRequestService {
  constructor(private supabase: SupabaseClient) {}

  async create(userId: string, payload: any) {
    const { data, error } = await this.supabase
      .from('business_add_requests')
      .insert([{ 
        ...payload, 
        user_id: userId, 
        status: 'pending' 
      }])
      .select()
      .single();
    return { data, error };
  }
}
