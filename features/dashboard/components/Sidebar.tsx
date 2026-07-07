"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  Building2,
  FileText,
  ShieldCheck,
  Search,
  Users,
  UserPlus,
  Mail,
  Plus,
} from "lucide-react";
import type { NavSection } from "../types/dashboard.types";
import { useUIStore } from "@/stores/ui-store";
import styles from "./Sidebar.module.css";

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Platform",
    items: [
      { label: "Agencies", href: "/agency", icon: Building2 },
      { label: "Quotes", href: "/quotes", icon: FileText },
      { label: "Prospects", href: "/prospects", icon: Search },
      { label: "Policies", href: "/policies", icon: ShieldCheck },
      { label: "Insureds", href: "/insureds", icon: Users },
    ],
  },
  {
    label: "Administration",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Invite User", href: "/invite-user", icon: UserPlus },
      { label: "Invitations", href: "/invitations", icon: Mail },
    ],
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen);
  const closeMobileNav = useUIStore((s) => s.closeMobileNav);

  return (
    <>
      <div
        className={`${styles.overlay} ${mobileNavOpen ? styles.overlayVisible : ""}`}
        onClick={closeMobileNav}
        aria-hidden="true"
      />
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logoRow}>
        <div className={styles.logoChip}>
          <Image
            src="/images/vayga-logo.png"
            alt="VAYGA Insurance Partners"
            width={150}
            height={40}
            priority
          />
        </div>
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className={styles.sectionLabel}>{section.label}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMobileNav}
                >
                  <Icon className={styles.navIcon} />
                  <span>{item.label}</span>
                  {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <Link href="/quotes/new" className={styles.getQuoteBtn} onClick={closeMobileNav}>
          <Plus size={14} strokeWidth={2.5} />
          Get Quote
        </Link>
      </div>
      </aside>
    </>
  );
}
