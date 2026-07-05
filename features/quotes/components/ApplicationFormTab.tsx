import Image from "next/image";
import type { QuoteDetail } from "../types/quote";
import styles from "./ApplicationFormTab.module.css";

const COVERAGE_ROWS = [
  "UM-BI:",
  "UM-PD:",
  "UIM BI:",
  "UIM PD:",
  "No-fault: (PIP)",
  "No-fault: (Med Pay)",
] as const;

function YesNoRow({ question, answer = "No" }: { question: string; answer?: "Yes" | "No" }) {
  return (
    <div className={styles.yn}>
      <b>{question}</b>
      <label className={styles.chk}>
        <input type="checkbox" defaultChecked={answer === "Yes"} /> Yes
      </label>
      <label className={styles.chk}>
        <input type="checkbox" defaultChecked={answer === "No"} /> <u>No</u>
      </label>
    </div>
  );
}

export function ApplicationFormTab({
  quote,
  onClose,
}: {
  quote: QuoteDetail;
  onClose: () => void;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles.panel}>
      <div className={styles.logoRow}>
        <div className={styles.logoChip}>
          <Image
            src="/images/vayga-logo.png"
            alt="VAYGA Insurance Partners"
            width={150}
            height={40}
          />
        </div>
      </div>

      <div className={styles.banner}>
        This policy is issued by your risk retention group. Your risk retention group may not be
        subject to all the insurance laws and regulations of your state. State insurance insolvency
        guaranty funds are not available for your risk retention group.
      </div>

      <div className={styles.flagWrap}>
        <span className={styles.flag}>APPLICATION FOR COVERAGE</span>
      </div>

      <div className={styles.line}>
        <b>Agency:</b> &nbsp;{quote.agency}
      </div>
      <div className={styles.line}>
        <b>Producer:</b> {quote.agency}
      </div>

      <div className={styles.infoTable}>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>Company name:</div>
          <div>{quote.insured}</div>
          <div className={styles.infoKey}>DBA:</div>
          <div>{quote.dba}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>Mailing Address:</div>
          <div>State: {quote.state}</div>
          <div className={styles.infoKey}>Contact name:</div>
          <div>
            <input className={styles.inp} placeholder="Contact name" />
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>Garaging Address:</div>
          <div>
            <input className={styles.inp} placeholder="Garaging address" />
          </div>
          <div className={styles.infoKey}>E-Mail:</div>
          <div>{quote.owner.email}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>Phone number</div>
          <div>{quote.owner.phone}</div>
          <div className={styles.infoKey}>Target Effective:</div>
          <div>{quote.effectiveDate}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>SMS Pin:</div>
          <div>
            <input className={styles.inp} placeholder="SMS PIN" />
          </div>
          <div className={styles.infoKey}>Target Premium:</div>
          <div>
            <input className={styles.inp} placeholder="Target premium" />
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>Owner/Executive:</div>
          <div>{quote.owner.name}</div>
          <div className={styles.infoKey}>Federal Tax ID Number:</div>
          <div>
            <input className={styles.inp} placeholder="TAX ID number" />
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoKey}>US DOT:</div>
          <div>N/A</div>
          <div className={styles.infoKey}>MC Number:</div>
          <div>N/A</div>
        </div>
      </div>

      <div className={styles.yn}>
        <b>Form of Business:</b>
        <label className={styles.chk}>
          <input type="checkbox" defaultChecked /> LLC
        </label>
      </div>

      <div className={styles.inlineFacts}>
        <span>
          <b>Number of Years in Business:</b> 5
        </span>
        <span>
          <b>Number of Years Owner`s Experience:</b> 0
        </span>
      </div>

      <div className={styles.sectionLabel}>Required Filings:</div>
      <label className={`${styles.chk} ${styles.chkBlock}`}>
        <input type="checkbox" /> Federal
      </label>
      <label className={`${styles.chk} ${styles.chkBlock}`}>
        <input type="checkbox" /> State &nbsp;
        <span className={styles.chkNote}>
          (note federal filing will be filed at FMCSA required minimum)
        </span>
      </label>
      <div className={styles.chkInputRow}>
        <label className={styles.chk}>
          <input type="checkbox" /> Other:
        </label>
        <input className={styles.inp} placeholder="List any other required fillings" />
      </div>

      <div className={styles.yn}>
        <b>Any Subsidiaries?</b>
        <label className={styles.chk}>
          <input type="checkbox" /> Yes
        </label>
        <label className={styles.chk}>
          <input type="checkbox" defaultChecked /> <u>No</u>
        </label>
        <span className={styles.detailLabel}>If Yes please list details:</span>
        <input className={styles.inp} placeholder="Enter Subsidiary details" />
      </div>

      <hr className={styles.rule} />

      <YesNoRow question="Has the company ever been under another name or DOT?" />
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>If yes above, please provide details:</span>
        <input
          className={styles.inp}
          placeholder="List details of prior company name or DOT authorities"
        />
      </div>

      <div className={styles.flagWrap}>
        <span className={styles.flag}>Description of Operations</span>
      </div>

      <div className={styles.yn}>
        <b>Carrier Type:</b>
        <label className={styles.chk}>
          <input type="checkbox" defaultChecked /> Common
        </label>
      </div>
      <div className={styles.inlineFacts}>
        <span>
          <b>US DOT:</b> N/A
        </span>
        <span>
          <b>MC Number:</b> N/A
        </span>
      </div>

      <YesNoRow question="Have you been cancelled or non-renewed in the last 3 years?" />
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>If yes above, please provide details:</span>
        <input
          className={styles.inp}
          placeholder="List details on cancellations and/or non-renewals."
        />
      </div>
      <YesNoRow question="Is Carrier involved in any non-trucking?" />
      <YesNoRow question="Do drivers complete employment applications when applying for the job?" />
      <YesNoRow question="Does Carrier Team driver at all?" />
      <YesNoRow question="Do any operations occur in Canada or Mexico?" />

      <div className={styles.commodities}>
        <div>Meat (% not set)</div>
        <div>Refrigerated Food (% not set)</div>
      </div>

      <div className={styles.yn}>
        <b>Radius by %:</b>
        <label className={styles.chk}>
          <input type="checkbox" /> 0-100 Miles
        </label>
        <label className={styles.chk}>
          <input type="checkbox" /> 101-500 Miles
        </label>
        <label className={styles.chk}>
          <input type="checkbox" /> 501-1000 Miles
        </label>
        <label className={styles.chk}>
          <input type="checkbox" /> Over 1000 Miles
        </label>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Common States and Major Cities:</span>
        <input
          className={styles.inp}
          placeholder="List major cities and common states frequently traveled."
        />
      </div>

      <div className={styles.flagWrap}>
        <span className={styles.flag}>
          Coverages and Limits (Any coverages not listed are not offered):
        </span>
      </div>

      <div className={styles.line}>
        <b>Liability Limit:</b> $1,000,000
      </div>
      <div className={styles.yn}>
        <b>Other Supplementary Coverages:</b>
        <label className={styles.chk}>
          <input type="checkbox" /> Hired
        </label>
        <label className={styles.chk}>
          <input type="checkbox" /> Non-Owned
        </label>
        <label className={styles.chk}>
          <input type="checkbox" defaultChecked /> <u>UIIA</u>
        </label>
      </div>

      {COVERAGE_ROWS.map((name) => (
        <div key={name} className={styles.covRow}>
          <b>{name}</b>
          <label className={styles.chk}>
            <input type="checkbox" /> Reject
          </label>
          <label className={styles.chk}>
            <input type="checkbox" /> Accept State Min Limit
          </label>
          <span className={styles.chk}>
            <input type="checkbox" readOnly /> <b>Other Limit:</b>&nbsp;N/A
          </span>
        </div>
      ))}
      <div className={styles.covRow}>
        <b>UM-UIM BI</b>
        <label className={styles.chk}>
          <input type="checkbox" /> Reject
        </label>
        <label className={styles.chk}>
          <input type="checkbox" /> Accept State Min Limit
        </label>
        <span className={styles.covOther}>
          <label className={styles.chk}>
            <input type="checkbox" defaultChecked /> <b>Other Limit:</b>
          </label>
          <input className={`${styles.inp} ${styles.inpLimit}`} defaultValue="$1,000,000" />
        </span>
      </div>

      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>PIP Supplementary Coverages:</span>
        <input className={styles.inp} placeholder="List all supplementary coverages desired" />
      </div>
      <div className={styles.italicNote}>
        (Note some state may require a coverage for example Pedestrian PIP for NJ, that will be
        added automatically)
      </div>

      <div className={styles.yn}>
        <b>General Liability</b>
        <input type="checkbox" defaultChecked className={styles.bareCheck} />
      </div>
      <YesNoRow question="Does the insured have a terminal or terminals?" />
      <div className={styles.blueItalic}>
        Please send ACCORD&apos;s 125 and 126 if General Liability is needed.
      </div>

      <div className={styles.line}>
        <b>Equipment Schedule:</b>{" "}
        <i className={styles.lightItalic}>
          (if list doesn&apos;t fit please send as separate document along with this application)
        </i>
      </div>
      {quote.vehicles.map((vehicle, i) => (
        <div key={vehicle.vin} className={styles.sched}>
          <span className={styles.schedNum}>{i + 1}.</span>
          <div className={styles.schedGrid}>
            <b>Vehicle Type</b>
            <span>{vehicle.type}</span>
            <b>VIN</b>
            <span>{vehicle.vin}</span>
            <b>Year</b>
            <span>{vehicle.year}</span>
            <b>Make</b>
            <span>{vehicle.make}</span>
          </div>
        </div>
      ))}

      <div className={styles.line}>
        <b>Driver Schedule:</b>{" "}
        <i className={styles.lightItalic}>
          (if list doesn&apos;t fit please send as separate document along with this application)
        </i>
      </div>
      {quote.drivers.map((driver, i) => (
        <div key={`${driver.licenseNumber}-${i}`} className={styles.sched}>
          <span className={styles.schedNum}>{i + 1}.</span>
          <div className={styles.schedGrid}>
            <b>Driver Names</b>
            <span>{driver.names}</span>
            <b>Date of birth</b>
            <span>N/A</span>
            <b>License Number</b>
            <span>{driver.licenseNumber}</span>
            <b>Years experience</b>
            <span>N/A</span>
          </div>
        </div>
      ))}

      <div className={styles.attestation}>
        The statements and answers given on this application are true and accurate. The applicant
        has not wilfully concealed or misrepresented any material fact or circumstance concerning
        this application.
      </div>

      <div className={styles.applicantRow}>
        <b>Applicants Name:</b>
        <input className={`${styles.inp} ${styles.inpName}`} placeholder="Name" />
        <b className={styles.underlined}>Title:</b>
        <select className={styles.sel} defaultValue="Mr.">
          <option>Mr.</option>
          <option>Ms.</option>
          <option>Mrs.</option>
        </select>
      </div>

      <div className={styles.legalNote}>
        This policy is issued by your risk retention group. Your risk retention group may not be
        subject to all the insurance laws and regulations of your state. State insurance
        insolvency guaranty funds are not for your risk retention group.
      </div>

      <div className={styles.yn}>
        <b>Applicants Signature:</b>
        <label className={styles.chk}>
          <input type="checkbox" />{" "}
          <i>I understand that checking this box constitutes a legal signature.</i>
        </label>
      </div>

      <div className={styles.dateLine}>
        <b>Date:</b> <span className={styles.dateChip}>{today}</span>
      </div>

      <div className={styles.footerBtns}>
        <button type="button" className={`${styles.qbtn} ${styles.qbtnOrange}`} onClick={onClose}>
          Close form
        </button>
        <button type="button" className={`${styles.qbtn} ${styles.qbtnTeal}`}>
          Download
        </button>
      </div>
    </div>
  );
}
