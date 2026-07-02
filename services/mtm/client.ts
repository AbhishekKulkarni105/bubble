import axios from "axios";

/** MTM carrier rating client (server-only). Replaces the Bubble "API MTM" connector. */
export const mtmClient = axios.create({
  baseURL: process.env.MTM_API_BASE_URL,
  headers: { Authorization: `Bearer ${process.env.MTM_API_KEY}` },
});

export async function requestFullQuote(payload: unknown) {
  const { data } = await mtmClient.post("/quote/full", payload);
  return data;
}
