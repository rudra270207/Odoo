import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tripId = 'trip-1', tripName = 'Amalfi Coast Dream', amount = 150 } = body;

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

    // Create Stripe Checkout Session in TEST MODE
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Trip Deposit & Premium Itinerary Unlock: ${tripName}`,
              description: `Secure booking reservation and unlock detailed daily route maps for ${tripName}.`,
            },
            unit_amount: Math.round(Number(amount) * 100), // convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/trips/${tripId}/itinerary?paid=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/trips/${tripId}/build?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Session Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
