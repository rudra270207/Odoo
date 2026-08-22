import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
      return NextResponse.redirect(`${siteUrl}${next}`);
    }
  }

  // Return user to login on error
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
  return NextResponse.redirect(`${siteUrl}/login?error=Invalid%20Auth%20Code`);
}
