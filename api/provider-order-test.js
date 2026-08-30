export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  const { service, quantity, link } = req.body || {};

  if (!service || !quantity || !link) {
    return res.status(400).json({
      success: false,
      error: "Missing service, quantity, or link"
    });
  }

  const orderId =
    "RK-" + Date.now().toString().slice(-6);

  return res.status(200).json({
    success: true,
    orderId: orderId,
    status: "PENDING",
    service: service,
    quantity: quantity,
    link: link
  });
}
