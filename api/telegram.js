export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const update = req.body;

    const message = update?.message?.text;
    const chatId = update?.message?.chat?.id;

    if (!message || !chatId) {
      return res.status(200).json({
        success: true,
        message: "No message to process"
      });
    }

    const reply =
      `🤖 Rose Panel Bot\n\n` +
      `Natanggap ko: ${message}`;

    const telegramUrl =
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    });

    if (!response.ok) {
      return res.status(500).json({
        error: "Telegram reply failed"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
          }
