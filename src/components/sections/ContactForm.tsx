'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { routes, form, office } from '@/content/contact';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

type Field = 'name' | 'email' | 'message';

export function ContactForm({ locale, defaultRoute }: { locale: Locale; defaultRoute?: string }) {
  const tr = pick(locale);
  const [route, setRoute] = useState<string>(defaultRoute ?? routes[0].key);
  const [values, setValues] = useState({ name: '', email: '', org: '', message: '' });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const errors: Record<Field, string | null> = {
    name: values.name.trim() ? null : tr(form.required),
    email: !values.email.trim()
      ? tr(form.required)
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ? null
        : tr(form.invalidEmail),
    message: values.message.trim() ? null : tr(form.required),
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    // No backend yet — surface a success state (deferred per plan).
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-card border border-hairline bg-paper p-10 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-electric/15 text-2xl text-electric">
          ✓
        </div>
        <p className="mt-6 text-lead text-ink">{tr(form.success)}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-card border border-hairline bg-paper p-7 md:p-10">
      {/* Route selector (custom, not a native select) */}
      <fieldset className="mb-7">
        <legend className="mb-3 text-sm font-medium text-ink/80">{tr(form.routeLabel)}</legend>
        <div className="flex flex-wrap gap-2.5">
          {routes.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRoute(r.key)}
              aria-pressed={route === r.key}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                route === r.key
                  ? 'border-electric bg-electric/10 text-electric'
                  : 'border-hairline text-muted hover:border-ink/30 hover:text-ink',
              )}
            >
              {tr(r.label)}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label={tr(form.name)}
          value={values.name}
          onChange={(v) => setValues((s) => ({ ...s, name: v }))}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          error={touched.name ? errors.name : null}
          required
        />
        <TextInput
          label={tr(form.email)}
          type="email"
          value={values.email}
          onChange={(v) => setValues((s) => ({ ...s, email: v }))}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={touched.email ? errors.email : null}
          required
        />
      </div>

      <div className="mt-5">
        <TextInput
          label={tr(form.org)}
          value={values.org}
          onChange={(v) => setValues((s) => ({ ...s, org: v }))}
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-ink/80">
          {tr(form.message)} <span className="text-electric">*</span>
        </label>
        <textarea
          value={values.message}
          onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          rows={5}
          className={cn(
            'w-full resize-y rounded-xl border bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-electric',
            touched.message && errors.message ? 'border-danger/60' : 'border-hairline',
          )}
        />
        <AnimatePresence>
          {touched.message && errors.message && <FieldError msg={errors.message} />}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-faint">
          {tr(office.city)} · {office.email}
        </p>
        <Button variant="primary" size="lg" disabled={!isValid} className={cn(!isValid && 'cursor-not-allowed')}>
          {tr(form.submit)}
        </Button>
      </div>
    </form>
  );
}

function TextInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink/80">
        {label} {required && <span className="text-electric">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          'h-12 w-full rounded-xl border bg-paper px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-electric',
          error ? 'border-danger/60' : 'border-hairline',
        )}
      />
      <AnimatePresence>{error && <FieldError msg={error} />}</AnimatePresence>
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="mt-1.5 text-xs text-danger"
    >
      {msg}
    </motion.p>
  );
}
