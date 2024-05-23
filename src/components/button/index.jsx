import s from './button.module.css';
import { cva } from 'cva';
import { useRef } from 'react';

const variants = cva(s.button, {
  variants: {
    type: {
      primary: s['type-primary'],
      secondary: s['type-secondary'],
      accent: s['type-accent'],
      ghost: s['type-ghost'],
    },
    size: {
      small: s['size-sm'],
      medium: s['size-md'],
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'medium',
  },
});

export default function Button({
  children,
  className,
  external,
  href,
  onClick,
  size,
  type,
  ...props
}) {
  const ref = useRef(null);

  return (
    <>
      {href ? (
        <a
          href={href}
          ref={ref}
          className={variants({ type, size, className })}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          ref={ref}
          className={variants({ type, size, className })}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
}
