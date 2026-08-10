export default async function handler(req, res) {
if (req.method !== "GET") {
return res.status(405).json({
error: "Method not allowed"
});
}

const orderId = req.query.orderId;

if (!orderId) {
return res.status(400).json({
error: "Order ID is required"
});
}

return res.status(200).json({
success: true,
orderId: orderId,
status: "PENDING_PROVIDER",
message: "Waiting for provider connection."
});
}
