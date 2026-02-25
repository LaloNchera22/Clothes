import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/utils/supabase/server'
import crypto from 'crypto'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any, // Standard version
  typescript: true,
})

const resend = new Resend(process.env.RESEND_API_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    if (!sig || !endpointSecret) throw new Error('Missing signature or secret')
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Check metadata for product code.
    // We assume the checkout creation process adds this metadata.
    const productCode = session.metadata?.product_code

    if (productCode === 'BEANIE-01') {
      const customerEmail = session.customer_details?.email

      if (customerEmail) {
        // Generate 2 unique codes (6 chars each)
        const code1 = crypto.randomBytes(3).toString('hex').toUpperCase()
        const code2 = crypto.randomBytes(3).toString('hex').toUpperCase()

        try {
          const supabase = getSupabaseAdmin()

          // Insert codes into Supabase
          const { error: dbError } = await supabase.from('access_codes').insert([
            { code: code1, email: customerEmail, status: 'unused' },
            { code: code2, email: customerEmail, status: 'unused' },
          ])

          if (dbError) {
            console.error('Supabase error:', dbError)
            return NextResponse.json({ error: 'Database error' }, { status: 500 })
          }

          // Send Email via Resend
          if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
              from: '0xBAD <noreply@0xbad.com>', // Requires verified domain in Resend dashboard
              to: [customerEmail],
              subject: 'ACCESS GRANTED: 0xBAD ARCHIVE',
              html: `
                <div style="font-family: monospace; background: #fff; color: #000; padding: 20px; border: 1px solid #000;">
                  <h1 style="margin-bottom: 20px;">PURCHASE CONFIRMED</h1>
                  <p>ITEM: BEANIE-01</p>
                  <p>YOUR ACCESS CODES:</p>
                  <ul style="list-style: none; padding: 0; margin: 20px 0;">
                    <li style="font-size: 24px; font-weight: bold; margin: 10px 0; border: 1px solid #000; display: inline-block; padding: 10px;">${code1}</li>
                    <br/>
                    <li style="font-size: 24px; font-weight: bold; margin: 10px 0; border: 1px solid #000; display: inline-block; padding: 10px;">${code2}</li>
                  </ul>
                  <p>ENTER THESE CODES ON THE SITE TO UNLOCK THE RESTRICTED ARCHIVE.</p>
                  <p>DO NOT SHARE.</p>
                </div>
              `,
            })
          } else {
             console.warn('RESEND_API_KEY not found, skipping email sending')
          }
        } catch (err) {
            console.error('Error processing webhook action:', err)
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
