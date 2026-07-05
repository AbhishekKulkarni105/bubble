/** Prospect detail domain model — demo data mirroring the Vayga prospect screen. */

export interface ProspectDetail {
  id: string;
  company: string;
  dba: string;
  dot: string;
  mc: string;
  established: string;
  legalEntity: string;
  carrierType: string;
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
export function getProspect(id: string): ProspectDetail {
  return {
    id,
    company: "Vlad test",
    dba: "Testing form CA",
    dot: "1234567890",
    mc: "987654321",
    established: "",
    legalEntity: "LLC",
    carrierType: "Common",
    lineOfBusiness: "Comm Auto",
    owner: {
      firstName: "",
      middleName: "",
      lastName: "",
      ssn: "",
      dob: "",
    },
    companyAddress: "",
    ownerAddress: "",
    companyPhones: [],
    companyEmails: [],
    ownerPhones: [],
    ownerEmails: [],
  };
}

export const PROSPECT_TABS = [
  "General",
  "Drivers",
  "Vehicles",
  "Quotes",
  "Policies",
] as const;

export type ProspectTab = (typeof PROSPECT_TABS)[number];
