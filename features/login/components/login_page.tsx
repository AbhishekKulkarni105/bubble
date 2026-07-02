"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/features/auth/services/auth.service";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login.schema";
import styles from "./login_page.module.css";

interface Particle {
  left: string;
  width: string;
  height: string;
  animationDuration: string;
  animationDelay: string;
}

function TruckIllustration() {
  return (
    <svg
      viewBox="0 0 760 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter:
          "drop-shadow(0 24px 70px rgba(0,0,90,.9)) drop-shadow(0 0 55px rgba(59,130,246,.2))",
      }}
    >
      <ellipse cx="380" cy="390" rx="340" ry="13" fill="rgba(0,0,0,.6)" />

      <path
        d="M16 108 L490 108 L506 130 L0 130 Z"
        fill="rgba(20,52,128,.92)"
        stroke="rgba(99,165,255,.28)"
        strokeWidth="1"
      />
      <rect
        x="0"
        y="130"
        width="490"
        height="196"
        fill="rgba(10,28,88,.94)"
        stroke="rgba(99,165,255,.26)"
        strokeWidth="1.1"
      />
      <path
        d="M490 130 L506 108 L506 308 L490 326 Z"
        fill="rgba(5,14,50,.97)"
        stroke="rgba(99,165,255,.18)"
        strokeWidth=".9"
      />
      <rect x="0" y="130" width="490" height="5" fill="rgba(140,185,255,.14)" />

      <line x1="0" y1="165" x2="490" y2="165" stroke="rgba(99,165,255,.13)" strokeWidth=".9" />
      <line x1="0" y1="200" x2="490" y2="200" stroke="rgba(99,165,255,.09)" strokeWidth=".8" />
      <line x1="0" y1="236" x2="490" y2="236" stroke="rgba(99,165,255,.09)" strokeWidth=".8" />
      <line x1="0" y1="272" x2="490" y2="272" stroke="rgba(99,165,255,.13)" strokeWidth=".9" />
      <line x1="122" y1="130" x2="122" y2="326" stroke="rgba(99,165,255,.08)" strokeWidth=".9" />
      <line x1="244" y1="130" x2="244" y2="326" stroke="rgba(99,165,255,.08)" strokeWidth=".9" />
      <line x1="368" y1="130" x2="368" y2="326" stroke="rgba(99,165,255,.08)" strokeWidth=".9" />
      <rect
        x="8"
        y="138"
        width="474"
        height="180"
        rx="3"
        fill="none"
        stroke="rgba(99,165,255,.15)"
        strokeWidth="1"
      />

      <rect x="10" y="298" width="46" height="12" rx="3" fill="rgba(210,38,38,.9)" />
      <rect x="434" y="298" width="46" height="12" rx="3" fill="rgba(210,38,38,.9)" />
      <rect x="10" y="136" width="46" height="10" rx="3" fill="rgba(245,208,48,.8)" />
      <rect x="434" y="136" width="46" height="10" rx="3" fill="rgba(245,208,48,.8)" />

      <path
        d="M492 130 Q500 112 520 104 L668 104 L700 130 Z"
        fill="rgba(14,38,112,.93)"
        stroke="rgba(99,165,255,.32)"
        strokeWidth="1"
      />
      <path
        d="M502 128 Q514 72 566 60 L666 60 L700 104 L668 104 Q636 78 586 80 Q546 86 524 114 Z"
        fill="rgba(9,24,78,.96)"
        stroke="rgba(99,165,255,.28)"
        strokeWidth="1"
      />
      <path
        d="M492 130 L700 130 L704 326 L492 326 Z"
        fill="rgba(8,20,70,.97)"
        stroke="rgba(99,165,255,.36)"
        strokeWidth="1.2"
      />

      <path
        d="M506 140 Q514 96 564 84 L660 84 Q686 88 692 128 L692 210 L506 210 Z"
        fill="rgba(22,60,158,.43)"
        stroke="rgba(99,165,255,.54)"
        strokeWidth="1.2"
      />
      <path
        d="M508 142 Q516 98 562 86 L598 86 L590 150 L508 158 Z"
        fill="rgba(255,255,255,.05)"
      />
      <line x1="598" y1="84" x2="598" y2="210" stroke="rgba(99,165,255,.36)" strokeWidth="1.3" />
      <line
        x1="548"
        y1="208"
        x2="510"
        y2="156"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <line
        x1="652"
        y1="208"
        x2="682"
        y2="158"
        stroke="rgba(255,255,255,.4)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <rect
        x="494"
        y="222"
        width="126"
        height="92"
        rx="3"
        fill="none"
        stroke="rgba(99,165,255,.18)"
        strokeWidth="1"
      />
      <rect
        x="498"
        y="226"
        width="118"
        height="46"
        rx="2.5"
        fill="rgba(22,60,150,.3)"
        stroke="rgba(99,165,255,.18)"
        strokeWidth=".9"
      />
      <rect x="604" y="272" width="14" height="5" rx="2.5" fill="rgba(255,255,255,.54)" />
      <rect
        x="494"
        y="316"
        width="126"
        height="10"
        rx="2"
        fill="rgba(10,28,90,.92)"
        stroke="rgba(99,165,255,.18)"
        strokeWidth=".8"
      />
      <line x1="510" y1="318" x2="510" y2="325" stroke="rgba(99,165,255,.28)" strokeWidth="1" />
      <line x1="528" y1="318" x2="528" y2="325" stroke="rgba(99,165,255,.28)" strokeWidth="1" />
      <line x1="546" y1="318" x2="546" y2="325" stroke="rgba(99,165,255,.28)" strokeWidth="1" />

      <rect
        x="672"
        y="26"
        width="12"
        height="108"
        rx="6"
        fill="rgba(28,52,112,.94)"
        stroke="rgba(99,165,255,.3)"
        strokeWidth="1"
      />
      <rect
        x="690"
        y="36"
        width="10"
        height="96"
        rx="5"
        fill="rgba(24,46,100,.88)"
        stroke="rgba(99,165,255,.24)"
        strokeWidth=".9"
      />
      <ellipse
        cx="678"
        cy="26"
        rx="8"
        ry="4.5"
        fill="rgba(38,68,132,.9)"
        stroke="rgba(99,165,255,.42)"
        strokeWidth="1"
      />
      <circle cx="678" cy="14" r="12" fill="rgba(160,185,225,.1)" />
      <circle cx="672" cy="2" r="9" fill="rgba(160,185,225,.07)" />

      <rect
        x="700"
        y="226"
        width="18"
        height="72"
        rx="3"
        fill="rgba(11,32,94,.93)"
        stroke="rgba(99,165,255,.28)"
        strokeWidth="1"
      />
      <line x1="709" y1="230" x2="709" y2="294" stroke="rgba(99,165,255,.28)" strokeWidth="1.2" />
      <line x1="701" y1="241" x2="717" y2="241" stroke="rgba(99,165,255,.2)" strokeWidth=".8" />
      <line x1="701" y1="254" x2="717" y2="254" stroke="rgba(99,165,255,.2)" strokeWidth=".8" />
      <line x1="701" y1="267" x2="717" y2="267" stroke="rgba(99,165,255,.2)" strokeWidth=".8" />
      <line x1="701" y1="280" x2="717" y2="280" stroke="rgba(99,165,255,.2)" strokeWidth=".8" />
      <rect
        x="700"
        y="300"
        width="18"
        height="24"
        rx="3"
        fill="rgba(14,40,106,.94)"
        stroke="rgba(99,165,255,.24)"
        strokeWidth="1"
      />

      <rect x="698" y="200" width="20" height="22" rx="4" fill="rgba(255,238,88,.95)" />
      <rect x="698" y="224" width="20" height="11" rx="2" fill="rgba(255,215,55,.68)" />
      <ellipse cx="708" cy="211" rx="28" ry="16" fill="rgba(255,238,88,.12)" />

      <circle cx="492" cy="144" r="7" fill="rgba(255,212,50,.92)" />
      <circle cx="492" cy="322" r="7" fill="rgba(205,38,38,.92)" />

      <rect
        x="472"
        y="320"
        width="30"
        height="10"
        rx="3"
        fill="rgba(26,56,118,.9)"
        stroke="rgba(99,165,255,.22)"
        strokeWidth=".9"
      />

      <rect x="96" y="326" width="9" height="36" rx="2.5" fill="rgba(16,42,100,.9)" />
      <rect x="80" y="358" width="40" height="6" rx="2" fill="rgba(16,42,100,.9)" />
      <rect x="216" y="326" width="9" height="36" rx="2.5" fill="rgba(16,42,100,.9)" />
      <rect x="200" y="358" width="40" height="6" rx="2" fill="rgba(16,42,100,.9)" />

      <rect
        x="0"
        y="324"
        width="494"
        height="10"
        rx="3"
        fill="rgba(11,28,84,.92)"
        stroke="rgba(99,165,255,.16)"
        strokeWidth=".8"
      />
      <rect
        x="494"
        y="324"
        width="214"
        height="10"
        rx="3"
        fill="rgba(9,24,78,.92)"
        stroke="rgba(99,165,255,.16)"
        strokeWidth=".8"
      />

      {[
        { cx: 142, cxHub: 152 },
        { cx: 274, cxHub: 284 },
        { cx: 556, cxHub: 566 },
        { cx: 662, cxHub: 672 },
      ].map((wheel, i) => (
        <g key={i}>
          <ellipse
            cx={wheel.cx}
            cy="356"
            rx="9"
            ry="28"
            fill="rgba(5,12,40,.93)"
            stroke="rgba(99,165,255,.2)"
            strokeWidth=".9"
          />
          <circle
            cx={wheel.cxHub}
            cy="356"
            r="28"
            fill="rgba(6,14,48,.97)"
            stroke="rgba(99,165,255,.46)"
            strokeWidth="2"
          />
          <circle
            cx={wheel.cxHub}
            cy="356"
            r="17"
            fill="rgba(10,26,78,.93)"
            stroke="rgba(99,165,255,.26)"
            strokeWidth="1.1"
          />
          <circle cx={wheel.cxHub} cy="356" r="6.5" fill="rgba(99,165,255,.76)" />
          <line
            x1={wheel.cxHub}
            y1="338"
            x2={wheel.cxHub}
            y2="374"
            stroke="rgba(99,165,255,.34)"
            strokeWidth="1.3"
          />
          <line
            x1={wheel.cxHub - 18}
            y1="356"
            x2={wheel.cxHub + 18}
            y2="356"
            stroke="rgba(99,165,255,.34)"
            strokeWidth="1.3"
          />
          <line
            x1={wheel.cxHub - 13}
            y1="343"
            x2={wheel.cxHub + 13}
            y2="369"
            stroke="rgba(99,165,255,.22)"
            strokeWidth="1.1"
          />
          <line
            x1={wheel.cxHub + 13}
            y1="343"
            x2={wheel.cxHub - 13}
            y2="369"
            stroke="rgba(99,165,255,.22)"
            strokeWidth="1.1"
          />
        </g>
      ))}

      <line x1="0" y1="386" x2="760" y2="386" stroke="rgba(99,165,255,.1)" strokeWidth="1.3" />
      <rect x="20" y="388" width="60" height="4" rx="2" fill="rgba(255,255,255,.06)" />
      <rect x="170" y="388" width="60" height="4" rx="2" fill="rgba(255,255,255,.06)" />
      <rect x="320" y="388" width="60" height="4" rx="2" fill="rgba(255,255,255,.06)" />
      <rect x="470" y="388" width="60" height="4" rx="2" fill="rgba(255,255,255,.06)" />
      <rect x="620" y="388" width="60" height="4" rx="2" fill="rgba(255,255,255,.06)" />
    </svg>
  );
}

