import { cva, type VariantProps } from 'class-variance-authority'

export const appButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap no-underline transition-[background-color,border-color,filter] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        /** Main call to action: lime on forest text */
        accent: 'bg-accent font-bold text-forest hover:brightness-95',
        outline: 'border border-line-strong bg-transparent text-foreground hover:bg-surface',
        /** Forest button on always-light cards */
        solid: 'bg-forest text-chalk hover:bg-forest/85',
        /** CTA inside inverted blocks (booking summary) */
        inverse: 'bg-inverse-cta font-bold text-inverse-cta-foreground hover:brightness-95',
        /** Icon buttons over the pitch photo */
        overlay: 'bg-forest/80 text-chalk hover:bg-forest',
      },
      size: {
        sm: 'min-h-11 rounded-full px-4 text-sm',
        md: 'min-h-11 rounded-full px-5 text-[15px]',
        lg: 'min-h-14 rounded-tile px-7 text-[17px]',
        icon: 'size-11 shrink-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
    },
  },
)

export type AppButtonVariants = VariantProps<typeof appButtonVariants>
