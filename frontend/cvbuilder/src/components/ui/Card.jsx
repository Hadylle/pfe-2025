import { styleUtils } from '../../utils/styleUtils';
import { cn } from '../../utils/className';


export function Card({ 
  children, 
  variant = 'base', 
  className = '',
  padding = 'p-6',
  ...props 
}) {
  return (
    <div
      className={cn(
        styleUtils.getCardClasses(variant),
        padding,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}