"use client";

import { useEffect, useState } from "react";
import { Check, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Phone, AlertCircle, LogIn, UserPlus } from "lucide-react";
import { Button, Label, Badge, cx } from "@/components/ui";
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

/* ---------------- Dedicated Input Components with Flex Architecture ---------------- */

function FieldWithIcon({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required = true,
  icon: Icon,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: any;
}) {
  return (
    <div className="group relative flex h-11 w-full items-center rounded-lg border border-border-strong bg-surface transition-colors focus-within:border-inverted focus-within:ring-1 focus-within:ring-inverted overflow-hidden">
      {Icon && (
        <div className="flex size-10 shrink-0 items-center justify-center text-secondary pointer-events-none select-none">
          <Icon className="size-4" />
        </div>
      )}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`h-full flex-1 min-w-0 bg-transparent text-sm text-primary placeholder:text-muted focus:outline-none border-none ring-0 shadow-none appearance-none ${
          Icon ? "pr-3.5" : "px-3.5"
        }`}
      />
    </div>
  );
}

function PasswordFieldWithIcon({
  id,
  value,
  onChange,
  placeholder = "••••••••••••",
  autoComplete = "current-password",
  required = true,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="group relative flex h-11 w-full items-center rounded-lg border border-border-strong bg-surface transition-colors focus-within:border-inverted focus-within:ring-1 focus-within:ring-inverted overflow-hidden">
      <div className="flex size-10 shrink-0 items-center justify-center text-secondary pointer-events-none select-none">
        <Lock className="size-4" />
      </div>
      <input
        id={id}
        type={show ? "text" : "password"}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-full flex-1 min-w-0 bg-transparent px-0 font-mono text-sm text-primary placeholder:text-muted focus:outline-none border-none ring-0 shadow-none appearance-none"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        title={show ? "Hide password" : "Show password"}
        tabIndex={-1}
        className="flex size-10 shrink-0 items-center justify-center text-secondary hover:text-primary transition-colors cursor-pointer outline-none"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

/* ---------------- Main Login & Registration Page ---------------- */

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
        // If account does not exist (404), prompt signup with email pre-filled
        if (res.status === 404) {
          if (targetId.includes("@")) setEmail(targetId);
          setMode("signup");
          setError("No account found with this email. Please complete your registration below to create your account.");
          return;
        }

        // If incorrect password (401), stay on login mode with clear error
        if (res.status === 401) {
          setError("Incorrect password. Please check your credentials and try again.");
          return;
        }

        setError(data.error || "Authentication failed. Please check your credentials.");
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
      setError("Unable to connect to authentication server. Please check your network connection.");
    }
  }

  async function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAccountExists(false);
    setAccountNotFound(false);

    if (!fullName || !email || !password) {
      setError("Full name, email address, and password are required.");
      return;
    }
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
      setError("Unable to connect to registration server. Please try again.");
    }
  }

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden py-12 lg:py-16">
      <div className="relative w-full max-w-5xl animate-rise px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-border bg-card/95 shadow-2xl overflow-hidden backdrop-blur-xl">

          {/* ---------------- LEFT PANEL (Obsidian Theme with DTS Orbits & Tagline) ---------------- */}
          <div className="hidden md:flex flex-col justify-between p-10 lg:p-12 bg-surface text-primary relative overflow-hidden border-r border-border">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-body-soft">
                <span className="size-1.5 rounded-full bg-neutral-500 animate-pulse" />
                ENTERPRISE MEMBER PORTAL
              </div>

              <h2 className="mt-6 font-display text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-primary">
                Where Frontier Builders Engineer the Future.
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-secondary font-normal">
                Member-governed access to technical roadmaps, paper breakdowns, and regional symposia across AI, Quantum, Cybersecurity, and AI Governance.
              </p>
            </div>

            <div className="relative z-10 my-6 py-2">
              <HeroOrbits className="max-w-[280px] lg:max-w-[320px]" />
            </div>

            <div className="relative z-10 border-t border-border/80 pt-6">
              <p className="font-sans text-xs sm:text-sm italic leading-relaxed text-body-soft">
                &ldquo;Direct peer access to quantum researchers and SOC playbooks transformed how our team deploys frontier infrastructure.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-elevated border border-border-strong flex items-center justify-center font-mono text-xs font-bold text-primary">
                  EM
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-body">Dr. Elena Marchetti</p>
                  <p className="font-mono text-[10px] text-secondary">Quantum Information Lead · Milan</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT PANEL (Direct Email & Password Form) ---------------- */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-card/95">
            <div className="flex items-center justify-between border-b pb-6 border-border">
              <Logo />
              <Badge className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="mr-1 size-3.5" /> SECURE AUTH
              </Badge>
            </div>

            {/* DONE / LOGGED IN SUCCESS */}
            {step === "done" && (
              <div className="mt-8 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl border shadow-sm border-border-strong bg-elevated text-primary">
                  <Check className="size-7" aria-hidden />
                </span>
                <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-primary">
                  Welcome to Deep Tech Community!
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-body font-medium">
                  Hello <strong className="text-primary">{fullName || loginIdentifier.split("@")[0] || email.split("@")[0] || "Member"}</strong>, you are signed in successfully.
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
                  <div className="mb-6 rounded-xl border p-3.5 text-xs border-border-strong bg-surface text-body flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0" />
                    <span>Please log in or create an account first to complete your membership application.</span>
                  </div>
                )}

                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 rounded-xl border p-1 border-border bg-surface">
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
                        ? "bg-inverted text-on-inverted shadow-sm"
                        : "text-secondary hover:text-primary"
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
                        ? "bg-inverted text-on-inverted shadow-sm"
                        : "text-secondary hover:text-primary"
                    )}
                  >
                    <UserPlus className="size-3.5" /> Create Account
                  </button>
                </div>

                <div className="mt-6">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-primary">
                    {mode === "login" ? "Access Member Portal" : "Create Practitioner Account"}
                  </h1>
                  <p className="mt-1 text-xs text-secondary">
                    {mode === "login"
                      ? "Enter your email or phone number and password to log in."
                      : "Enter your full name, email, phone number, and password."}
                  </p>
                </div>

                {/* Account Already Exists Banner */}
                {accountExists && (
                  <div role="alert" className="mt-4 rounded-xl border p-4 text-xs border-amber-800 bg-amber-950/80 text-amber-200">
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
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-amber-900/30 bg-amber-900/10 px-3 py-1.5 font-mono text-xs font-bold text-amber-100 hover:underline cursor-pointer"
                    >
                      Log in directly with {email || "your credentials"} <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Account Not Found Banner */}
                {accountNotFound && (
                  <div role="alert" className="mt-4 rounded-xl border p-4 text-xs border-border bg-surface text-body">
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
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold border-border-strong bg-elevated text-primary hover:underline cursor-pointer"
                    >
                      Create an account now <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Error Banner */}
                {error && !accountExists && !accountNotFound && (
                  <div role="alert" className="mt-4 rounded-lg border p-3 text-xs font-semibold border-red-900 bg-red-950 text-red-200">
                    {error}
                  </div>
                )}

                {/* FORM: LOG IN MODE */}
                {mode === "login" ? (
                  <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="login-identifier">EMAIL ADDRESS OR PHONE NUMBER</Label>
                      <FieldWithIcon
                        id="login-identifier"
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="name@domain.com or +91 98765 43210"
                        autoComplete="username"
                        icon={Mail}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">PASSWORD</Label>
                      </div>
                      <PasswordFieldWithIcon
                        id="login-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                      />
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
                      <FieldWithIcon
                        id="signup-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. Ada Lovelace"
                        autoComplete="name"
                        icon={User}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-email">EMAIL ADDRESS</Label>
                      <FieldWithIcon
                        id="signup-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="researcher@lab.org"
                        autoComplete="email"
                        icon={Mail}
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-phone">PHONE NUMBER (WITH COUNTRY CODE)</Label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-11 rounded-lg border border-border-strong bg-surface px-2.5 font-mono text-xs font-bold text-primary shrink-0 outline-none"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="flex-1 min-w-0">
                          <FieldWithIcon
                            id="signup-phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98765 43210"
                            autoComplete="tel"
                            icon={Phone}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-password">CREATE PASSWORD</Label>
                      <PasswordFieldWithIcon
                        id="signup-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-confirm-password">CONFIRM PASSWORD</Label>
                      <PasswordFieldWithIcon
                        id="signup-confirm-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                      />
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
