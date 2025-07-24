import { componentStyles } from '../../styles/components';
import { cn } from '../../utils/className';

export function SectionLayout({ children, className = '' }) {
  return (
    <div className={cn(componentStyles.layout.sectionContainer, className)}>
      {children}
    </div>
  );
}
