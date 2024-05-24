import { useEffect, useState } from 'react';
import useStore from '@libs/store';
import s from './grid-overlay.module.css';
import cn from 'clsx';

export default function GridOverlay() {
  const { isGridOverlayVisible, toggleGridOverlayVisibility } = useStore();
  const [columns, setColumns] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const columnsValue = getComputedStyle(document.documentElement).getPropertyValue(
        '--grid-columns',
      );
      setColumns(parseInt(columnsValue, 10) || 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleKeyDown = (event) => {
      if (event.key === 'G') {
        toggleGridOverlayVisibility();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleGridOverlayVisibility]);

  const createColumns = (num) => {
    const columnDivs = [];
    for (let i = 0; i < num; i++) {
      columnDivs.push(<div key={i} className={s.col}></div>);
    }
    return columnDivs;
  };

  return (
    <div className={s.overlay} data-visible={isGridOverlayVisible}>
      <div className={s.container}>
        <div className={s.row}>{createColumns(columns)}</div>
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
