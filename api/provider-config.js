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
      return {
        success: true,
        status: "PENDING",
        providerOrderId: String(data.order),
        message: "✅ Order naipadala!",
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
    return { success: false, message: "Koneksyon mali: " + err.message, order: order };
  }
}

  name: "SMMValy",
  apiUrl: "https://smmvaly.com/api/v2",
  apiKey:e6f4bf6d1e779574a2deec8f8e9c2a36
};
