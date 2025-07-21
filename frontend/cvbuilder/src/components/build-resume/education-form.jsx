import { BasicCollectionForm } from "./ReusableComponents/BasicCollectionForm";
export default function EducationForm() {
  return (
    <BasicCollectionForm
      title="Education"
      storeKey="education"
      fields={[
        { name: 'institution', placeholder: 'Institution' },
        { name: 'degree', placeholder: 'Degree' },
        { name: 'field', placeholder: 'Field of Study' },
        { name: 'startDate', placeholder: 'Start Date' },
        { name: 'endDate', placeholder: 'End Date' }
      ]}
      renderItem={(edu) => (
        <>
          <h3 className="font-medium">{edu.institution}</h3>
          <p className="text-sm text-gray-600">{edu.degree} - {edu.field}</p>
          <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
        </>
      )}
      validation={['institution', 'degree']}
      initialState={{
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      }}
    />
  );
}
