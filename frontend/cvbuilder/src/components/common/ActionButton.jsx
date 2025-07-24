import { Button } from '../ui/Button';

export function ActionButton({ 
  children, 
  emoji = '', 
  loading = false,
  variant = 'primary',
  ...props 
}) {
  return (
    <Button
      variant={variant}
      size="lg"
      loading={loading}
      className="w-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
      {...props}
    >
      {!loading && emoji && <span className="mr-2">{emoji}</span>}
      {children}
    </Button>
  );
}