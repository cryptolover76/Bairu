
import { SupabaseClient } from '@supabase/supabase-js';
import { generateUniqueSlug } from '../seo/slugify';
import { Classified } from '../../types/database';

export class ClassifiedService {
  constructor(private supabase: SupabaseClient) {}

  async list(filters: { city_id?: string; category_id?: string; type?: string; status?: string }) {
    let query = this.supabase
      .from('classifieds')
      .select('*, cities(name, slug), classified_categories(name, slug)');

    if (filters.city_id) query = query.eq('city_id', filters.city_id);
    if (filters.category_id) query = query.eq('category_id', filters.category_id);
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.status) query = query.eq('status', filters.status);
    else query = query.eq('status', 'published');

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data: data as Classified[] | null, error };
  }

  async getBySlug(cityId: string, type: string, slug: string) {
    const { data, error } = await this.supabase
      .from('classifieds')
      .select('*, cities(*), classified_categories(*)')
      .eq('city_id', cityId)
      .eq('type', type)
      .eq('slug', slug)
      .single();
    
    return { data: data as Classified | null, error };
  }

  async create(userId: string, payload: Partial<Classified>) {
    const checkUniqueness = async (slug: string) => {
      const { count } = await this.supabase
        .from('classifieds')
        .select('*', { count: 'exact', head: true })
        .eq('city_id', payload.city_id)
        .eq('type', payload.type)
        .eq('slug', slug);
      return count === 0;
    };

    const slug = await generateUniqueSlug(payload.title!, checkUniqueness);
    
    const { data, error } = await this.supabase
      .from('classifieds')
      .insert([{ ...payload, user_id: userId, slug }])
      .select()
      .single();

    return { data, error };
  }

  async delete(userId: string, id: string) {
    const { error } = await this.supabase
      .from('classifieds')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    return { error };
  }
}
