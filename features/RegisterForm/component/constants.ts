export const STEPS = [
  "Start",
  "Company",
  "Address",
  "Coverage",
  "Limits",
  "Owner",
  "Commodities",
  "Vehicles",
  "Cargo",
  "Drivers",
  "Breakdown",
];

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export const COMMODITIES = [
  "General Freight", "Plastic Product", "Commodities Dry Bulk", "Paper Product", "Household Goods",
  "Building Materials", "Fresh Produce", "Beverages", "Meat", "Refrigerated Food", "Grain, Feed, Hay",
  "Farm Supplies", "Livestock", "Construction", "Utility", "Metal: Sheets, Coils, Rolls",
  "Machinery, Large Objects", "Garbage/Refuse/Trash", "Liquids/Gases", "Coal/Coke", "Chemicals",
  "Logs, Poles, Lumber", "Oil Field Equipment", "Water Well", "Drive Away/Towaway",
  "Intermodal Container", "Motor Vehicles", "Passengers", "Mobile Homes", "U.S. Mail", "Other",
];

export const VIOLATION_OPTIONS = [
  "Speeding", "Speeding over 10 Miles", "Speeding over 15 Miles", "Speeding over 20 Miles",
  "Following too closely", "Improper lane changes", "Reckless driving", "Improper turns",
  "Failure to yield", "Railroad grade crossing violations", "DUI / DWI", "Hit and run", "Accident",
];

export const VEHICLE_MAKES = [
  "Freightliner", "Kenworth", "Peterbilt", "International", "Volvo", "Mack", "Western Star",
  "GMC", "Hino", "Caterpillar", "Sterling", "Oshkosh Truck", "Custom",
];

export const BASE_RATES: Record<string, number> = { "750k": 3200, "1m": 4500, "2m": 6800, "5m": 12000 };

export interface Vehicle {
  vin: string;
  year: string;
  type: string;
  make: string;
  radius: string;
  team: string;
}

export interface Driver {
  first: string;
  last: string;
  dob: string;
  state: string;
  license: string;
  licenseClass: string;
  licenseDate: string;
  valid: string;
  violations: string[];
}

export const EMPTY_VEHICLE: Vehicle = { vin: "", year: "", type: "truck-tractor", make: "", radius: "long", team: "no" };

export const EMPTY_DRIVER: Driver = {
  first: "",
  last: "",
  dob: "",
  state: "",
  license: "",
  licenseClass: "commercial",
  licenseDate: "",
  valid: "yes",
  violations: [],
};

export function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}
