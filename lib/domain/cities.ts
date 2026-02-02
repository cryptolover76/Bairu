
import { SupabaseClient } from '@supabase/supabase-js';
import { City } from '../../types/database';

export class CityService {
  constructor(private supabase: SupabaseClient) {}

  async list() {
    const { data, error } = await this.supabase
      .from('cities')
      .select('*')
      .order('name');
    return { data: data as City[] | null, error };
  }

  async getBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('cities')
      .select('*')
      .eq('slug', slug)
      .single();
    return { data: data as City | null, error };
  }
}
