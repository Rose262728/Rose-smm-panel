export default function handler(req, res) {
  return res.status(200).json({
    success: true,
    provider: "RK Digital API",
    status: "ONLINE",
    message: "Our API is working."
  });
}
