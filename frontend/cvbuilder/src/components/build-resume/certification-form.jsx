import { BasicCollectionForm } from "./ReusableComponents/BasicCollectionForm";
export default function CertificationForm() {
  return (
    <BasicCollectionForm
      title="Certifications"
      storeKey="certifications"
      fields={[
        { name: 'title', placeholder: 'Certification Title' },
        { name: 'issuer', placeholder: 'Issuer' },
        { name: 'year', placeholder: 'Year' }
      ]}
      renderItem={(cert) => (
        <>
          <h3 className="font-medium">{cert.title}</h3>
          <p className="text-sm text-gray-600">{cert.issuer} - {cert.year}</p>
        </>
      )}
      validation={['title', 'issuer']}
      initialState={{
        title: '',
        issuer: '',
        year: ''
      }}
    />
  );
}
