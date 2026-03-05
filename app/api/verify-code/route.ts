import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Check if code exists
    const { data, error } = await supabase
      .from('access_codes')
      .select('id')
      .eq('code', code)
      .maybeSingle()

    if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({ valid: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Error verifying code:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
