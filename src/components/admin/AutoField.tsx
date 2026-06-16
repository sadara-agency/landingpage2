'use client';

import { isBilingual, isImageKey, isLongTextKey, type Path } from '@/lib/admin/jsonPath';
import { ImageInput } from './ImageInput';

type Props = {
  value: unknown;
  path: Path;
  label?: string;
  onChange: (path: Path, value: unknown) => void;
};

const labelize = (k: string | number) =>
  String(k).replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

export function AutoField({ value, path, label, onChange }: Props) {
  // Bilingual { ar, en } → paired inputs.
  if (isBilingual(value)) {
    const long = isLongTextKey(path[path.length - 1] ?? '');
    return (
      <div className="space-y-2">
        {label && <FieldLabel>{label}</FieldLabel>}
        <div className="grid gap-2 sm:grid-cols-2">
          <LocaleInput
            dir="rtl" lang="ar" placeholder="العربية" long={long}
            value={value.ar}
            onChange={(v) => onChange([...path, 'ar'], v)}
          />
          <LocaleInput
            dir="ltr" lang="en" placeholder="English" long={long}
            value={value.en}
            onChange={(v) => onChange([...path, 'en'], v)}
          />
        </div>
      </div>
    );
  }

  // Image/asset string → uploader.
  if (typeof value === 'string' && isImageKey(path[path.length - 1] ?? '')) {
    return (
      <div className="space-y-2">
        {label && <FieldLabel>{label}</FieldLabel>}
        <ImageInput value={value} onChange={(v) => onChange(path, v)} />
      </div>
    );
  }

  // Primitive string.
  if (typeof value === 'string') {
    return (
      <div className="space-y-1.5">
        {label && <FieldLabel>{label}</FieldLabel>}
        <input
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-[#3C3CFA]"
        />
      </div>
    );
  }

  // Number / boolean.
  if (typeof value === 'number') {
    return (
      <div className="space-y-1.5">
        {label && <FieldLabel>{label}</FieldLabel>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(path, e.target.value === '' ? 0 : Number(e.target.value))}
          className="h-10 w-40 rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-[#3C3CFA]"
        />
      </div>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(path, e.target.checked)} />
        {label}
      </label>
    );
  }

  // Array → repeatable rows with add/remove/reorder.
  if (Array.isArray(value)) {
    const move = (from: number, to: number) => {
      if (to < 0 || to >= value.length) return;
      const next = [...value];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(path, next);
    };
    const blank = makeBlank(value[0]);
    return (
      <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        {label && <FieldLabel>{label}</FieldLabel>}
        {value.map((item, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-white/40">#{i + 1}</span>
              <div className="flex gap-1.5 text-xs">
                <RowBtn onClick={() => move(i, i - 1)} disabled={i === 0}>↑</RowBtn>
                <RowBtn onClick={() => move(i, i + 1)} disabled={i === value.length - 1}>↓</RowBtn>
                <RowBtn
                  onClick={() => onChange(path, value.filter((_, j) => j !== i))}
                  className="text-[#FF453A]"
                >
                  Remove
                </RowBtn>
              </div>
            </div>
            <AutoField value={item} path={[...path, i]} onChange={onChange} />
          </div>
        ))}
        {blank !== undefined && (
          <button
            type="button"
            onClick={() => onChange(path, [...value, blank])}
            className="rounded-lg border border-dashed border-white/20 px-3 py-1.5 text-sm text-white/60 hover:border-[#3C3CFA] hover:text-white"
          >
            + Add item
          </button>
        )}
      </div>
    );
  }

  // Object → nested fieldset.
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div className="space-y-4">
        {label && <SectionTitle>{label}</SectionTitle>}
        <div className="space-y-4 border-s border-white/10 ps-4">
          {entries.map(([k, v]) => (
            <AutoField key={k} value={v} path={[...path, k]} label={labelize(k)} onChange={onChange} />
          ))}
        </div>
      </div>
    );
  }

  // null/undefined → editable string fallback.
  return (
    <div className="space-y-1.5">
      {label && <FieldLabel>{label}</FieldLabel>}
      <input
        value=""
        onChange={(e) => onChange(path, e.target.value)}
        placeholder="(empty)"
        className="h-10 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-[#3C3CFA]"
      />
    </div>
  );
}

// Build an empty clone of an array element so "Add item" yields the right shape.
function makeBlank(sample: unknown): unknown {
  if (sample === undefined) return undefined;
  if (isBilingual(sample)) return { ar: '', en: '' };
  if (typeof sample === 'string') return '';
  if (typeof sample === 'number') return 0;
  if (typeof sample === 'boolean') return false;
  if (Array.isArray(sample)) return [];
  if (typeof sample === 'object' && sample !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = makeBlank(v);
    return out;
  }
  return '';
}

function LocaleInput({
  value, onChange, dir, lang, placeholder, long,
}: {
  value: string; onChange: (v: string) => void;
  dir: 'rtl' | 'ltr'; lang: string; placeholder: string; long: boolean;
}) {
  const cls =
    'w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-[#3C3CFA]';
  return long ? (
    <textarea dir={dir} lang={lang} placeholder={placeholder} rows={3} value={value}
      onChange={(e) => onChange(e.target.value)} className={`${cls} resize-y`} />
  ) : (
    <input dir={dir} lang={lang} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)} className={`h-10 ${cls}`} />
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium text-white/75">{children}</div>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-base font-semibold text-white">{children}</div>;
}
function RowBtn({
  children, onClick, disabled, className = '',
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`rounded border border-white/15 px-2 py-0.5 hover:bg-white/10 disabled:opacity-30 ${className}`}>
      {children}
    </button>
  );
}
