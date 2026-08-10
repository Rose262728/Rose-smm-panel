export default async function handler(req, res) { if (req.method !== "POST") { return res.status(405).json({ error: "Method not allowed" }); }
try { const { name, link, country, service, quantity } = req.body;
if (!name || !link || !country || !service || !quantity) {
  return res.status(400).json({
    error: "Missing order information"
  });
}

const orderId =
  "RK-" + Date.now().toString().slice(-6);

const status = "Pending";

const message =
  `📩 New RK Digital Order\n\n` +
  `🆔 Order ID: ${orderId}\n` +
  `📊 Status: ${status}\n` +
  `👤 Name: ${name}\n` +
  `🌍 Country: ${country}\n` +
  `🔗 Link: ${link}\n` +
  `📌 Service: ${service}\n` +
  `🔢 Quantity: ${quantity}`;

const telegramUrl =
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

const response = await fetch(telegramUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: message
  })
});

if (!response.ok) {
  return res.status(500).json({
    error: "Telegram notification failed"
  });
}

return res.status(200).json({
  success: true,
  orderId: orderId,
  status: status,
  country: country
});
} catch (error) { return res.status(500).json({ error: "Server error" }); } }
