import { processPayment } from "./yocoBackend";

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { token, amountInCents, currency } = req.body;

  try {
    const paymentResponse = await processPayment(
      token,
      amountInCents,
      currency
    );
    res.status(200).json({ message: "Payment processed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment." });
  }
}
