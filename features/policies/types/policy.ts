/** Policy detail domain model — demo data mirroring the Vayga policy screen. */

export interface PolicyMoney {
  totalAmount: string;
  premium: string;
  installmentAmount: string;
  taxes: string;
  fees: string;
  commission: string;
}

export interface PolicyCoverage {
  title: string;
  label: string;
  value: string;
}

export interface PolicyBreakdownRow {
  label: string;
  value: string;
}

export interface PolicyBreakdown {
  title: string;
  total: string;
  rows: PolicyBreakdownRow[];
}

export interface PolicyEndorsement {
  name: string;
  totalAmount: string;
  installmentDate: string;
  installmentAmount: string;
  commission: string;
}

export interface PolicyDetail {
  policyNo: string;
  lob: string;
  carrierName: string;
  effDate: string;
  expireDate: string;
  bindDate: string;
  insured: {
    name: string;
    state: string;
    phone: string;
    email: string;
    dot: string;
    lineOfBusiness: string;
    owner: string;
  };
  producer: {
    agency: string;
    address: string;
    phone: string;
    contactName: string;
    contactEmail: string;
  };
  money: PolicyMoney;
  coverages: PolicyCoverage[];
  endorsements: PolicyEndorsement[];
  breakdowns: PolicyBreakdown[];
}

/** Static demo record — the [id] is threaded through so the URL and screen agree. */
export function getPolicy(id: string): PolicyDetail {
  return {
    policyNo: id,
    lob: "Comm Auto",
    carrierName: "Carrier Name",
    effDate: "8/15/2025",
    expireDate: "8/15/2025",
    bindDate: "8/15/2025",
    insured: {
      name: "Vlad test",
      state: "Alabama",
      phone: "(773) 556-6777",
      email: "dobrinski+t1@gmail.com",
      dot: "1234567890",
      lineOfBusiness: "Comm Auto",
      owner: "Dobri test",
    },
    producer: {
      agency: "Morpheus Ins",
      address: "123 Main str.",
      phone: "999-999-9999",
      contactName: "Goro Gor",
      contactEmail: "boyanov81gg+2@gmail.com",
    },
    money: {
      totalAmount: "$18,609.60",
      premium: "$15,810.00",
      installmentAmount: "$15,813.10",
      taxes: "$612.40",
      fees: "$2,187.20",
      commission: "$1,531.00",
    },
    coverages: [
      { title: "Covered Auto Liability", label: "Liability Limit", value: "$1,000,000" },
      { title: "General Liability", label: "Has Terminal", value: "No" },
      { title: "Uninsured and/or Underinsured Motorists (UM /UIM)", label: "UM-UIM BI", value: "$1,000,000" },
      { title: "UIIA", label: "UII Endorsement", value: "Less than 5 vehicles" },
    ],
    endorsements: [
      {
        name: "New Business",
        totalAmount: "$15,813.10",
        installmentDate: "8/15/2025",
        installmentAmount: "$15,813.10",
        commission: "$1,531.00",
      },
    ],
    breakdowns: [
      {
        title: "Premiums",
        total: "$15,810",
        rows: [
          { label: "AL Premium", value: "$13,635.00" },
          { label: "GL Premium", value: "$500.00" },
          { label: "UII Endorsement Premium", value: "$500.00" },
          { label: "UM Premium", value: "$675.00" },
          { label: "Other Premiums", value: "$500.00" },
        ],
      },
      {
        title: "Fees",
        total: "$2,187.2",
        rows: [
          { label: "Capitalization", value: "$350.00" },
          { label: "Policy Fee", value: "$1,837.20" },
          { label: "Processing Fee", value: "$0.00" },
        ],
      },
      {
        title: "Taxes",
        total: "$612.4",
        rows: [
          { label: "State Tax", value: "$0.00" },
          { label: "Domicile Tax", value: "$612.40" },
        ],
      },
    ],
  };
}

export const POLICY_TABS = [
  "Summary",
  "Drivers",
  "Vehicles",
  "Coverages",
  "Endorsements",
  "Insured",
] as const;

export type PolicyTab = (typeof POLICY_TABS)[number];
