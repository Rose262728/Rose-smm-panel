export default async function handler(req, res) {
  const { service, quantity, link } =
    req.method === "GET"
      ? req.query || {}
      : req.body || {};

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
