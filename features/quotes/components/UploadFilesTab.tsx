"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./UploadFilesTab.module.css";

const FILE_TYPES = ["ID Card","Driver's License","Policy Image","Proof of Experience","Application","Vehicles List" ,"Drivers List","Notice of Cancellation","Notice of Reinstatement","IFTA","Signed Application", "Loss Runs", "MVR", "Other"] as const;

const ACCEPTED_TYPES = ".csv,.png,.jpg,.jpeg,.pdf";
const ACCEPTED_EXTENSIONS = ["csv", "png", "jpg", "jpeg", "pdf"];
const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export type UploadedFile = {
  id: string;
  file: File;
  fileType: string;
};

type UploadFilesTabProps = {
  /** Called whenever the validated file selection changes, so a parent
   *  "Submit" action can upload them later. */
  onFilesChange?: (files: UploadedFile[]) => void;
};

function getExtension(name: string): string {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadFilesTab({ onFilesChange }: UploadFilesTabProps = {}) {
  const [fileType, setFileType] = useState<string>(FILE_TYPES[0]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  const handleChooseClick = () => {
    setError(null);
    inputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    // Allow re-selecting the same file later
    e.target.value = "";

    if (selected.length === 0) return;

    const errors: string[] = [];
    const accepted: UploadedFile[] = [];

    for (const file of selected) {
      const ext = getExtension(file.name);
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        errors.push(`"${file.name}" is not a supported type (allowed: CSV, PNG, JPG, PDF).`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`"${file.name}" exceeds the 100 MB size limit.`);
        continue;
      }
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        fileType,
      });
    }

    setFiles((prev) => {
      const room = MAX_FILES - prev.length;
      if (accepted.length > room) {
        errors.push(`You can upload a maximum of ${MAX_FILES} files. Only the first ${room} were added.`);
      }
      return [...prev, ...accepted.slice(0, Math.max(room, 0))];
    });

    setError(errors.length > 0 ? errors.join(" ") : null);
  };

  const handleRemove = (id: string) => {
    setError(null);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

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

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES}
          onChange={handleFilesSelected}
          className={styles.hiddenInput}
        />
        <button
          type="button"
          className={`${styles.strip} ${styles.stripBlue}`}
          onClick={handleChooseClick}
        >
          Choose &apos;{fileType}&apos; file(s) to upload
        </button>

        <div className={styles.note}>
          A maximum of 10 files can be uploaded at once, with each file not exceeding 100 MB in
          size.
        </div>

        {error && <div className={`${styles.strip} ${styles.stripPink}`}>{error}</div>}

        <div className={`${styles.strip} ${styles.stripGrey}`}>Files list ({files.length})</div>

        {files.length === 0 ? (
          <div className={`${styles.strip} ${styles.stripPink}`}>No files added</div>
        ) : (
          <ul className={styles.fileList}>
            {files.map((f) => (
              <li key={f.id} className={styles.fileItem}>
                <div className={styles.fileMeta}>
                  <span className={styles.fileName}>{f.file.name}</span>
                  <span className={styles.fileSub}>
                    {f.fileType} · {formatSize(f.file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemove(f.id)}
                  aria-label={`Remove ${f.file.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
