"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  STEPS,
  BASE_RATES,
  EMPTY_VEHICLE,
  EMPTY_DRIVER,
  type Vehicle,
  type Driver,
} from "./constants";
import StartForm from "./forms/StartForm";
import CompanyForm from "./forms/CompanyForm";
import AddressForm from "./forms/AddressForm";
import CoverageForm from "./forms/CoverageForm";
import LimitsForm from "./forms/LimitsForm";
import OwnerForm from "./forms/OwnerForm";
import CommoditiesForm from "./forms/CommoditiesForm";
import VehiclesForm from "./forms/VehiclesForm";
import CargoForm from "./forms/CargoForm";
import DriversForm from "./forms/DriversForm";
import BreakdownForm from "./forms/BreakdownForm";
import styles from "./GetQuoteForm.module.css";

/**
 * Public, no-registration "Get a Quote" wizard. Holds all shared state and
 * navigation; each of the 11 tabs is rendered by its own form component under
 * ./forms, all sharing the common GetQuoteForm.module.css.
 */
export default function GetQuoteForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Company
  const [companyName, setCompanyName] = useState("");
  const [dba, setDba] = useState("");
  const [dotNumber, setDotNumber] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [legalEntity, setLegalEntity] = useState("llc");
  const [truckingType, setTruckingType] = useState("common");
  const [duiViolations, setDuiViolations] = useState("no");

  // Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");

  // Coverage
  const [liabilityLimit, setLiabilityLimit] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [anyDriverOos, setAnyDriverOos] = useState(false);
  const [coverages, setCoverages] = useState<Record<string, boolean>>({ autos: true, general: false, uiia: false });

  // Owner
  const [ownerFirst, setOwnerFirst] = useState("");
  const [ownerLast, setOwnerLast] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [bizYear, setBizYear] = useState("");
  const [ownerExp, setOwnerExp] = useState("");
  const [ownerDob, setOwnerDob] = useState("");
  const [ownerIsDriver, setOwnerIsDriver] = useState("no");

  // Commodities
  const [commodities, setCommodities] = useState<Set<string>>(new Set());

  // Vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleDraft, setVehicleDraft] = useState<Vehicle>(EMPTY_VEHICLE);

  // Cargo
  const [needCargo, setNeedCargo] = useState("no");
  const [cargoValue, setCargoValue] = useState("");
  const [cargoDeductible, setCargoDeductible] = useState("1000");

  // Drivers
  const [drivers, setDrivers] = useState<Driver[]>([]);
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

      {step === 0 ? <StartForm dotNumber={dotNumber} setDotNumber={setDotNumber} onStart={() => goToStep(1)} /> : null}

      {step === 1 ? (
        <CompanyForm
          companyName={companyName}
          setCompanyName={setCompanyName}
          dba={dba}
          setDba={setDba}
          dotNumber={dotNumber}
          setDotNumber={setDotNumber}
          mcNumber={mcNumber}
          setMcNumber={setMcNumber}
          legalEntity={legalEntity}
          setLegalEntity={setLegalEntity}
          truckingType={truckingType}
          setTruckingType={setTruckingType}
          duiViolations={duiViolations}
          setDuiViolations={setDuiViolations}
          onPrev={() => goToStep(0)}
          onNext={validateStep1}
        />
      ) : null}

      {step === 2 ? (
        <AddressForm
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          county={county}
          setCounty={setCounty}
          zip={zip}
          setZip={setZip}
          onPrev={() => goToStep(1)}
          onNext={validateStep2}
        />
      ) : null}

      {step === 3 ? (
        <CoverageForm
          liabilityLimit={liabilityLimit}
          setLiabilityLimit={setLiabilityLimit}
          effectiveDate={effectiveDate}
          setEffectiveDate={setEffectiveDate}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          anyDriverOos={anyDriverOos}
          setAnyDriverOos={setAnyDriverOos}
          coverages={coverages}
          toggleCoverage={toggleCoverage}
          onPrev={() => goToStep(2)}
          onNext={validateStep3}
        />
      ) : null}

      {step === 4 ? (
        <LimitsForm coverages={coverages} onPrev={() => goToStep(3)} onNext={() => goToStep(5)} />
      ) : null}

      {step === 5 ? (
        <OwnerForm
          ownerFirst={ownerFirst}
          setOwnerFirst={setOwnerFirst}
          ownerLast={ownerLast}
          setOwnerLast={setOwnerLast}
          ownerEmail={ownerEmail}
          setOwnerEmail={setOwnerEmail}
          ownerPhone={ownerPhone}
          setOwnerPhone={setOwnerPhone}
          bizYear={bizYear}
          setBizYear={setBizYear}
          ownerExp={ownerExp}
          setOwnerExp={setOwnerExp}
          ownerDob={ownerDob}
          setOwnerDob={setOwnerDob}
          ownerIsDriver={ownerIsDriver}
          setOwnerIsDriver={setOwnerIsDriver}
          onPrev={() => goToStep(4)}
          onNext={validateStep5}
        />
      ) : null}

      {step === 6 ? (
        <CommoditiesForm
          commodities={commodities}
          toggleCommodity={toggleCommodity}
          onPrev={() => goToStep(5)}
          onNext={validateStep6}
        />
      ) : null}

      {step === 7 ? (
        <VehiclesForm
          vehicles={vehicles}
          vehicleDraft={vehicleDraft}
          setVehicleDraft={setVehicleDraft}
          saveVehicle={saveVehicle}
          removeVehicle={removeVehicle}
          onPrev={() => goToStep(6)}
          onNext={validateStep7}
        />
      ) : null}

      {step === 8 ? (
        <CargoForm
          needCargo={needCargo}
          setNeedCargo={setNeedCargo}
          cargoValue={cargoValue}
          setCargoValue={setCargoValue}
          cargoDeductible={cargoDeductible}
          setCargoDeductible={setCargoDeductible}
          onPrev={() => goToStep(7)}
          onNext={() => goToStep(9)}
        />
      ) : null}

      {step === 9 ? (
        <DriversForm
          drivers={drivers}
          driverDraft={driverDraft}
          setDriverDraft={setDriverDraft}
          resetDriverDraft={() => setDriverDraft(EMPTY_DRIVER)}
          violationPick={violationPick}
          addViolationToDraft={addViolationToDraft}
          removeViolationFromDraft={removeViolationFromDraft}
          saveDriver={saveDriver}
          removeDriver={removeDriver}
          onPrev={() => goToStep(8)}
          onNext={validateStep9}
        />
      ) : null}

      {step === 10 ? (
        <BreakdownForm
          quote={quote}
          companyName={companyName}
          state={state}
          vehicles={vehicles}
          drivers={drivers}
          effectiveDate={effectiveDate}
          expirationDate={expirationDate}
          liabilityLimit={liabilityLimit}
          submitted={submitted}
          onSubmit={() => setSubmitted(true)}
          onEdit={() => goToStep(9)}
        />
      ) : null}
    </div>
  );
}
