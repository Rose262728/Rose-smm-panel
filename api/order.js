import { createProviderOrder } from "./provider.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { name, link, country, service, quantity } = req.body || {};

    if (!name || !link || !country || !service || !quantity) {
      return res.status(400).json({
        error: "Missing order information"
      });
    }

    const orderId =
      "RK-" + Date.now().toString().slice(-6);

    const order = {
      orderId,
      name,
      link,
      country,
      service,
      quantity,
      status: "Pending"
    };

    const providerResult =
      await createProviderOrder(order);

    return res.status(200).json({
      success: true,
      orderId,
      status: providerResult.status,
      providerMessage: providerResult.message
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error"
    });
  }
}
