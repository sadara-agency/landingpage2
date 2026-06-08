import { cn } from '@/lib/cn';

type Variant = 'outline' | 'solid' | 'featured';

const variants: Record<Variant, string> = {
  outline: 'border border-hairline bg-paper',
  solid: 'border border-transparent bg-canvas',
  featured: 'border border-electric/30 bg-paper',
};

export function Card({
  variant = 'outline',
  hover = false,
  className,
  children,
}: {
  variant?: Variant;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-card',
        variants[variant],
        hover && 'transition-all duration-300 ease-sadara hover:-translate-y-1 hover:border-ink/30',
        className,
      )}
    >
      {children}
    </div>
  );
}
