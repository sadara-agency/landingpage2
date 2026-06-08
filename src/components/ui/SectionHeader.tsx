import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

export function SectionHeader({
  kicker,
  title,
  lead,
  align = 'start',
  className,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {kicker && (
        <Reveal>
          <span className={cn('kicker', align === 'center' && 'justify-center')}>{kicker}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-h2 font-extrabold text-ink">{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lead text-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
