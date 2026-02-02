
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ClassifiedService } from '@/lib/domain/classifieds';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city_id = searchParams.get('city_id') || undefined;
  const category_id = searchParams.get('category_id') || undefined;
  const type = searchParams.get('type') || undefined;
  const slug = searchParams.get('slug') || undefined;

  const supabase = createClient();
  const service = new ClassifiedService(supabase);

  if (slug && city_id && type) {
    const { data, error } = await service.getBySlug(city_id, type, slug);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
    return NextResponse.json({ ok: true, data });
  }

  const { data, error } = await service.list({ city_id, category_id, type });
  
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
