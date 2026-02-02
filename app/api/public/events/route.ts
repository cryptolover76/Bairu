
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ClassifiedService } from '@/lib/domain/classifieds';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city_id = searchParams.get('city_id') || undefined;
  const slug = searchParams.get('slug') || undefined;

  const supabase = createClient();
  const service = new ClassifiedService(supabase);

  if (slug && city_id) {
    const { data, error } = await service.getBySlug(city_id, 'event', slug);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
    return NextResponse.json({ ok: true, data });
  }

  const { data, error } = await service.list({ city_id, type: 'event' });
  
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
