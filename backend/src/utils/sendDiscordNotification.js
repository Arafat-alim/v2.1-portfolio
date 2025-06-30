const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
console.log('🚀 ~ DISCORD_WEBHOOK_URL:', DISCORD_WEBHOOK_URL);

async function sendDiscordNotification(type, data) {
  if (!DISCORD_WEBHOOK_URL) return;

  try {
    let embed;

    if (type === 'visitor') {
      embed = {
        title: '🚀 New Portfolio Visitor!',
        color: 0x3b82f6,
        fields: [
          {
            name: 'Timestamp',
            value: new Date(data.timestamp).toLocaleString(),
            inline: true,
          },
          {
            name: 'Referrer',
            value: data.referrer || 'Direct',
            inline: true,
          },
          {
            name: 'User Agent',
            value: data.userAgent.substring(0, 100) + '...',
            inline: false,
          },
        ],
        footer: {
          text: 'Portfolio Analytics',
        },
        timestamp: new Date().toISOString(),
      };
    } else if (type === 'contact') {
      embed = {
        title: '📧 New Contact Message!',
        color: 0x10b981,
        fields: [
          {
            name: 'From',
            value: `${data.name} (${data.email})`,
            inline: false,
          },
          {
            name: 'Subject',
            value: data.subject,
            inline: false,
          },
          {
            name: 'Message',
            value:
              data.message.substring(0, 500) +
              (data.message.length > 500 ? '...' : ''),
            inline: false,
          },
          {
            name: 'Timestamp',
            value: new Date().toLocaleString(),
            inline: true,
          },
        ],
        footer: {
          text: 'Portfolio Contact Form',
        },
        timestamp: new Date().toISOString(),
      };
    }

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}

export { sendDiscordNotification };
