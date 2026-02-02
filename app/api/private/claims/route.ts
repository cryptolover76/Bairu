
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/auth';
import { ClaimService } from '@/lib/domain/claims';
import { z } from 'zod';

const ClaimSchema = z.object({
  business_id: z.string().uuid(),
  details: z.string().min(10)
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { business_id, details } = ClaimSchema.parse(body);
    
    const supabase = createClient();
    const service = new ClaimService(supabase);
    const { data, error } = await service.create(user.id, business_id, details);
    
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
}
