import { cn } from '@/lib/utils';

import tvStaticTexture from './tv-static-texture.webp';

type BackdropSideProps = {
  side: 'left' | 'right';
};

export const BackdropSide = ({ side }: BackdropSideProps) => (
  <div aria-hidden className="relative hidden bg-side md:block">
    <div className="sticky top-0 h-dvh overflow-hidden">
      <img
        src={tvStaticTexture}
        alt=""
        decoding="async"
        className={cn(
          'absolute inset-0 size-full animate-drift object-cover opacity-60',
          side === 'left' ? 'object-[25%_50%]' : 'object-[75%_50%]',
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_10/0.45),transparent_30%,transparent_60%,rgb(10_10_10/0.7)_85%,#0a0a0a)]" />
      <div
        className={cn(
          'absolute inset-y-0 w-2/3 from-transparent to-background',
          side === 'left' ? 'right-0 bg-linear-to-r' : 'left-0 bg-linear-to-l',
        )}
      />
    </div>
  </div>
);
