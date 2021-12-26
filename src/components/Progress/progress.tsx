import React, { FC } from 'react';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    styles,
    theme = 'primary',
  } = props;
  return (
    <div className="progress-bar" style={styles} data-test="progress">
      <div className="progress-bar-outer" style={{ height: `${strokeHeight}px` }} data-test="progress-outer">
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
          data-test="progress-inner"
        >
          {showText && <span className="inner-text" data-test="progress-inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
