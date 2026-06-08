import { cn } from '@/lib/cn';

type Tone = 'blue' | 'gold' | 'cyan' | 'neutral';

const tones: Record<Tone, string> = {
  blue: 'border-electric/40 text-electric',
  gold: 'border-[#C9A227]/50 text-[#9A7B12]',
  cyan: 'border-[#0E7490]/40 text-[#0E7490]',
  neutral: 'border-hairline text-muted',
};

export function Tag({ tone = 'neutral', children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border bg-paper px-3 py-1 text-xs font-medium', tones[tone], className)}>
      {children}
    </span>
  );
}
