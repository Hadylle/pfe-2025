import { componentStyles } from '../../styles/components';
import Footer from '../footer';
import { cn } from '../../utils/className';

export function PageLayout({ 
  children, 
  showFooter = true, 
  containerType = 'content',
  className = '' 
}) {
  const containerClass = containerType === 'full' 
    ? componentStyles.layout.fullWidthContainer
    : componentStyles.layout.contentContainer;

  return (
    <div className={componentStyles.layout.pageContainer}>
      <main className={cn(containerClass, className)}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}