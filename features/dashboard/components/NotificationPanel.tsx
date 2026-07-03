"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import type { AppNotification } from "../types/dashboard.types";
import styles from "./NotificationPanel.module.css";

const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "SATURN EXPRESS INC",
    description: "Quote needs review before it can be generated.",
    timeLabel: "3h ago",
    read: false,
  },
  {
    id: "n2",
    title: "NM CARRIER INC",
    description: "Pending documents are still outstanding.",
    timeLabel: "1h ago",
    read: false,
  },
  {
    id: "n3",
    title: "EAST 2 WEST EXPRESS INC",
    description: "Policy POL-2026-00441 approved.",
    timeLabel: "18m ago",
    read: false,
  },
  {
    id: "n4",
    title: "JS TRANZ LLC",
    description: "New quote generated — $66,858.18.",
    timeLabel: "2m ago",
    read: true,
  },
];

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell />
        {unreadCount > 0 ? <span className={styles.dot} /> : null}
      </button>

      {open ? (
        <div className={styles.panel} role="menu">
          <div className={styles.panelHeader}>Notifications</div>
          {NOTIFICATIONS.length === 0 ? (
            <div className={styles.empty}>You&apos;re all caught up.</div>
          ) : (
            NOTIFICATIONS.map((item) => (
              <div className={styles.item} key={item.id}>
                <span className={`${styles.itemDot} ${item.read ? styles.itemDotRead : ""}`} />
                <div className={styles.itemBody}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemDesc}>{item.description}</div>
                  <div className={styles.itemTime}>{item.timeLabel}</div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
