import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export default function ActionButtons({
  mode,
  onSave,
  onDownload,
  onPreviewToggle,
  previewMode,
  saving = false,
}) {
  return (
    <div className="bg-white p-4 rounded-t-lg shadow border border-b-0 border-gray-200">
      <div className="flex flex-wrap gap-3 justify-end">
        <Button
          variant="success"
          onClick={onSave}
          disabled={saving}
          className="flex items-center space-x-2"
        >
          {saving && <LoadingSpinner size="sm" />}
          <span>💾 Save CV</span>
        </Button>

        <Button
          variant={previewMode ? 'primary' : 'outline'}
          onClick={onPreviewToggle}
          className="flex items-center space-x-2"
        >
          <span>{previewMode ? '📝 Edit Mode' : '👁️ Preview'}</span>
        </Button>

        {mode === 'edit-after-improve' && (
          <Button
            variant="primary"
            onClick={onDownload}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <span>✅ Download PDF</span>
          </Button>
        )}
      </div>
    </div>
  );
}
