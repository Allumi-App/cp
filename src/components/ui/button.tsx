import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-[-0.01em] whitespace-nowrap rounded-full transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-white hover:opacity-90',
        dark: 'bg-dark text-white hover:opacity-90',
        outline: 'border border-beige bg-white text-dark hover:bg-card-warm',
        ghost: 'text-dark hover:bg-dark/[0.06]',
      },
      size: {
        sm: 'h-11 px-6 text-[15px]',
        md: 'h-13 px-6 text-[15px]',
        lg: 'h-13 px-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'md',
    },
  },
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & { className?: string }

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'

export interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  children: React.ReactNode
}

export function ButtonLink({ to, variant, size, className, children }: ButtonLinkProps) {
  return (
    <Link href={to} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  )
}
