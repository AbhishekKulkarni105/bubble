"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, CalendarDays, Sun, Moon, Menu } from "lucide-react";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { NotificationPanel } from "./NotificationPanel";
import { useUIStore } from "@/stores/ui-store";
import styles from "./Topbar.module.css";

interface TopbarProps {
  userEmail?: string | null;
}

function labelFromSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Platform", active: true }];
  return [
    { label: "Platform", active: false },
    ...segments.map((segment, i) => ({
      label: labelFromSegment(segment),
      active: i === segments.length - 1,
    })),
  ];
}

export function Topbar({ userEmail }: TopbarProps) {
  const crumbs = useBreadcrumb();
  const toggleMobileNav = useUIStore((s) => s.toggleMobileNav);
  const [isLight, setIsLight] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "VV";

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={styles.hamburger}
        onClick={toggleMobileNav}
        aria-label="Open navigation menu"
      >
        <Menu />
      </button>

      <div className={styles.breadcrumb}>
        {crumbs.map((crumb, i) => (
          <span key={`${crumb.label}-${i}`} className={crumb.active ? styles.active : undefined}>
            {i > 0 ? <span className={styles.sep}>›</span> : null}
            {crumb.label}
          </span>
        ))}
      </div>

      <div className={styles.search}>
        <Search />
        <input type="search" placeholder="Search…" aria-label="Search" />
      </div>

      <div className={styles.divider} />

      <button type="button" className={styles.dateBtn}>
        <CalendarDays />
        Jun 2025 – Jul 2026
      </button>

      <div className={styles.actions}>
        {/* <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setIsLight((v) => !v)}
          aria-label="Toggle theme"
        >
          {isLight ? <Sun /> : <Moon />}
        </button> */}

        <NotificationPanel />

        <div className={styles.profileWrap} ref={profileRef}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => setProfileOpen((v) => !v)}
            aria-expanded={profileOpen}
          >
            <span className={styles.avatar}>{initials}</span>
            <span className={styles.profileName}>{userEmail ?? "Account"}</span>
          </button>

          {profileOpen ? (
            <div className={styles.profileMenu} role="menu">
              <div className={styles.profileMenuHeader}>
                <div className={styles.profileMenuName}>{userEmail ?? "Account"}</div>
                <div className={styles.profileMenuRole}>VAYGA Platform</div>
              </div>
              <LogoutButton />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
