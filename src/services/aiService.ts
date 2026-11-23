import { CAKES, BRAND, DELIVERY_FEE_INSIDE, DELIVERY_FEE_OUTSIDE, BIRTHDAY_ADDONS } from '../data/cakes';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const OWNER_INFO = {
  name: 'Bikash Talukder (Engineer Bikash Talukder)',
  phone: '01926240062',
  phoneE164: '+8801926240062',
  facebook: 'https://www.facebook.com/profile.php?id=61577923653790',
  email: 'bikashtalukder040@gmail.com',
};

/**
 * Intelligent client-side fallback knowledge engine in case the Vercel OPENROUTER_API_KEY
 * is not yet configured or OpenRouter free tier hits a temporary network timeout.
 */
function generateLocalKnowledgeReply(query: string): string {
  const q = query.toLowerCase();

  // Contact or owner queries
  if (
    q.includes('owner') ||
    q.includes('who made') ||
    q.includes('bikash') ||
    q.includes('contact') ||
    q.includes('call') ||
    q.includes('phone') ||
    q.includes('number') ||
    q.includes('facebook') ||
    q.includes('email') ||
    q.includes('order now')
  ) {
    return (
      `The owner and head artisan of Sugar & Sylhet is **${OWNER_INFO.name}**.\n\n` +
      `You can reach Bikash directly via:\n` +
      `• **Phone / WhatsApp**: [${OWNER_INFO.phone}](tel:${OWNER_INFO.phoneE164}) (or WhatsApp [Chat](https://wa.me/${BRAND.whatsappE164}))\n` +
      `• **Facebook**: [facebook.com/bikash.talukder](${OWNER_INFO.facebook})\n` +
      `• **Email**: [${OWNER_INFO.email}](mailto:${OWNER_INFO.email})\n\n` +
      `Feel free to message or call to discuss custom designs, themes, and delivery times!`
    );
  }

  // Delivery query
  if (q.includes('delivery') || q.includes('fee') || q.includes('shipping') || q.includes('cost')) {
    return (
      `**Delivery in Sylhet:**\n` +
      `• **Inside Sylhet**: ৳${DELIVERY_FEE_INSIDE} flat delivery fee.\n` +
      `• **Outside Sylhet**: ৳${DELIVERY_FEE_OUTSIDE} flat delivery fee.\n\n` +
      `All cakes are freshly baked and hand-delivered with care. To arrange delivery, contact Bikash Talukder at **${OWNER_INFO.phone}** or via [Facebook](${OWNER_INFO.facebook}).`
    );
  }

  // Bridal cakes
  if (q.includes('bridal') || q.includes('wedding') || q.includes('engagement') || q.includes('marry')) {
    const bridalCakes = CAKES.filter((c) => c.category === 'bridal');
    const list = bridalCakes
      .map((c) => `• **${c.name}**: guide price from ৳${c.weights[0].price} (${c.weights[0].weight}kg)`)
      .join('\n');
    return (
      `Here are our signature **Bridal & Engagement Cakes**:\n\n${list}\n\n` +
      `💡 **Price Note**: No price is fixed here! All prices are negotiable. You can negotiate directly with owner **Bikash Talukder** at [${OWNER_INFO.phone}](tel:${OWNER_INFO.phoneE164}) to fit your wedding budget!`
    );
  }

  // Birthday cakes
  if (q.includes('birthday') || q.includes('birth') || q.includes('kids')) {
    const bdayCakes = CAKES.filter((c) => c.category === 'birthday');
    const list = bdayCakes
      .map((c) => `• **${c.name}**: guide price ৳${c.weights[0].price} (${c.weights[0].weight}kg)`)
      .join('\n');
    return (
      `Here are our handcrafted **Birthday Cakes**:\n\n${list}\n\n` +
      `**Add-ons:** Custom name (Free), Edible photo print (৳150), Acrylic topper (৳120).\n\n` +
      `💡 **Price Note**: None of our prices are fixed — you can negotiate directly with owner **Bikash Talukder** at [${OWNER_INFO.phone}](tel:${OWNER_INFO.phoneE164}) or [Facebook](${OWNER_INFO.facebook}) to match your exact budget!`
    );
  }

  // Anniversary cakes
  if (q.includes('anniversary') || q.includes('romantic') || q.includes('milestone')) {
    const anniCakes = CAKES.filter((c) => c.category === 'anniversary');
    const list = anniCakes
      .map((c) => `• **${c.name}**: guide price from ৳${c.weights[0].price}`)
      .join('\n');
    return (
      `Celebrate your special moments with our **Anniversary Cakes**:\n\n${list}\n\n` +
      `💡 **Price Note**: No price is fixed! You can negotiate directly with owner **Bikash Talukder** at [${OWNER_INFO.phone}](tel:${OWNER_INFO.phoneE164}) or [Facebook](${OWNER_INFO.facebook})!`
    );
  }

  // General recommendation
  return (
    `Welcome to **Sugar & Sylhet**! Handcrafted artisan cakes in Sylhet, curated by **${OWNER_INFO.name}**.\n\n` +
    `We specialize in **Bridal, Birthday, Anniversary, and Festive/Diwali Cakes** starting from ৳850.\n\n` +
    `✨ **Important**: None of our prices are fixed! All prices are negotiable directly with Bikash Talukder.\n\n` +
    `How to reach us & negotiate:\n` +
    `• **Direct Phone / WhatsApp**: [${OWNER_INFO.phone}](tel:${OWNER_INFO.phoneE164})\n` +
    `• **Facebook**: [Bikash Talukder Profile](${OWNER_INFO.facebook})\n` +
    `• **Email**: [${OWNER_INFO.email}](mailto:${OWNER_INFO.email})\n\n` +
    `What occasion are you celebrating today?`
  );
}

/**
 * Sends messages to OpenRouter through our serverless /api/chat endpoint on Vercel.
 */
export async function sendChatMessage(messages: ChatMessage[]): Promise<{ reply: string; isFallback?: boolean }> {
  try {
    const formatted = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: formatted }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return { reply: data.reply };
      }
      if (data.requiresKey) {
        // API key not yet set in Vercel environment variables, use our smart knowledge base + helpful hint
        const lastQuery = messages[messages.length - 1]?.content || '';
        const smartAnswer = generateLocalKnowledgeReply(lastQuery);
        return {
          reply:
            smartAnswer +
            `\n\n*(💡 Setup Note: You can also add your \`OPENROUTER_API_KEY\` in your Vercel Project Settings > Environment Variables to unlock live multi-model generative responses).*`,
          isFallback: true,
        };
      }
    }
  } catch (error) {
    console.warn('API call to /api/chat had an error, using local knowledge engine:', error);
  }

  // Fallback to client-side bakery knowledge engine
  const lastQuery = messages[messages.length - 1]?.content || '';
  return {
    reply: generateLocalKnowledgeReply(lastQuery),
    isFallback: true,
  };
}