export default function LoginPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    const generated = Array.from({ length: 24 }, () => {
      const size = 1 + Math.random() * 2.4;
      return {
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${7 + Math.random() * 8}s`,
        animationDelay: `${Math.random() * 10}s`,
      };
    });
    setParticles(generated);
  }, []);

  const onSubmit = (values: LoginInput) => {
    setFormError(null);
    startTransition(async () => {
      const result = await login(values);
      if (result?.error) setFormError(result.error);
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.formInner}>
          <div className={styles.loginTitle}>Log in</div>
          <div className={styles.loginSub}>
            Log in to create and manage insurance policies
          </div>

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

            <div className={`${styles.field} ${styles.f2}`}>
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
              <Link href="/reset-password" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            {formError && <p className={styles.formError}>{formError}</p>}

            <button className={styles.btnLogin} type="submit" disabled={isPending}>
              <span className={styles.btnShine} />
              {isPending ? "Signing in…" : "Log In"}
            </button>
          </form>

          <Link href="/quotes/new" className={styles.quoteLink}>
            Get a quote - no registration required
          </Link>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rGrid} />
        <div className={`${styles.rOrb} ${styles.ro1}`} />
        <div className={`${styles.rOrb} ${styles.ro2}`} />
        <div className={`${styles.rOrb} ${styles.ro3}`} />
        <div className={styles.pts}>
          {particles.map((particle, i) => (
            <div
              key={i}
              className={styles.pt}
              style={{
                left: particle.left,
                bottom: "-10px",
                width: particle.width,
                height: particle.height,
                animationDuration: particle.animationDuration,
                animationDelay: particle.animationDelay,
              }}
            />
          ))}
        </div>

        <div className={styles.panelLogo}>
          <Image src="/icons/mtm_logo.png" alt="Motor Transport Managers, LLC" width={207} height={87} />
        </div>

        <div className={styles.truckScene}>
          <TruckIllustration />
        </div>

        <div className={styles.panelTagline}>
          <h2>
            Haul smarter.
            <br />
            Stay covered.
          </h2>
          <p>Commercial trucking insurance — from single rigs to full fleets.</p>
        </div>
      </div>
    </div>
  );
}
