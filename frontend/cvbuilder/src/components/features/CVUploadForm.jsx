export default function CVUploadForm({ onFileChange, onSubmit, buttonLabel = "Submit", children }) {
  return (
    <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-200">
      <div>
        <label className="block font-medium mb-2 text-gray-700">Upload your CV (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#0091e3] file:text-white hover:file:bg-[#0c549f]"
        />
      </div>
      {children}
      <div className="flex gap-4 justify-end pt-2">
        <button
          onClick={onSubmit}
          className="bg-[#05dbb4] hover:bg-[#0c549f] text-white px-5 py-2 rounded-md shadow-sm"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
