import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-amber-500 text-espresso-900 hover:bg-amber-400 border border-amber-500 hover:border-amber-400',
  outline:
    'bg-transparent text-cream-50 border border-cream-100/40 hover:border-amber-400 hover:text-amber-400',
  ghost:
    'bg-transparent text-espresso-800 border border-espresso-200 hover:border-amber-500 hover:text-amber-600',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-sm',
};

const baseClass =
  'inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.18em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-espresso-900';

interface LinkButtonProps extends BaseProps {
  to: string;
  type?: never;
  onClick?: never;
}

interface ActionButtonProps extends BaseProps {
  to?: never;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = 'button', onClick } = props as ActionButtonProps;

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
