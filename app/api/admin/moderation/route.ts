
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireUser } from '@/lib/supabase/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    // TODO: Adicionar checagem de role de admin no profile
    const supabase = createClient();
    
    const { data: addRequests } = await supabase.from('business_add_requests').select('*').eq('status', 'pending');
    const { data: claims } = await supabase.from('business_claims').select('*').eq('status', 'pending');
    
    return NextResponse.json({ 
      ok: true, 
      data: { addRequests, claims } 
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 403 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const { id, type, status } = body; // type: 'claim' | 'add'
    
    const supabase = createClient();
    const table = type === 'claim' ? 'business_claims' : 'business_add_requests';
    
    const { data, error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id)
      .select()
      .single();
      
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 403 });
  }
}
