
import { SupabaseClient } from '@supabase/supabase-js';

export class ReportService {
  constructor(private supabase: SupabaseClient) {}

  async create(userId: string, payload: any) {
    const { data, error } = await this.supabase
      .from('reports')
      .insert([{ ...payload, user_id: userId }])
      .select()
      .single();
    return { data, error };
  }
}
