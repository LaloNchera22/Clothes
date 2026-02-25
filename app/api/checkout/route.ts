import { NextResponse } from 'next/server'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

// Using a standard version string, cast to any to avoid TS errors with newer/older definitions
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any,
  typescript: true,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product } = body

    if (product !== 'BEANIE-01') {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'BEANIE-01',
              description: 'Grants Access to The Archive',
            },
            unit_amount: 2000, // $20.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
      metadata: {
        product_code: 'BEANIE-01',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Error creating checkout session:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
