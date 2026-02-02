
import { SupabaseClient } from '@supabase/supabase-js';
import { generateUniqueSlug } from '../seo/slugify';
import { Business } from '../../types/database';

export class BusinessService {
  constructor(private supabase: SupabaseClient) {}

  async list(filters: { city_id?: string; category_id?: string; query?: string }) {
    let query = this.supabase
      .from('businesses')
      .select('*, cities(name, slug), categories(name, slug)')
      .eq('is_active', true);

    if (filters.city_id) query = query.eq('city_id', filters.city_id);
    if (filters.category_id) query = query.eq('category_id', filters.category_id);
    if (filters.query) query = query.ilike('name', `%${filters.query}%`);

    const { data, error } = await query;
    return { data: data as Business[] | null, error };
  }

  async getBySlug(cityId: string, slug: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*, cities(*), categories(*)')
      .eq('city_id', cityId)
      .eq('slug', slug)
      .single();
    
    return { data: data as Business | null, error };
  }

  async create(payload: Partial<Business>) {
    const checkUniqueness = async (slug: string) => {
      const { count } = await this.supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true })
        .eq('city_id', payload.city_id)
        .eq('slug', slug);
      return count === 0;
    };

    const slug = await generateUniqueSlug(payload.name!, checkUniqueness);
    
    const { data, error } = await this.supabase
      .from('businesses')
      .insert([{ ...payload, slug }])
      .select()
      .single();

    return { data, error };
  }
}
