/** Insured detail domain model — demo data mirroring the Vayga insured screen. */

export interface InsuredDetail {
  id: string;
  company: string;
  dba: string;
  dot: string;
  mc: string;
  established: string;
  legalEntity: string;
  carrierType: string;
  state: string;
  lineOfBusiness: string;
  owner: {
    firstName: string;
    middleName: string;
    lastName: string;
    ssn: string;
    dob: string;
  };
  companyAddress: string;
  ownerAddress: string;
  companyPhones: string[];
  companyEmails: string[];
  ownerPhones: string[];
  ownerEmails: string[];
}

/** Static demo record — the [id] is threaded through so the URL and screen agree. */
export function getInsured(id: string): InsuredDetail {
  return {
    id,
    company: "Vlad test",
    dba: "Testing form CA",
    dot: "1234567890",
    mc: "987654321",
    established: "",
    legalEntity: "LLC",
    carrierType: "Common",
    state: "Alabama",
    lineOfBusiness: "Comm Auto",
    owner: {
      firstName: "Dobri",
      middleName: "",
      lastName: "test",
      ssn: "",
      dob: "",
    },
    companyAddress: "",
    ownerAddress: "",
    companyPhones: ["(773) 556-6777"],
    companyEmails: ["dobrinski+t1@gmail.com"],
    ownerPhones: [],
    ownerEmails: [],
  };
}

export const INSURED_TABS = [
  "General",
  "Drivers",
  "Vehicles",
  "Quotes",
  "Policies",
] as const;

export type InsuredTab = (typeof INSURED_TABS)[number];
