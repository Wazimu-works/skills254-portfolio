import { serverEnv } from "@/lib/env";
import { normalizeKenyanPhone } from "@/lib/validation";

const baseUrls = {
  sandbox: "https://sandbox.safaricom.co.ke",
  production: "https://api.safaricom.co.ke",
};

function getTimestamp() {
  const now = new Date();
  const parts = [
    now.getFullYear(),
    `${now.getMonth() + 1}`.padStart(2, "0"),
    `${now.getDate()}`.padStart(2, "0"),
    `${now.getHours()}`.padStart(2, "0"),
    `${now.getMinutes()}`.padStart(2, "0"),
    `${now.getSeconds()}`.padStart(2, "0"),
  ];
  return parts.join("");
}

async function getAccessToken() {
  if (!serverEnv.MPESA_CONSUMER_KEY || !serverEnv.MPESA_CONSUMER_SECRET) {
    throw new Error("Missing M-Pesa consumer credentials.");
  }

  const auth = Buffer.from(
    `${serverEnv.MPESA_CONSUMER_KEY}:${serverEnv.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  const response = await fetch(
    `${baseUrls[serverEnv.MPESA_ENV]}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get M-Pesa access token.");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export async function sendStkPush({
  phone,
  amount,
  accountReference,
  description,
}: {
  phone: string;
  amount: number;
  accountReference: string;
  description: string;
}) {
  if (
    !serverEnv.MPESA_SHORTCODE ||
    !serverEnv.MPESA_PASSKEY ||
    !serverEnv.MPESA_CALLBACK_URL
  ) {
    return {
      mock: true,
      MerchantRequestID: `mock-${Date.now()}`,
      CheckoutRequestID: `mock-checkout-${Date.now()}`,
      ResponseCode: "0",
      ResponseDescription: "Mock STK Push initiated.",
      CustomerMessage: "Mock STK Push initiated. Configure Daraja credentials to go live.",
    };
  }

  const timestamp = getTimestamp();
  const password = Buffer.from(
    `${serverEnv.MPESA_SHORTCODE}${serverEnv.MPESA_PASSKEY}${timestamp}`,
  ).toString("base64");
  const token = await getAccessToken();

  const response = await fetch(
    `${baseUrls[serverEnv.MPESA_ENV]}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: serverEnv.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: normalizeKenyanPhone(phone),
        PartyB: serverEnv.MPESA_SHORTCODE,
        PhoneNumber: normalizeKenyanPhone(phone),
        CallBackURL: serverEnv.MPESA_CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: description,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`STK Push failed: ${errorBody}`);
  }

  return response.json();
}
