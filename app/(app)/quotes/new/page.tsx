"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Timer,
  Save,
  Plus,
  Send,
  Printer,
  AlertCircle,
} from "lucide-react";
import { getQuote, type QuoteDetail } from "@/features/quotes/types/quote";
import styles from "./wizard.module.css";

const STEPS = [
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

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const COMMODITIES = [
  "General Freight", "Plastic Product", "Commodities Dry Bulk", "Paper Product", "Household Goods",
  "Building Materials", "Fresh Produce", "Beverages", "Meat", "Refrigerated Food", "Grain, Feed, Hay",
  "Farm Supplies", "Livestock", "Construction", "Utility", "Metal: Sheets, Coils, Rolls",
  "Machinery, Large Objects", "Garbage/Refuse/Trash", "Liquids/Gases", "Coal/Coke", "Chemicals",
  "Logs, Poles, Lumber", "Oil Field Equipment", "Water Well", "Drive Away/Towaway",
  "Intermodal Container", "Motor Vehicles", "Passengers", "Mobile Homes", "U.S. Mail", "Other",
];

const VIOLATION_OPTIONS = [
  "Speeding", "Speeding over 10 Miles", "Speeding over 15 Miles", "Speeding over 20 Miles",
  "Following too closely", "Improper lane changes", "Reckless driving", "Improper turns",
  "Failure to yield", "Railroad grade crossing violations", "DUI / DWI", "Hit and run", "Accident",
];

const BASE_RATES: Record<string, number> = { "750k": 3200, "1m": 4500, "2m": 6800, "5m": 12000 };

interface Vehicle {
  vin: string;
  year: string;
  type: string;
  make: string;
  radius: string;
  team: string;
}

interface Driver {
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

const EMPTY_VEHICLE: Vehicle = { vin: "", year: "", type: "truck-tractor", make: "", radius: "long", team: "no" };
const EMPTY_DRIVER: Driver = {
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

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/** Reads a value from the quote's summary fields by label. */
function summaryValue(quote: QuoteDetail, label: string): string {
  const found = quote.summaryFields.find((f) => f.label === label);
  const v = found?.value ?? "";
  return v === "N/A" ? "" : v;
}

const LEGAL_ENTITY_MAP: Record<string, string> = {
  LLC: "llc",
  "Sole Proprietor": "sole",
  Individual: "individual",
  Partnership: "partnership",
  Corporation: "corporation",
};
const TRUCKING_TYPE_MAP: Record<string, string> = {
  Common: "common",
  Contract: "contract",
  Moving: "moving",
  "Non-Trucking": "non-trucking",
  Private: "private",
};
const LIABILITY_MAP: Record<string, string> = {
  "$750,000": "750k",
  "$1,000,000": "1m",
  "$2,000,000": "2m",
  "$5,000,000": "5m",
};

export default function NewQuotePage() {
  return (
    <Suspense fallback={null}>
      <NewQuoteWizard />
    </Suspense>
  );
}

function NewQuoteWizard() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const prefill = editId ? getQuote(editId) : null;

  const [step, setStep] = useState(prefill ? 1 : 0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const ownerNameParts = prefill ? prefill.owner.name.split(" ") : [];

  // Step 1 — company
  const [companyName, setCompanyName] = useState(prefill ? summaryValue(prefill, "Company Name") : "");
  const [dba, setDba] = useState(prefill ? summaryValue(prefill, "DBA") : "");
  const [dotNumber, setDotNumber] = useState(prefill ? summaryValue(prefill, "DOT Number") : "");
  const [mcNumber, setMcNumber] = useState(prefill ? summaryValue(prefill, "MC Number") : "");
  const [legalEntity, setLegalEntity] = useState(
    prefill ? LEGAL_ENTITY_MAP[summaryValue(prefill, "Legal Entity")] ?? "llc" : "llc"
  );
  const [truckingType, setTruckingType] = useState(
    prefill ? TRUCKING_TYPE_MAP[summaryValue(prefill, "Trucking Company Type")] ?? "common" : "common"
  );
  const [duiViolations, setDuiViolations] = useState("no");

  // Step 2 — address
  const [address, setAddress] = useState(prefill ? summaryValue(prefill, "Address Insured") : "");
  const [city, setCity] = useState(prefill ? summaryValue(prefill, "City Insured") : "");
  const [state, setState] = useState(prefill ? prefill.state : "");
  const [county, setCounty] = useState(prefill ? summaryValue(prefill, "County Insured") : "");
  const [zip, setZip] = useState(prefill ? summaryValue(prefill, "ZIP Code Insured") : "");

  // Step 3 — coverage
  const [liabilityLimit, setLiabilityLimit] = useState(
    prefill ? LIABILITY_MAP[summaryValue(prefill, "Liability Limit")] ?? "" : ""
  );
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [anyDriverOos, setAnyDriverOos] = useState(false);
  const [coverages, setCoverages] = useState<Record<string, boolean>>(
    prefill
      ? {
          autos: true,
          general: summaryValue(prefill, "General Liability") === "Selected",
          uiia: summaryValue(prefill, "UIIA") === "Selected",
        }
      : { autos: true, general: false, uiia: false }
  );

  // Step 5 — owner
  const [ownerFirst, setOwnerFirst] = useState(ownerNameParts[0] ?? "");
  const [ownerLast, setOwnerLast] = useState(ownerNameParts.slice(1).join(" "));
  const [ownerEmail, setOwnerEmail] = useState(prefill ? prefill.owner.email : "");
  const [ownerPhone, setOwnerPhone] = useState(prefill ? prefill.owner.phone : "");
  const [bizYear, setBizYear] = useState(prefill ? summaryValue(prefill, "Year Established") : "");
  const [ownerExp, setOwnerExp] = useState(prefill ? summaryValue(prefill, "Owner`s Experience") : "");
  const [ownerDob, setOwnerDob] = useState("");
  const [ownerIsDriver, setOwnerIsDriver] = useState("no");

  // Step 6 — commodities
  const [commodities, setCommodities] = useState<Set<string>>(
    prefill
      ? new Set(
          [summaryValue(prefill, "Commodity 1"), summaryValue(prefill, "Commodity 2")].filter(Boolean)
        )
      : new Set()
  );

  // Step 7 — vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    prefill
      ? prefill.vehicles.map((v) => ({
          vin: v.vin,
          year: v.year,
          type: v.type,
          make: v.make,
          radius: v.operatingRadius,
          team: v.teamDriver.toLowerCase() === "yes" ? "yes" : "no",
        }))
      : []
  );
  const [vehicleDraft, setVehicleDraft] = useState<Vehicle>(EMPTY_VEHICLE);

  // Step 8 — cargo
  const [needCargo, setNeedCargo] = useState("no");
  const [cargoValue, setCargoValue] = useState("");
  const [cargoDeductible, setCargoDeductible] = useState("1000");

  // Step 9 — drivers
  const [drivers, setDrivers] = useState<Driver[]>(
    prefill
      ? prefill.drivers.map((d) => {
          const parts = d.names.split(" ");
          return {
            first: parts[0] === "—" ? "" : parts[0] ?? "",
            last: parts.slice(1).join(" "),
            dob: "",
            state: d.state === "N/A" ? "" : d.state,
            license: d.licenseNumber === "N/A" ? "" : d.licenseNumber,
            licenseClass: d.licenseClass.toLowerCase(),
            licenseDate: "",
            valid: "yes",
            violations: [],
          };
        })
      : []
  );
  const [driverDraft, setDriverDraft] = useState<Driver>(EMPTY_DRIVER);
  const [violationPick, setViolationPick] = useState("");

  const progressPercent = (step / 10) * 100;

  function goToStep(n: number) {
    setError(null);
    setStep(n);
  }

  function toggleCoverage(key: string) {
    setCoverages((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleCommodity(name: string) {
    setCommodities((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function saveVehicle() {
    if (!vehicleDraft.year.trim()) return setError("Vehicle year is required.");
    if (!vehicleDraft.type) return setError("Vehicle type is required.");
    setVehicles((prev) => [...prev, vehicleDraft]);
    setVehicleDraft(EMPTY_VEHICLE);
    setError(null);
  }

  function removeVehicle(i: number) {
    setVehicles((prev) => prev.filter((_, idx) => idx !== i));
  }

  function addViolationToDraft(value: string) {
    if (!value) return;
    setDriverDraft((prev) => ({ ...prev, violations: [...prev.violations, value] }));
    setViolationPick("");
  }

  function removeViolationFromDraft(i: number) {
    setDriverDraft((prev) => ({ ...prev, violations: prev.violations.filter((_, idx) => idx !== i) }));
  }

  function saveDriver() {
    if (!driverDraft.first.trim() || !driverDraft.last.trim()) {
      return setError("Driver first and last name required.");
    }
    setDrivers((prev) => [...prev, driverDraft]);
    setDriverDraft(EMPTY_DRIVER);
    setError(null);
  }

  function removeDriver(i: number) {
    setDrivers((prev) => prev.filter((_, idx) => idx !== i));
  }

  function validateStep1() {
    if (!companyName.trim()) return setError("Company Name is required.");
    goToStep(2);
  }
  function validateStep2() {
    if (!state) return setError("State is required.");
    goToStep(3);
  }
  function validateStep3() {
    if (!liabilityLimit) return setError("Liability limit is required.");
    if (!Object.values(coverages).some(Boolean)) return setError("Select at least one coverage.");
    goToStep(4);
  }
  function validateStep5() {
    if (!ownerFirst.trim() || !ownerLast.trim() || !ownerEmail.trim() || !ownerPhone.trim()) {
      return setError("All required owner fields must be filled.");
    }
    goToStep(6);
  }
  function validateStep6() {
    if (commodities.size === 0) return setError("Select at least one commodity.");
    goToStep(7);
  }
  function validateStep7() {
    if (vehicles.length === 0) return setError("Add at least one vehicle.");
    goToStep(8);
  }
  function validateStep9() {
    if (drivers.length === 0) return setError("Add at least one driver.");
    goToStep(10);
  }

  const quote = useMemo(() => {
    const base = BASE_RATES[liabilityLimit] ?? 4500;
    const vPremium = vehicles.length * 1200;
    const dPremium = drivers.length * 350;
    const cargoPremium = needCargo === "yes" ? 800 : 0;
    const total = base + vPremium + dPremium + cargoPremium;
    return { base, vPremium, dPremium, cargoPremium, total };
  }, [liabilityLimit, vehicles.length, drivers.length, needCargo]);

  return (
    <div className={styles.wizard}>
      <div className={styles.progressWrap}>
        <div className={styles.progBar}>
          <div className={styles.progFill} style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className={styles.stepPills}>
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`${styles.stepPill} ${i === step ? styles.stepPillActive : i < step ? styles.stepPillDone : ""}`}
            onClick={() => goToStep(i)}
          >
            <span className={styles.pnum}>{i < step ? "✓" : i + 1}</span>
            <span className={styles.plbl}>{label}</span>
          </button>
        ))}
      </div>

      {error ? (
        <div className={styles.alertInfo} style={{ background: "var(--vayga-red-dim)", color: "var(--vayga-red)", borderColor: "rgba(220,38,38,0.22)" }}>
          <AlertCircle size={16} />
          {error}
        </div>
      ) : null}

      {/* STEP 0: START */}
      {step === 0 ? (
        <div className={styles.card}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Instant Quote · No Commitment
          </div>
          <div className={styles.heroTitle}>
            Instant Trucking Insurance
            <br />
            Quote Online
          </div>
          <div className={styles.heroSub}>
            New ventures and new CDL drivers welcome. Get an accurate estimate in minutes.
          </div>
          <div className={styles.heroBanner}>
            We understand privacy matters. No commitment, no spam — fill in the form below and get a live quote in
            minutes.
          </div>
          <div className={styles.field} style={{ maxWidth: 360, marginBottom: 22 }}>
            <label>DOT Number (optional)</label>
            <input placeholder="Enter your DOT Number to pre-fill…" onChange={(e) => setDotNumber(e.target.value)} value={dotNumber} />
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => goToStep(1)}>
              Start Quote <ArrowRight size={15} />
            </button>
          </div>
          <div className={styles.heroTrust}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <ShieldCheck size={15} />
              </span>
              SSL Encrypted
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Zap size={15} />
              </span>
              Instant Results
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Timer size={15} />
              </span>
              5-Minute Form
            </div>
          </div>
          <div className={styles.callRow}>
            Prefer to speak with us? Call{" "}
            <a className={styles.phoneLink} href="tel:5555554444">
              (555) 555-4444
            </a>
          </div>
        </div>
      ) : null}

      {/* STEP 1: COMPANY */}
      {step === 1 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Insured Information</div>
          <div className={styles.cardSub}>Basic company and regulatory details</div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>
                Company Name <span className={styles.req}>*</span>
              </label>
              <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
            </div>
            <div className={styles.field}>
              <label>DBA</label>
              <input value={dba} onChange={(e) => setDba(e.target.value)} placeholder="Doing Business As" />
            </div>
            <div className={styles.field}>
              <label>DOT Number</label>
              <input value={dotNumber} onChange={(e) => setDotNumber(e.target.value)} placeholder="DOT Number" />
            </div>
            <div className={styles.field}>
              <label>MC Number</label>
              <input value={mcNumber} onChange={(e) => setMcNumber(e.target.value)} placeholder="MC Number" />
            </div>
            <div className={styles.field}>
              <label>Legal Entity</label>
              <select value={legalEntity} onChange={(e) => setLegalEntity(e.target.value)}>
                <option value="llc">LLC</option>
                <option value="sole">Sole Proprietor</option>
                <option value="individual">Individual</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Trucking Company Type</label>
              <select value={truckingType} onChange={(e) => setTruckingType(e.target.value)}>
                <option value="common">Common</option>
                <option value="contract">Contract</option>
                <option value="moving">Moving</option>
                <option value="non-trucking">Non-Trucking</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className={`${styles.field} ${styles.span3}`}>
              <label>
                Out-of-service violations due to DUI or drug-related? <span className={styles.req}>*</span>
              </label>
              <select value={duiViolations} onChange={(e) => setDuiViolations(e.target.value)} style={{ maxWidth: 220 }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(0)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep1}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 2: ADDRESS */}
      {step === 2 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Insured Address</div>
          <div className={styles.cardSub}>Principal place of business</div>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.span2}`}>
              <label>Street Address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" />
            </div>
            <div className={styles.field}>
              <label>City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </div>
            <div className={styles.field}>
              <label>
                State <span className={styles.req}>*</span>
              </label>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State…</option>
                {US_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>County</label>
              <input value={county} onChange={(e) => setCounty(e.target.value)} placeholder="County" />
            </div>
            <div className={styles.field}>
              <label>ZIP Code</label>
              <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP Code" maxLength={10} />
            </div>
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(1)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep2}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 3: COVERAGE */}
      {step === 3 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Coverage Information</div>
          <div className={styles.cardSub}>Select your liability limits and required coverages</div>
          <div className={`${styles.formGrid} ${styles.formGridCol2}`} style={{ marginBottom: 20 }}>
            <div className={styles.field}>
              <label>
                Liability Limit <span className={styles.req}>*</span>
              </label>
              <select value={liabilityLimit} onChange={(e) => setLiabilityLimit(e.target.value)}>
                <option value="">Choose…</option>
                <option value="750k">$750,000</option>
                <option value="1m">$1,000,000</option>
                <option value="2m">$2,000,000</option>
                <option value="5m">$5,000,000</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Effective Date</label>
              <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Expiration Date</label>
              <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
            </div>
            <div className={styles.field} style={{ justifyContent: "flex-end", paddingTop: 18 }}>
              <div
                className={`${styles.covItem} ${anyDriverOos ? styles.covItemChecked : ""}`}
                onClick={() => setAnyDriverOos((v) => !v)}
              >
                <input type="checkbox" checked={anyDriverOos} readOnly />
                <label style={{ textTransform: "none", fontSize: 12, letterSpacing: 0 }}>
                  Any driver out-of-service past year?
                </label>
              </div>
            </div>
          </div>
          <div className={styles.coverageBox}>
            <div className={styles.coverageBoxTitle}>Coverage Name</div>
            <div className={styles.covGrid}>
              <div
                className={`${styles.covItem} ${coverages.autos ? styles.covItemChecked : ""}`}
                onClick={() => toggleCoverage("autos")}
              >
                <input type="checkbox" checked={coverages.autos} readOnly />
                <label>Covered Autos Liability</label>
              </div>
              <div
                className={`${styles.covItem} ${coverages.general ? styles.covItemChecked : ""}`}
                onClick={() => toggleCoverage("general")}
              >
                <input type="checkbox" checked={coverages.general} readOnly />
                <label>General Liability</label>
              </div>
              <div className={`${styles.covItem} ${styles.covItemNa}`}>
                <input type="checkbox" disabled />
                <label>Personal Injury Protection</label>
              </div>
              <div className={`${styles.covItem} ${styles.covItemNa}`}>
                <input type="checkbox" disabled />
                <label>Auto Medical Payments</label>
              </div>
              <div className={`${styles.covItem} ${styles.covItemNa}`}>
                <input type="checkbox" disabled />
                <label>Uninsured Motorists</label>
              </div>
              <div
                className={`${styles.covItem} ${coverages.uiia ? styles.covItemChecked : ""}`}
                onClick={() => toggleCoverage("uiia")}
              >
                <input type="checkbox" checked={coverages.uiia} readOnly />
                <label>UIIA</label>
              </div>
            </div>
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(2)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep3}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 4: LIMITS */}
      {step === 4 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Coverage Limits</div>
          <div className={styles.cardSub}>Specific limits and sublimits per coverage</div>
          {!coverages.autos && !coverages.general && !coverages.uiia ? (
            <div className={styles.alertInfo}>
              <AlertCircle size={16} />
              Select one or more coverages in the previous step to configure limits here.
            </div>
          ) : (
            <div className={`${styles.formGrid} ${styles.formGridCol2}`}>
              {coverages.autos ? (
                <div className={styles.field}>
                  <label>Covered Autos Liability Limit</label>
                  <select defaultValue="$1,000,000">
                    <option>$1,000,000</option>
                    <option>$2,000,000</option>
                    <option>$5,000,000</option>
                  </select>
                </div>
              ) : null}
              {coverages.general ? (
                <div className={styles.field}>
                  <label>General Liability Limit</label>
                  <select defaultValue="$1,000,000">
                    <option>$1,000,000</option>
                    <option>$2,000,000</option>
                  </select>
                </div>
              ) : null}
            </div>
          )}
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(3)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => goToStep(5)}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 5: OWNER */}
      {step === 5 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Owner Information</div>
          <div className={styles.cardSub}>Principal owner and business history</div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>
                First Name <span className={styles.req}>*</span>
              </label>
              <input value={ownerFirst} onChange={(e) => setOwnerFirst(e.target.value)} placeholder="First Name" />
            </div>
            <div className={styles.field}>
              <label>
                Last Name <span className={styles.req}>*</span>
              </label>
              <input value={ownerLast} onChange={(e) => setOwnerLast(e.target.value)} placeholder="Last Name" />
            </div>
            <div className={styles.field}>
              <label>
                Email <span className={styles.req}>*</span>
              </label>
              <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className={styles.field}>
              <label>
                Phone <span className={styles.req}>*</span>
              </label>
              <input type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="Phone" />
            </div>
            <div className={styles.field}>
              <label>Year Business Established</label>
              <input type="number" value={bizYear} onChange={(e) => setBizYear(e.target.value)} placeholder="Year" min={1900} max={2026} />
            </div>
            <div className={styles.field}>
              <label>Years of Owner Experience</label>
              <input type="number" value={ownerExp} onChange={(e) => setOwnerExp(e.target.value)} placeholder="Years" min={0} max={60} />
            </div>
            <div className={styles.field}>
              <label>Owner Birth Date</label>
              <input type="date" value={ownerDob} onChange={(e) => setOwnerDob(e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Owner is a Driver?</label>
              <select value={ownerIsDriver} onChange={(e) => setOwnerIsDriver(e.target.value)}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(4)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep5}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 6: COMMODITIES */}
      {step === 6 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Commodities List</div>
          <div className={styles.cardSub}>Select all commodities your fleet hauls</div>
          <div className={styles.commGrid}>
            {COMMODITIES.map((name) => (
              <div
                key={name}
                className={`${styles.commItem} ${commodities.has(name) ? styles.commItemChecked : ""}`}
                onClick={() => toggleCommodity(name)}
              >
                <input type="checkbox" checked={commodities.has(name)} readOnly />
                <label>{name}</label>
              </div>
            ))}
          </div>
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(5)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep6}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 7: VEHICLES */}
      {step === 7 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Vehicle Details</div>
          <div className={styles.cardSub}>Add each power unit in your fleet</div>

          {vehicles.map((v, i) => (
            <div className={styles.itemCard} key={i}>
              <div>
                <div className={styles.icTitle}>
                  {v.year} {v.make || "—"} {v.type}
                </div>
                <div className={styles.icMeta}>VIN: {v.vin || "N/A"}</div>
                <span className={styles.icBadge}>{v.radius}</span>
              </div>
              <button type="button" className={styles.removeBtn} onClick={() => removeVehicle(i)}>
                ✕ Remove
              </button>
            </div>
          ))}
          {vehicles.length > 0 ? <hr className={styles.sectionSep} /> : null}

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>VIN</label>
              <input
                value={vehicleDraft.vin}
                onChange={(e) => setVehicleDraft((p) => ({ ...p, vin: e.target.value }))}
                placeholder="Vehicle Identification Number"
                maxLength={17}
              />
            </div>
            <div className={styles.field}>
              <label>
                Year <span className={styles.req}>*</span>
              </label>
              <input
                type="number"
                value={vehicleDraft.year}
                onChange={(e) => setVehicleDraft((p) => ({ ...p, year: e.target.value }))}
                placeholder="Year"
                min={1950}
                max={2027}
              />
            </div>
            <div className={styles.field}>
              <label>Operating Radius</label>
              <select
                value={vehicleDraft.radius}
                onChange={(e) => setVehicleDraft((p) => ({ ...p, radius: e.target.value }))}
              >
                <option value="long">Long Class (over 200 miles)</option>
                <option value="intermediate">Intermediate (51–200 mi.)</option>
                <option value="short">Short Class (under 50 miles)</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>
                Vehicle Type <span className={styles.req}>*</span>
              </label>
              <select value={vehicleDraft.type} onChange={(e) => setVehicleDraft((p) => ({ ...p, type: e.target.value }))}>
                <option value="truck-tractor">Truck Tractor</option>
                <option value="light-box">Light/Box Truck</option>
                <option value="trailer">Trailer</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Make</label>
              <select value={vehicleDraft.make} onChange={(e) => setVehicleDraft((p) => ({ ...p, make: e.target.value }))}>
                <option value="">Select make…</option>
                {["Freightliner", "Kenworth", "Peterbilt", "International", "Volvo", "Mack", "Western Star", "GMC", "Hino", "Caterpillar", "Sterling", "Oshkosh Truck", "Custom"].map(
                  (m) => (
                    <option key={m}>{m}</option>
                  )
                )}
              </select>
            </div>
            <div className={styles.field}>
              <label>Team Driver</label>
              <select value={vehicleDraft.team} onChange={(e) => setVehicleDraft((p) => ({ ...p, team: e.target.value }))}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          <div className={styles.btnRow} style={{ marginTop: 14 }}>
            <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={saveVehicle}>
              <Save size={15} />
              Save Vehicle
            </button>
          </div>

          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(6)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep7}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 8: CARGO */}
      {step === 8 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Cargo Coverage</div>
          <div className={styles.cardSub}>Optional inland marine / cargo protection</div>
          <div className={`${styles.formGrid} ${styles.formGridCol1}`} style={{ maxWidth: 340 }}>
            <div className={styles.field}>
              <label>
                Do you need cargo coverage? <span className={styles.req}>*</span>
              </label>
              <select value={needCargo} onChange={(e) => setNeedCargo(e.target.value)}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          {needCargo === "yes" ? (
            <div style={{ marginTop: 20 }}>
              <div className={`${styles.formGrid} ${styles.formGridCol2}`} style={{ maxWidth: 560 }}>
                <div className={styles.field}>
                  <label>Cargo Value ($)</label>
                  <input type="number" value={cargoValue} onChange={(e) => setCargoValue(e.target.value)} placeholder="e.g. 100000" min={0} />
                </div>
                <div className={styles.field}>
                  <label>Cargo Deductible</label>
                  <select value={cargoDeductible} onChange={(e) => setCargoDeductible(e.target.value)}>
                    <option value="1000">$1,000</option>
                    <option value="2500">$2,500</option>
                    <option value="5000">$5,000</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null}
          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(7)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => goToStep(9)}>
              Next Step <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 9: DRIVERS */}
      {step === 9 ? (
        <div className={styles.card}>
          <div className={styles.cardTitle}>Driver Info</div>
          <div className={styles.cardSub}>Add all licensed drivers operating your vehicles</div>

          {drivers.map((d, i) => (
            <div className={styles.itemCard} key={i}>
              <div>
                <div className={styles.icTitle}>
                  {d.first} {d.last}
                </div>
                <div className={styles.icMeta}>
                  License: {d.license || "N/A"} · Class: {d.licenseClass} · {d.violations.length} violation(s)
                </div>
              </div>
              <button type="button" className={styles.removeBtn} onClick={() => removeDriver(i)}>
                ✕ Remove
              </button>
            </div>
          ))}
          {drivers.length > 0 ? <hr className={styles.sectionSep} /> : null}

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>
                First Name <span className={styles.req}>*</span>
              </label>
              <input value={driverDraft.first} onChange={(e) => setDriverDraft((p) => ({ ...p, first: e.target.value }))} placeholder="First Name" />
            </div>
            <div className={styles.field}>
              <label>
                Last Name <span className={styles.req}>*</span>
              </label>
              <input value={driverDraft.last} onChange={(e) => setDriverDraft((p) => ({ ...p, last: e.target.value }))} placeholder="Last Name" />
            </div>
            <div className={styles.field}>
              <label>Date of Birth</label>
              <input type="date" value={driverDraft.dob} onChange={(e) => setDriverDraft((p) => ({ ...p, dob: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label>State</label>
              <select value={driverDraft.state} onChange={(e) => setDriverDraft((p) => ({ ...p, state: e.target.value }))}>
                <option value="">Select State…</option>
                {US_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>License Number</label>
              <input value={driverDraft.license} onChange={(e) => setDriverDraft((p) => ({ ...p, license: e.target.value }))} placeholder="License Number" />
            </div>
            <div className={styles.field}>
              <label>License Class</label>
              <select value={driverDraft.licenseClass} onChange={(e) => setDriverDraft((p) => ({ ...p, licenseClass: e.target.value }))}>
                <option value="commercial">Commercial</option>
                <option value="cdl-a">CDL-A</option>
                <option value="cdl-b">CDL-B</option>
                <option value="cdl-c">CDL-C</option>
                <option value="non-cdl">Non-CDL</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>License Issue Date</label>
              <input type="date" value={driverDraft.licenseDate} onChange={(e) => setDriverDraft((p) => ({ ...p, licenseDate: e.target.value }))} />
            </div>
            <div className={styles.field}>
              <label>Valid License</label>
              <select value={driverDraft.valid} onChange={(e) => setDriverDraft((p) => ({ ...p, valid: e.target.value }))}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <hr className={styles.sectionSep} style={{ margin: "20px 0 16px" }} />
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--vayga-text-3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
            Violations in the past 3 years
          </p>
          <div className={styles.field} style={{ maxWidth: 340 }}>
            <label>Add Violation</label>
            <select
              value={violationPick}
              onChange={(e) => addViolationToDraft(e.target.value)}
            >
              <option value="">Select violation…</option>
              {VIOLATION_OPTIONS.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          <div style={{ maxWidth: 500, marginTop: 4 }}>
            {driverDraft.violations.map((v, i) => (
              <span className={styles.violationPill} key={`${v}-${i}`}>
                ⚠ {v}
                <button type="button" className={styles.violationRemove} onClick={() => removeViolationFromDraft(i)}>
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className={styles.btnRow} style={{ marginTop: 18, justifyContent: "flex-start" }}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
              onClick={() => setDriverDraft(EMPTY_DRIVER)}
            >
              Clear Driver
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={saveDriver}>
              <Plus size={15} />
              Add Driver
            </button>
          </div>

          <div className={styles.btnRow}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(8)}>
              ← Previous
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={validateStep9}>
              Generate Quote <ArrowRight size={15} />
            </button>
          </div>
        </div>
      ) : null}

      {/* STEP 10: BREAKDOWN */}
      {step === 10 ? (
        <div className={styles.card}>
          <div className={styles.resultHero}>
            <div className={styles.resultIcon}>🎉</div>
            <div className={styles.resultTitle}>Your Quote is Ready!</div>
            <p style={{ fontSize: 13, color: "var(--vayga-text-3)", marginTop: 4 }}>Based on your provided information</p>
            <div className={styles.priceAmount}>{formatCurrency(quote.total)}</div>
            <div className={styles.priceLabel}>Estimated Annual Premium</div>
          </div>

          <table className={styles.breakdownTbl}>
            <thead>
              <tr>
                <th>Coverage</th>
                <th>Details</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Covered Autos Liability</td>
                <td style={{ color: "var(--vayga-text-3)" }}>Limit: {liabilityLimit || "—"}</td>
                <td>{formatCurrency(quote.base)}</td>
              </tr>
              <tr>
                <td>Vehicle Premiums</td>
                <td style={{ color: "var(--vayga-text-3)" }}>{vehicles.length} vehicle(s)</td>
                <td>{formatCurrency(quote.vPremium)}</td>
              </tr>
              <tr>
                <td>Driver Premiums</td>
                <td style={{ color: "var(--vayga-text-3)" }}>{drivers.length} driver(s)</td>
                <td>{formatCurrency(quote.dPremium)}</td>
              </tr>
              {quote.cargoPremium ? (
                <tr>
                  <td>Cargo Coverage</td>
                  <td style={{ color: "var(--vayga-text-3)" }}>Selected</td>
                  <td>{formatCurrency(quote.cargoPremium)}</td>
                </tr>
              ) : null}
            </tbody>
          </table>

          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total Annual Premium</span>
            <span className={styles.totalValue}>{formatCurrency(quote.total)}</span>
          </div>

          <div className={styles.summaryBox}>
            <div className={styles.summaryBoxTitle}>Quote Summary</div>
            <div className={styles.summaryGrid}>
              {[
                ["Company", companyName || "—"],
                ["State", state || "—"],
                ["Vehicles", `${vehicles.length} unit(s)`],
                ["Drivers", `${drivers.length} driver(s)`],
                ["Effective", effectiveDate || "—"],
                ["Expiration", expirationDate || "—"],
              ].map(([k, v]) => (
                <div className={styles.summaryItem} key={k}>
                  <div className={styles.summaryKey}>{k}</div>
                  <div className={styles.summaryValue}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.btnRow} style={{ marginTop: 24 }}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={() => goToStep(9)}>
              ← Edit Quote
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setSubmitted(true)}>
              Submit &amp; Get Policy <Send size={15} />
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={() => window.print()}>
              <Printer size={14} /> Print
            </button>
          </div>
          {submitted ? (
            <p style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: "var(--vayga-green)" }}>
              Quote submitted! An agent from Vayga will contact you soon.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
