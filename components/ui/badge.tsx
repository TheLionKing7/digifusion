import { cn } from '@/lib/utils/cn';
import type { BlogPostType } from '@/types/blog';
import { POST_TYPE_CONFIG } from '@/types/blog';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-surface-lighter text-muted border border-border': variant === 'default',
          'bg-accent/10 text-accent border border-accent/20': variant === 'accent',
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': variant === 'success',
          'bg-amber-500/10 text-amber-400 border border-amber-500/20': variant === 'warning',
          'bg-red-500/10 text-red-400 border border-red-500/20': variant === 'error',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

interface PostTypeBadgeProps {
  type: BlogPostType;
  className?: string;
}

export function PostTypeBadge({ type, className }: PostTypeBadgeProps) {
  const config = POST_TYPE_CONFIG[type];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        'border',
        className
      )}
      style={{
        backgroundColor: `${config.color}15`,
        color: config.color,
        borderColor: `${config.color}30`,
      }}
    >
      {config.label}
    </span>
  );
}
