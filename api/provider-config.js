export const PROVIDER = {
  name: "SMMValy",
  apiUrl: "https://smmvaly.com/api/v2",
  apiKey: "e6f4bf6d1e779574a2deec8f8e9c2a36"
};

// --- TELEGRAM ALERT ---
export const TELEGRAM = {
  botToken:8955708822:AAG5YzaswXH78ci5u652WPrRBUB3Ij1rijM
  chatId:8592192841
};

export async function sendTelegramNotification(order) {
  const { botToken, chatId } = TELEGRAM;
  const text = `📩 BAGONG ORDER!
🔗 Link: ${order.link}
🔢 Dami: ${order.quantity}`;

  return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({chat_id: chatId, text: text})
  });
}

export async function createProviderOrder(order) {
  const { apiUrl, apiKey } = PROVIDER;

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('action', 'add');
  formData.append('service', order.serviceId);
  formData.append('link', order.link);
  formData.append('quantity', order.quantity);

  try {
    const res = await fetch(apiUrl, { method: 'POST', body: formData });
    const data = await res.json();

    if (data.order) {
      
      await sendTelegramNotification(order);

      return {
        success: true,
        status: "PENDING",
        providerOrderId: String(data.order),
        message: "✅ Order naipadala! Nakatanggap ka sa Telegram.",
        order: order
      };
    } else {
      return {
        success: false,
        message: data.error || "❌ Hindi nagawa",
        order: order
      };
    }
  } catch (err) {
    return { 
      success: false, 
      message: "Koneksyon mali: " + err.message, 
      order: order 
    };
  }
}
