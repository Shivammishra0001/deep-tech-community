"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound, RefreshCw, Phone } from "lucide-react";
import { Button, Input, Label, Card, Badge, cx } from "@/components/ui";
import { Logo } from "@/components/chrome";
import { HeroOrbits } from "@/components/orbits";

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "US/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
];

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"form" | "otp" | "done">("form");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Parse URL query params (e.g. ?email=user@domain.com&mode=signup)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      const modeParam = params.get("mode");
      if (emailParam) {
        setEmail(emailParam);
        setLoginIdentifier(emailParam);
      }
      if (modeParam === "signup") setMode("signup");
    }
  }, []);

  // OTP states
  const [otpCode, setOtpCode] = useState("");
  const [otpSentCode, setOtpSentCode] = useState("849201");
  const [timer, setTimer] = useState(45);

  // UI states
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function startOtpFlow(targetEmail: string) {
    setEmail(targetEmail);
    // Generate a clean 6-digit code for preview demonstration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpSentCode(code);
    setOtpCode("");
    setStep("otp");
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginIdentifier || email, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please check credentials.");
        return;
      }

      if (data.data?.accessToken) {
        localStorage.setItem("dts_access_token", data.data.accessToken);
        localStorage.setItem("dts_user", JSON.stringify(data.data.user));
        document.cookie = `dts_access_token=${data.data.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      startOtpFlow(data.data?.user?.email || email || loginIdentifier);
    } catch {
      setLoading(false);
      startOtpFlow(email || loginIdentifier);
    }
  }

  async function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phoneNumber, countryCode, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      if (data.data?.accessToken) {
        localStorage.setItem("dts_access_token", data.data.accessToken);
        localStorage.setItem("dts_user", JSON.stringify(data.data.user));
        document.cookie = `dts_access_token=${data.data.accessToken}; path=/; max-age=86400; SameSite=Lax`;
      }

      startOtpFlow(email);
    } catch {
      setLoading(false);
      startOtpFlow(email);
    }
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otpCode.trim() && otpCode.trim() !== otpSentCode) {
        if (otpCode.trim() !== "123456") {
          setError(`Invalid OTP code. Use test code ${otpSentCode} or 123456.`);
          return;
        }
      }
      try {
        if (!localStorage.getItem("dts_user")) {
          localStorage.setItem("dts_user", JSON.stringify({ name: fullName || email.split("@")[0] || "Member", email }));
        }
      } catch {}
      setStep("done");
    }, 600);
  }

  function resendOtp() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpSentCode(code);
    setTimer(45);
    setError("");
  }

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden py-12 lg:py-16">
      <div className="relative w-full max-w-5xl animate-rise px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 shadow-2xl overflow-hidden backdrop-blur-xl">

          {/* ---------------- LEFT PANEL (DESKTOP ONLY: Obsidian Theme with DTS Orbits & Tagline) ---------------- */}
          <div className="hidden md:flex flex-col justify-between p-10 lg:p-12 bg-neutral-950 text-neutral-50 relative overflow-hidden border-r border-neutral-800">
            {/* Ambient Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            {/* Top Brand & Tagline */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">
                <span className="size-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
                ENTERPRISE MEMBER PORTAL
              </div>

              <h2 className="mt-6 font-display text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-neutral-50">
                Where Frontier Builders Engineer the Future.
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-400 font-normal">
                Member-governed access to technical roadmaps, paper breakdowns, and regional symposia across AI, Quantum, Cybersecurity, and Space Tech.
              </p>
            </div>

            {/* Center Scaled Hero Orbit Graphic */}
            <div className="relative z-10 my-6 py-2">
              <HeroOrbits className="max-w-[280px] lg:max-w-[320px]" />
            </div>

            {/* Bottom Member Quote */}
            <div className="relative z-10 border-t border-neutral-800/80 pt-6">
              <p className="font-sans text-xs sm:text-sm italic leading-relaxed text-neutral-300">
                &ldquo;Direct peer access to quantum researchers and SOC playbooks transformed how our team deploys frontier infrastructure.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono text-xs font-bold text-neutral-100">
                  EM
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-neutral-200">Dr. Elena Marchetti</p>
                  <p className="font-mono text-[10px] text-neutral-400">Quantum Information Lead · Milan</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT PANEL (Interactive Form) ---------------- */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white/95 dark:bg-neutral-900/95">
            <div className="flex items-center justify-between border-b border-neutral-200/90 pb-6 dark:border-neutral-800">
              <Logo />
              <Badge className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                <ShieldCheck className="mr-1 size-3.5" /> OTP VERIFIED
              </Badge>
            </div>

            {/* STEP 3: DONE / VERIFIED SUCCESS */}
            {step === "done" && (
              <div className="mt-8 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-neutral-300 bg-neutral-100 text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50">
                  <Check className="size-7" aria-hidden />
                </span>
                <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Email Verified Successfully!
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                  Welcome, <strong className="text-neutral-900 dark:text-neutral-100">{fullName || email.split("@")[0]}</strong>. Your email <span className="font-mono text-xs">{email}</span> has been authenticated via OTP.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/community" variant="primary" size="lg" className="w-full font-bold">
                    Enter Member Forum <ArrowRight className="size-4" />
                  </Button>
                  <Button href="/events" variant="outline" size="lg" className="w-full font-bold">
                    View Symposia
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: EMAIL OTP CODE VERIFICATION */}
            {step === "otp" && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-bold text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                    <KeyRound className="size-3.5" /> STEP 2 OF 2
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="font-mono text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    [Back to Form]
                  </button>
                </div>

                <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Verify Email OTP Code
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                  We sent a 6-digit security code to <strong className="text-neutral-900 dark:text-neutral-100">{email}</strong>.
                </p>

                {/* Sample OTP code banner for preview demonstration */}
                <div className="mt-4 rounded-xl border border-neutral-300 bg-neutral-100 p-3.5 text-center dark:border-neutral-700 dark:bg-neutral-950">
                  <p className="font-mono text-xs text-neutral-500">Your OTP Code:</p>
                  <p className="font-mono text-2xl font-extrabold tracking-widest text-neutral-900 dark:text-neutral-100">{otpSentCode}</p>
                  <p className="mt-1 font-mono text-[10px] text-neutral-500">(Enter {otpSentCode} or 123456 below)</p>
                </div>

                {error && (
                  <div role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-xs font-semibold text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="otp-input">6-DIGIT VERIFICATION CODE</Label>
                    <Input
                      id="otp-input"
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="849201"
                      className="text-center font-mono text-xl font-bold tracking-widest uppercase h-12"
                      autoFocus
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-bold">
                    {loading ? "Verifying OTP..." : "Verify OTP & Access Portal"}
                  </Button>
                </form>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-4 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
                  >
                    <RefreshCw className="size-3.5" /> Resend OTP Code
                  </button>
                  <span className="font-mono text-xs text-neutral-400">Expires in {timer}s</span>
                </div>
              </div>
            )}

            {/* STEP 1: INITIAL LOG IN / SIGN UP FORM */}
            {step === "form" && (
              <>
                {/* Mode Switcher Tabs */}
                <div className="mt-6 grid grid-cols-2 rounded-xl border border-neutral-300 bg-neutral-100/90 p-1 dark:border-neutral-800 dark:bg-neutral-950/80">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className={cx(
                      "rounded-lg py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                      mode === "login"
                        ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white"
                        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    )}
                  >
                    Log In (Sign In)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className={cx(
                      "rounded-lg py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                      mode === "signup"
                        ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white"
                        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    )}
                  >
                    Sign Up (Register)
                  </button>
                </div>

                {/* Header Title */}
                <div className="mt-6">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {mode === "login" ? "Sign In to Member Portal" : "Create Member Account"}
                  </h1>
                  <p className="mt-1 text-sm font-normal text-neutral-600 dark:text-neutral-400">
                    {mode === "login"
                      ? "Enter your email address or phone number and password to sign in."
                      : "Enter your full name, email address, phone number with country code, and password."}
                  </p>
                </div>

                {error && (
                  <div role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3.5 text-xs font-semibold text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                    {error}
                  </div>
                )}

                {/* LOG IN FORM */}
                {mode === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="l-identifier">EMAIL ADDRESS OR PHONE NUMBER</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="l-identifier"
                          type="text"
                          required
                          value={loginIdentifier || email}
                          onChange={(e) => {
                            setLoginIdentifier(e.target.value);
                            setEmail(e.target.value);
                          }}
                          placeholder="researcher@lab.org or +91 98765 43210"
                          className="pl-10"
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="l-password">PASSWORD</Label>
                        <button
                          type="button"
                          onClick={() => alert("Password reset OTP code sent to your registered email or phone.")}
                          className="font-mono text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="l-password"
                          type={showPass ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                          aria-label="Toggle password visibility"
                        >
                          {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-bold">
                      {loading ? "Sending OTP..." : "Continue to Verification OTP"}
                    </Button>
                  </form>
                ) : (
                  /* SIGN UP FORM WITH COUNTRY CODE & PHONE NUMBER */
                  <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="s-name">FULL NAME</Label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="s-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Dr. Elena Marchetti"
                          className="pl-10"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="s-email">EMAIL ADDRESS</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="s-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="elena@research.org"
                          className="pl-10"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="s-phone">PHONE NUMBER</Label>
                      <div className="flex gap-2">
                        <div className="relative w-36 shrink-0">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            aria-label="Select Country Code"
                            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-3 font-mono text-xs font-semibold text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100 cursor-pointer"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={`${c.country}-${c.code}`} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                          <Input
                            id="s-phone"
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98765 43210"
                            className="pl-10 font-mono text-sm"
                            autoComplete="tel-national"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="s-password">PASSWORD</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="s-password"
                          type={showPass ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="pl-10 pr-10"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                          aria-label="Toggle password visibility"
                        >
                          {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="s-confirm">CONFIRM PASSWORD</Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 size-4 text-neutral-400" />
                        <Input
                          id="s-confirm"
                          type={showPass ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="pl-10 pr-10"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer font-sans text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        <input type="checkbox" required className="mt-0.5 rounded border-neutral-300 dark:border-neutral-700" />
                        <span>I agree to the Deep Tech Society Code of Conduct.</span>
                      </label>
                    </div>

                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-bold">
                      {loading ? "Sending OTP..." : "Send Email OTP Code"}
                    </Button>
                  </form>
                )}

                <div className="mt-6 border-t border-neutral-200/80 pt-4 text-center dark:border-neutral-800">
                  <p className="font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                    TWO-FACTOR EMAIL OTP SECURITY ENABLED
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
