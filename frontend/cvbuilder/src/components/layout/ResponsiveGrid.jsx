import { cn } from '../../utils/styleUtils';

export function ResponsiveGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'gap-6',
  className = '' 
}) {
  const gridClasses = `grid grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg}`;
  
  return (
    <div className={cn(gridClasses, gap, className)}>
      {children}
    </div>
  );
}