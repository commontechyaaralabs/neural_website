import { NextRequest, NextResponse } from 'next/server';

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // First check if user is already subscribed
    try {
      const encodedEmail = encodeURIComponent(email);
      const checkResponse = await fetch(
        `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions/by_email/${encodedEmail}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          },
        }
      );

      if (checkResponse.ok) {
        return NextResponse.json(
          { error: "You're already subscribed! Thank you for being part of TheNeural community." },
          { status: 409 }
        );
      }
    } catch (checkError) {
      // If check fails, continue with subscription attempt
      console.log('Check subscription failed, proceeding with subscription:', checkError);
    }

    // Create new subscription
    const subscribeResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: false
        }),
      }
    );

    if (subscribeResponse.ok) {
      const data = await subscribeResponse.json();
      return NextResponse.json({ success: true, data });
    } else {
      const errorData = await subscribeResponse.json();
      return NextResponse.json(
        { error: errorData.message || 'Subscription failed. Please try again.' },
        { status: subscribeResponse.status }
      );
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Network error. Please check your connection and try again.' },
      { status: 500 }
    );
  }
}
