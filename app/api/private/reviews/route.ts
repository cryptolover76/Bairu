
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/auth';
import { ReviewService } from '@/lib/domain/reviews';
import { ReviewSchema } from '@/lib/validation/schemas';

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const validated = ReviewSchema.parse(body);
    
    const supabase = createClient();
    const service = new ReviewService(supabase);
    const { data, error } = await service.create(user.id, validated);
    
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
