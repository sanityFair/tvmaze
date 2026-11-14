import type { ReactNode } from 'react';

import { cn } from '~/lib/utils';

type FeedbackMessageProps = {
  media: ReactNode;
  title: string;
  description: string;
  emphasis?: 'hero' | 'default';
  role?: 'alert';
};

export const FeedbackMessage = ({
  media,
  title,
  description,
  emphasis = 'default',
  role,
}: FeedbackMessageProps) => (
  <div
    role={role}
    className="flex animate-rise flex-col items-center gap-6 py-10 text-center text-balance sm:py-14"
  >
    {media}
    <div className="flex max-w-md flex-col items-center gap-3">
      <h2
        className={cn(
          'font-heading font-bold tracking-tight',
          emphasis === 'hero'
            ? 'text-[1.75rem]/tight sm:text-[2.25rem]/tight'
            : 'text-lg/snug sm:text-xl/snug',
        )}
      >
        {title}
      </h2>
      <p className="text-[0.95rem]/relaxed text-muted-foreground">{description}</p>
    </div>
  </div>
);
