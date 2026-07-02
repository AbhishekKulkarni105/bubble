import axios from "axios";

/**
 * NowCerts AMS client (server-only). Replaces the Bubble "API NowCerts" connector (18 calls).
 * Handles OAuth token + refresh; used by the sync jobs.
 */
export const nowcertsClient = axios.create({
  baseURL: "https://api.nowcerts.com",
});

// TODO: token cache + refresh, insureds/drivers/vehicles/policies/notes sync methods.
