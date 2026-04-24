export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const DC = API_KEY.split('-')[1]; // e.g. "us10"

  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['onekyc-waitlist'],
      }),
    });

    const data = await response.json();

    // Already subscribed is fine
    if (response.ok || data.title === 'Member Exists') {
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: data.detail || 'Subscription failed' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
