"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/features/auth/services/auth.service";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login.schema";
import styles from "./login_page.module.css";

function NightHighwayScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.glow} />
      <div className={`${styles.glow} ${styles.glowTwo}`} />
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
        <path d="M0 560 Q 240 480 480 540 T 960 520 T 1440 560 L1440 900 L0 900 Z" fill="#0b1830" opacity=".9" />
        <path d="M0 640 Q 300 570 620 630 T 1440 620 L1440 900 L0 900 Z" fill="#091326" opacity=".95" />
        <path d="M560 900 C 640 760, 820 700, 1120 660 L 1440 640 L 1440 900 Z" fill="#101d33" />
        <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity=".35">
          <path d="M760 900 L 790 850" />
          <path d="M840 800 L 875 760" />
          <path d="M930 725 L 970 695" />
          <path d="M1030 672 L 1075 654" />
          <path d="M1140 640 L 1190 630" />
        </g>
        <circle cx="1180" cy="628" r="5" fill="#ffe9a3" opacity=".9" />
        <circle cx="1196" cy="628" r="5" fill="#ffe9a3" opacity=".9" />
        <circle cx="1183" cy="606" r="2.5" fill="#ffd400" opacity=".6" />
        <g fill="#ffffff" opacity=".25">
          <circle cx="120" cy="90" r="1.4" />
          <circle cx="320" cy="150" r="1.1" />
          <circle cx="540" cy="70" r="1.3" />
          <circle cx="760" cy="130" r="1" />
          <circle cx="1000" cy="60" r="1.4" />
          <circle cx="1240" cy="140" r="1.1" />
          <circle cx="1380" cy="80" r="1.3" />
          <circle cx="210" cy="230" r="1" />
        </g>
      </svg>
    </div>
  );
}

export default function LoginPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginInput) => {
    setFormError(null);
    startTransition(async () => {
      const result = await login(values);
      if (result?.error) setFormError(result.error);
    });
  };

  return (
    <div className={styles.root}>
      <NightHighwayScene />

      <main className={styles.wrap}>
        <section className={styles.card} aria-label="Log in">
          <div className={styles.logoLockup}>
            <Image
              src="/images/vayga-logo.png"
              alt="VAYGA Insurance Partners"
              width={190}
              height={50}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.cardTitle}>Log in</div>
          <div className={styles.accentBar} />
          <div className={styles.hint}>Log in to create and manage insurance policies</div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className={styles.fieldInput}
                type="email"
                autoComplete="email"
                placeholder="johnsmith@gmail.com"
                {...register("email")}
              />
              {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}
            </div>

            <div className={`${styles.field} ${styles.fieldPassword}`}>
              <label className={styles.fieldLabel} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className={styles.fieldInput}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                {...register("password")}
              />
              {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}
            </div>

            <Link href="/reset-password" className={styles.forgot}>
              Forgot password?
            </Link>

            {formError && <p className={styles.formError}>{formError}</p>}

            <button className={styles.btnLogin} type="submit" disabled={isPending}>
              {isPending ? "Signing in…" : "Log in"}
            </button>
          </form>

          <div className={styles.divider} />
          <Link href="/quotes/new" className={styles.quoteLink}>
            Get a quote — no registration required
          </Link>
        </section>

        <section className={styles.pitch}>
          <h1>Insurance that earns better terms.</h1>
          <p className={styles.pitchSub}>
            Log in to create and manage insurance policies — specialized commercial insurance
            brokerage &amp; risk management consulting for businesses nationwide.
          </p>
          <p className={styles.pitchStrap}>Smarter Strategy. Lower Risk. Better Outcomes.</p>
        </section>
      </main>
    </div>
  );
}
