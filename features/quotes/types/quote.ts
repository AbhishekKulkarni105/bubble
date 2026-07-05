/** Quote detail domain model — demo data mirroring the Vayga quote screen. */

export interface QuoteSummaryField {
  label: string;
  value: string;
  /** Renders the value in the selected/not-selected accent colors. */
  tone?: "ok" | "bad";
}

export interface QuotePremiumRow {
  label: string;
  value: string;
}

export interface QuoteDriver {
  names: string;
  age: string;
  state: string;
  licenseNumber: string;
  licenseClass: string;
  licenseIssueDate: string;
  violations: string;
  owner: string;
}

export interface QuoteVehicle {
  vin: string;
  year: string;
  type: string;
  make: string;
  physicalDamage: string;
  operatingRadius: string;
  teamDriver: string;
}

export interface QuoteDetail {
  quoteId: string;
  proposal: string;
  insured: string;
  dba: string;
  state: string;
  agency: string;
  submittedAgo: string;
  estimate: string;
  totalAmount: string;
  downPayment: string;
  payments: string;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
  effectiveDate: string;
  expirationDate: string;
  summaryFields: QuoteSummaryField[];
  premiums: QuotePremiumRow[];
  drivers: QuoteDriver[];
  vehicles: QuoteVehicle[];
  json: {
    dateCreated: string;
    internalQuoteId: string;
    payload: string;
  };
}

/** Static demo record — the [id] is threaded through so the URL and screen agree. */
export function getQuote(id: string): QuoteDetail {
  return {
    quoteId: id,
    proposal: "PCA0000034786",
    insured: "Vlad test",
    dba: "Testing form CA",
    state: "Alabama",
    agency: "Morpheus Ins",
    submittedAgo: "Submitted 38 days ago",
    estimate: "$18,109.60",
    totalAmount: "$18,109.60",
    downPayment: "N/A",
    payments: "N/A",
    owner: {
      name: "Dobri test",
      email: "dobrinski+t1@gmail.com",
      phone: "7735566777",
    },
    effectiveDate: "August 15, 2025",
    expirationDate: "August 15, 2026",
    summaryFields: [
      { label: "Company Name", value: "Vlad test" },
      { label: "DBA", value: "Testing form CA" },
      { label: "Owner Names", value: "Dobri test" },
      { label: "Email Owner", value: "dobrinski+t1@gmail.com" },
      { label: "Phone Owner", value: "7735566777" },
      { label: "Year Established", value: "N/A" },
      { label: "Owner`s Experience", value: "0" },
      { label: "DOT Number", value: "N/A" },
      { label: "MC Number", value: "N/A" },
      { label: "Legal Entity", value: "LLC" },
      { label: "Trucking Company Type", value: "Common" },
      { label: "State Insured", value: "Alabama" },
      { label: "Address Insured", value: "N/A" },
      { label: "City Insured", value: "N/A" },
      { label: "County Insured", value: "N/A" },
      { label: "ZIP Code Insured", value: "N/A" },
      { label: "Effective Date", value: "August 15, 2025" },
      { label: "Expiration Date", value: "August 15, 2026" },
      { label: "Liability Limit", value: "$1,000,000" },
      { label: "General Liability", value: "Selected", tone: "ok" },
      { label: "Personal Injury Protection", value: "Not selected", tone: "bad" },
      { label: "Auto Medical Payments", value: "Not selected", tone: "bad" },
      { label: "Un/Under Ins Motorist", value: "Selected", tone: "ok" },
      { label: "UIIA", value: "Selected", tone: "ok" },
      { label: "Medical Coverage", value: "Not selected", tone: "bad" },
      { label: "Medical Pay Limits", value: "Not selected", tone: "bad" },
      { label: "PIP Coverage", value: "Not selected", tone: "bad" },
      { label: "PIP Limits", value: "Not selected", tone: "bad" },
      { label: "UM Coverage", value: "UM 10 - UM-UIM BI" },
      { label: "UM Limits", value: "$1,000,000" },
      { label: "UII Endorsement", value: "Less than 5 vehicles" },
      { label: "Has Terminal", value: "No" },
      { label: "Commodity 1", value: "Meat" },
      { label: "Commodity 2", value: "Refrigerated Food" },
      { label: "Processing Fee", value: "$0.00" },
    ],
    premiums: [
      { label: "AL Premium", value: "$13,635.00" },
      { label: "GL Premium", value: "$500.00" },
      { label: "Med Premium", value: "N/A" },
      { label: "PIP Premium", value: "N/A" },
      { label: "Hired Auto Premium", value: "N/A" },
      { label: "Non Owned Premium", value: "N/A" },
      { label: "UII Endorsement Premium", value: "$500.00" },
      { label: "UM Premium", value: "$675.00" },
      { label: "Policy Fee", value: "$1,837.20" },
      { label: "Capitalization", value: "$350.00" },
      { label: "Domicile Tax", value: "$612.40" },
      { label: "State Tax", value: "$0.00" },
    ],
    drivers: [
      {
        names: "—",
        age: "56",
        state: "N/A",
        licenseNumber: "N/A",
        licenseClass: "Commercial",
        licenseIssueDate: "N/A",
        violations: "0",
        owner: "No",
      },
    ],
    vehicles: [
      {
        vin: "1HWRETGFEDGT1111T",
        year: "2001",
        type: "Truck Tractor",
        make: "Kenworth",
        physicalDamage: "No",
        operatingRadius: "Long Class",
        teamDriver: "No",
      },
    ],
    json: {
      dateCreated: "May 28, 2026",
      internalQuoteId: "1779956273156x813144632159006000",
      payload: "null",
    },
  };
}

export const QUOTE_TABS = [
  "Summary",
  "Drivers",
  "Vehicles",
  "Upload Files",
  "Application Form",
  "Json",
] as const;

export type QuoteTab = (typeof QUOTE_TABS)[number];
