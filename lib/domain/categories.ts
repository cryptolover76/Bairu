
import { SupabaseClient } from '@supabase/supabase-js';
import { Category } from '../../types/database';

export class CategoryService {
  constructor(private supabase: SupabaseClient) {}

  async list() {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .order('name');
    return { data: data as Category[] | null, error };
  }
  
  async listClassifiedCategories() {
    const { data, error } = await this.supabase
      .from('classified_categories')
      .select('*')
      .order('name');
    return { data, error };
  }
}
