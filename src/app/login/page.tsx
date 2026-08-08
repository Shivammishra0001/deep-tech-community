"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Phone, AlertCircle, LogIn, UserPlus } from "lucide-react";
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
  const [step, setStep] = useState<"form" | "done">("form");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // UI states
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accountExists, setAccountExists] = useState(false);
  const [accountNotFound, setAccountNotFound] = useState(false);

  // Parse URL query params (e.g. ?email=user@domain.com&mode=signup&redirect=/join)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      const modeParam = params.get("mode");
      const redirectParam = params.get("redirect");
      if (emailParam) {
        setEmail(emailParam);
        setLoginIdentifier(emailParam);
      }
      if (modeParam === "signup") setMode("signup");
      if (redirectParam) setRedirectPath(redirectParam);
    }
  }, []);

  function handleSuccessAuth(userData: { name: string; email: string }, accessToken?: string) {
    try {
      if (accessToken) {
        localStorage.setItem("dts_access_token", accessToken);
        document.cookie = `dts_access_token=${accessToken}; path=/; max-age=86400; SameSite=Lax`;
      }
      localStorage.setItem("dts_user", JSON.stringify(userData));
    } catch {}

    if (redirectPath) {
      window.location.href = redirectPath;
      return;
    }

    setStep("done");
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAccountExists(false);
    setAccountNotFound(false);
    setLoading(true);

    const targetId = (loginIdentifier || email).trim();
    if (!targetId || !password) {
      setLoading(false);
      setError("Please enter your email or phone number and password.");
      return;
    }

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: targetId, password }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setAccountNotFound(true);
        setError(data.error || "No account found with this email or phone number.");
        return;
      }

      handleSuccessAuth(
        {
          name: data.data?.user?.fullName || targetId.split("@")[0] || "Member",
          email: data.data?.user?.email || targetId,
        },
        data.data?.accessToken
      );
    } catch {
      setLoading(false);
      handleSuccessAuth({ name: targetId.split("@")[0] || "Member", email: targetId });
    }
  }

  async function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAccountExists(false);
    setAccountNotFound(false);

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
        if (res.status === 409 || data.error?.toLowerCase().includes("exist")) {
          setAccountExists(true);
          setError("An account with this email address already exists.");
          return;
        }
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      handleSuccessAuth(
        {
          name: fullName || email.split("@")[0] || "Member",
          email,
        },
        data.data?.accessToken
      );
    } catch {
      setLoading(false);
      handleSuccessAuth({ name: fullName || email.split("@")[0] || "Member", email });
    }
  }

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden py-12 lg:py-16">
      <div className="relative w-full max-w-5xl animate-rise px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 shadow-2xl overflow-hidden backdrop-blur-xl">

          {/* ---------------- LEFT PANEL (Obsidian Theme with DTS Orbits & Tagline) ---------------- */}
          <div className="hidden md:flex flex-col justify-between p-10 lg:p-12 bg-neutral-950 text-neutral-50 relative overflow-hidden border-r border-neutral-800">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

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

            <div className="relative z-10 my-6 py-2">
              <HeroOrbits className="max-w-[280px] lg:max-w-[320px]" />
            </div>

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

          {/* ---------------- RIGHT PANEL (Direct Email & Password Form) ---------------- */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white/95 dark:bg-neutral-900/95">
            <div className="flex items-center justify-between border-b border-neutral-200/90 pb-6 dark:border-neutral-800">
              <Logo />
              <Badge className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                <ShieldCheck className="mr-1 size-3.5" /> SECURE AUTH
              </Badge>
            </div>

            {/* DONE / LOGGED IN SUCCESS */}
            {step === "done" && (
              <div className="mt-8 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-neutral-300 bg-neutral-100 text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50">
                  <Check className="size-7" aria-hidden />
                </span>
                <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  Authenticated Successfully!
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-normal">
                  Welcome back, <strong className="text-neutral-900 dark:text-neutral-100">{fullName || loginIdentifier.split("@")[0] || email.split("@")[0] || "Member"}</strong>.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={redirectPath || "/community"} variant="primary" size="lg" className="w-full font-bold">
                    {redirectPath ? "Continue to Application" : "Enter Member Forum"} <ArrowRight className="size-4" />
                  </Button>
                  <Button href="/events" variant="outline" size="lg" className="w-full font-bold">
                    View Symposia
                  </Button>
                </div>
              </div>
            )}

            {step === "form" && (
              <div className="mt-6">
                {/* Redirect Banner Notice */}
                {redirectPath && (
                  <div className="mb-6 rounded-xl border border-neutral-300 bg-neutral-100 p-3.5 text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>Please log in or create an account first to complete your membership application.</span>
                  </div>
                )}

                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 rounded-xl border border-neutral-300 p-1 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                      setAccountExists(false);
                      setAccountNotFound(false);
                    }}
                    className={cx(
                      "rounded-lg py-2 font-display text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                      mode === "login"
                        ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    )}
                  >
                    <LogIn className="size-3.5" /> Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                      setAccountExists(false);
                      setAccountNotFound(false);
                    }}
                    className={cx(
                      "rounded-lg py-2 font-display text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                      mode === "signup"
                        ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-950 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                    )}
                  >
                    <UserPlus className="size-3.5" /> Sign Up
                  </button>
                </div>

                <div className="mt-6">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {mode === "login" ? "Access Member Portal" : "Create Practitioner Account"}
                  </h1>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {mode === "login"
                      ? "Enter your email or phone number and password to log in."
                      : "Enter your full name, email, phone number, and password."}
                  </p>
                </div>

                {/* Account Already Exists Banner */}
                {accountExists && (
                  <div role="alert" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/80 dark:text-amber-200">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="size-4 shrink-0" /> Account Already Exists
                    </p>
                    <p className="mt-1">An account with this email address is already registered.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginIdentifier(email);
                        setMode("login");
                        setError("");
                        setAccountExists(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-amber-900/30 bg-amber-900/10 px-3 py-1.5 font-mono text-xs font-bold text-amber-950 dark:text-amber-100 hover:underline cursor-pointer"
                    >
                      Log in directly with {email || "your credentials"} <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Account Not Found Banner */}
                {accountNotFound && (
                  <div role="alert" className="mt-4 rounded-xl border border-neutral-300 bg-neutral-100 p-4 text-xs text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="size-4 shrink-0" /> Account Not Found
                    </p>
                    <p className="mt-1">No account was found with this email or phone number.</p>
                    <button
                      type="button"
                      onClick={() => {
                        if (loginIdentifier.includes("@")) setEmail(loginIdentifier);
                        setMode("signup");
                        setError("");
                        setAccountNotFound(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-neutral-400 bg-neutral-200 px-3 py-1.5 font-mono text-xs font-bold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 hover:underline cursor-pointer"
                    >
                      Create an account now <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Error Banner */}
                {error && !accountExists && !accountNotFound && (
                  <div role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-xs font-semibold text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                    {error}
                  </div>
                )}

                {/* FORM: LOG IN MODE */}
                {mode === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="login-identifier">EMAIL ADDRESS OR PHONE NUMBER</Label>
                      <div className="relative">
                        <Input
                          id="login-identifier"
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="name@domain.com or +91 98765 43210"
                          className="pl-9"
                          autoComplete="username"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">PASSWORD</Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPass ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="pl-9 pr-10"
                          autoComplete="current-password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        >
                          {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-bold mt-2">
                      {loading ? "Authenticating..." : "Log In & Continue"}
                    </Button>
                  </form>
                ) : (
                  /* FORM: SIGN UP MODE */
                  <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="signup-name">FULL NAME</Label>
                      <div className="relative">
                        <Input
                          id="signup-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Dr. Ada Lovelace"
                          className="pl-9"
                          autoComplete="name"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-email">EMAIL ADDRESS</Label>
                      <div className="relative">
                        <Input
                          id="signup-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="researcher@lab.org"
                          className="pl-9"
                          autoComplete="email"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-phone">PHONE NUMBER (WITH COUNTRY CODE)</Label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-950 px-2.5 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="relative flex-1">
                          <Input
                            id="signup-phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98765 43210"
                            className="pl-9 font-mono text-sm"
                            autoComplete="tel"
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-password">CREATE PASSWORD</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPass ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="pl-9 pr-10"
                          autoComplete="new-password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                        >
                          {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-confirm-password">CONFIRM PASSWORD</Label>
                      <div className="relative">
                        <Input
                          id="signup-confirm-password"
                          type={showPass ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="pl-9 pr-10"
                          autoComplete="new-password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                      </div>
                    </div>

                    <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full font-bold mt-2">
                      {loading ? "Creating Account..." : "Create Account & Continue"}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
