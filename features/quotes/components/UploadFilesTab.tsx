"use client";

import { useState } from "react";
import styles from "./UploadFilesTab.module.css";

const FILE_TYPES = ["ID Card", "Signed Application", "Loss Runs", "MVR", "Other"] as const;

export function UploadFilesTab() {
  const [fileType, setFileType] = useState<string>(FILE_TYPES[0]);

  return (
    <div className={styles.panel}>
      <div className={styles.band}>Upload files for your insurance quote</div>

      <div className={styles.box}>
        <div className={`${styles.strip} ${styles.stripGrey}`}>Choose type of file to upload:</div>
        <div className={styles.selectRow}>
          <select
            className={styles.sel}
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          >
            {FILE_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="button" className={`${styles.strip} ${styles.stripBlue}`}>
          Choose &apos;{fileType}&apos; file(s) to upload
        </button>
        <div className={styles.note}>
          A maximum of 10 files can be uploaded at once, with each file not exceeding 100 MB in
          size.
        </div>
        <div className={`${styles.strip} ${styles.stripGrey}`}>Files list (0)</div>
        <div className={`${styles.strip} ${styles.stripPink}`}>No files added</div>
      </div>
    </div>
  );
}
