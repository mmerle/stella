import { useLayoutEffect, useMemo, useCallback } from 'react';
import { useWindowSize } from '@hooks/use-window-size';
import useStore from '@lib/store';
import cn from 'clsx';
import s from './grid-overlay.module.css';

export default function GridOverlay() {
  const { isGridOverlayVisible, toggleGridOverlayVisibility } = useStore();
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const columns = useMemo(() => {
    if (typeof window !== 'undefined') {
      return parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--grid-columns'),
      );
    }
    return 0;
  }, [windowWidth, windowHeight]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'G') {
        toggleGridOverlayVisibility();
      }
    },
    [toggleGridOverlayVisibility],
  );

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={s.overlay} data-visible={isGridOverlayVisible}>
      <div className={s.container}>
        <div className={cn(s.row, s.debugger)}>
          {Array.from({ length: columns }).map((_, key) => (
            <span key={key} className={s.col}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridOverlayToggle({ children, className }) {
  const { toggleGridOverlayVisibility } = useStore();

  return (
    <button onClick={toggleGridOverlayVisibility} className={cn(s.toggle, className)}>
      {children}
    </button>
  );
}
