import { Card } from '../ui/Card';
import { ActionButton } from '../common/ActionButton';
import { FileUploadZone } from '../common/FileUploadZone';

export default function CVUploadForm({ 
  onFileChange, 
  onSubmit, 
  buttonLabel,
  buttonColor,
  buttonHover,
  loading = false,
  children 
}) {
  const getButtonVariant = () => {
    if (buttonColor === '#0091e3') return 'primary';
    if (buttonColor === '#ce0227') return 'danger';
    if (buttonLabel.includes('Improve')) return 'success';
    return 'primary';
  };

  return (
    <Card className="w-full max-w-md">
      <div className="space-y-6">
        <FileUploadZone 
          onFileChange={onFileChange}
          label="Upload your CV"
          helper="PDF, DOC, or DOCX files only"
        />
        
        {children}
        
        <ActionButton
          onClick={onSubmit}
          loading={loading}
          variant={getButtonVariant()}
          disabled={loading}
        >
          {buttonLabel}
        </ActionButton>
      </div>
    </Card>
  );
}
