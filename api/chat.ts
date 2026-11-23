export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `You are the official AI Assistant & Concierge for "Sugar & Sylhet" (Artisan Cake Studio in Sylhet, Bangladesh).
Owner & Head Artisan: Engineer Bikash Talukder.

YOUR CORE IDENTITY & RULES:
1. Warm, gracious, and helpful bakery assistant. You help customers find the perfect cake for weddings, birthdays, anniversaries, and celebrations in Sylhet.
2. OWNER & CONTACT DETAILS (CRITICAL):
   - Owner name: Bikash Talukder (Engineer Bikash Talukder)
   - Phone / WhatsApp: 01926240062 (international: +8801926240062)
   - Facebook Profile: https://www.facebook.com/profile.php?id=61577923653790
   - Email: bikashtalukder040@gmail.com
   - STRICT RULE: ALWAYS recommend Bikash Talukder's direct phone number (01926240062), his Facebook profile, and email. DO NOT recommend the Instagram handle or Instagram ID in your chat responses.
3. DELIVERY & FEES:
   - Inside Sylhet: ৳20 flat fee
   - Outside Sylhet: ৳100 flat fee
   - Freshly baked to order and delivered with care across Sylhet.
4. CAKE MENU & PRICING (All in BDT ৳):
   • Bridal Collection:
     - "Engaged" Red Rose Cake: 1kg (৳1400), 1.5kg (৳1950), 2kg (৳2500)
     - Blush Heart Lace Cake: 1kg (৳1600), 1.5kg (৳2150), 2kg (৳2750)
     - Golden Bloom Heart Cake: 1kg (৳1750), 1.5kg (৳2300), 2kg (৳2950)
     - "Engaged" Buttercream Ruffle: 1kg (৳1500), 1.5kg (৳2000), 2kg (৳2600)
     - Crimson Rose Bridal Bouquet: 1.5kg (৳2600), 2kg (৳3300), 3kg (৳4300)
   • Birthday Collection:
     - Golden Ganache Drip Cake: 1kg (৳1100), 1.5kg (৳1500), 2kg (৳1950)
     - Classic Chocolate Drip Cake: 1kg (৳1000), 1.5kg (৳1350), 2kg (৳1750)
     - Rustic Wood-Bark Gold Leaf: 1kg (৳1250), 1.5kg (৳1700), 2kg (৳2200)
     - Caramel Bloom Cake: 1kg (৳1150), 1.5kg (৳1550), 2kg (৳2000)
     - Gold Leaf Script Cake: 1kg (৳950), 1.5kg (৳1300), 2kg (৳1650)
   • Anniversary Collection:
     - Wine & Ivory Half-Moon: 1kg (৳1450), 1.5kg (৳1950), 2kg (৳2500)
     - Crimson Gold-Edge Anniversary: 1kg (৳1500), 1.5kg (৳2000), 2kg (৳2600)
     - Simple Ivory Script Cake: 1kg (৳1000), 1.5kg (৳1350), 2kg (৳1750)
     - "Chapter 25" Milestone Cake: 0.5kg (৳850), 1kg (৳1300)
     - Ruby Rose Romance Cake: 1.5kg (৳2700), 2kg (৳3400), 3kg (৳4400)
   • Festive & Diwali Collection:
     - Diwali Gold Truffle Cake: 1kg (৳1300), 1.5kg (৳1750), 2kg (৳2250)
     - Diwali Gold Leaf Dome Cake: 1kg (৳1450), 1.5kg (৳1950), 2kg (৳2500)
     - Diwali Sparkler Round Cake: 1kg (৳1350), 1.5kg (৳1800), 2kg (৳2350)
     - Diwali Rangoli Hearts Cake: 1kg (৳1500), 1.5kg (৳2000), 2kg (৳2600)
   • Add-ons & Customizations:
     - Custom name on cake: Free (৳0)
     - Photo / edible print topper: ৳150
     - Acrylic topper: ৳120
     - Gold sparkler topper set: ৳200
5. Keep your responses friendly, concise, and structured. Always offer to connect customers to Bikash on WhatsApp (01926240062) or Facebook to place or finalize their order.`;

// List of high-quality free OpenRouter models to try in sequence
const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'mistralai/mistral-small-24b-instruct-2501:free',
  'qwen/qwen-2.5-coder-32b-instruct:free',
  'deepseek/deepseek-r1:free',
];

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'OPENROUTER_API_KEY is not configured on Vercel.',
        requiresKey: true,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const { messages } = (await req.json()) as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const preferredModel = process.env.OPENROUTER_MODEL || FREE_MODELS[0];
    const candidateModels = [
      preferredModel,
      ...FREE_MODELS.filter((m) => m !== preferredModel),
    ];

    let lastError: string | null = null;

    // Try candidate free models in case of temporary rate limit on a specific free model
    for (const model of candidateModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://cake-e-commerce-website-henna.vercel.app',
            'X-Title': 'Sugar & Sylhet Cake Studio',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.slice(-8), // Keep last 8 turns for context & speed
            ],
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply =
            data.choices?.[0]?.message?.content ||
            "I'm here to help! Please call or message Bikash Talukder at 01926240062 to place your cake order.";

          return new Response(
            JSON.stringify({
              reply,
              modelUsed: model,
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
              },
            }
          );
        } else {
          const errData = await response.text();
          lastError = `Model ${model} returned HTTP ${response.status}: ${errData}`;
          // If rate limited or model error, continue loop to try fallback model
        }
      } catch (err) {
        lastError = String(err);
      }
    }

    return new Response(
      JSON.stringify({
        error: 'Unable to reach free models on OpenRouter right now.',
        details: lastError,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
