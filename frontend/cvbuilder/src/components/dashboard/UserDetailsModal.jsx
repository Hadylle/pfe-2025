import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import CvCard from './CvCard';

const UserDetailsModal = ({ user, onClose }) => {
const { data: cvs, loading, error } = useFetch(`/cv/users/${user.sub}/cvs`);

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('cvs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'cvs' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                CVs ({cvs?.length || 0})
              </button>
            </nav>
          </div>

          {activeTab === 'profile' && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="mt-1">{user.email}</p>
                  </div>
                  {user.phoneNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="mt-1">{user.phoneNumber}</p>
                    </div>
                  )}
                  {user.address && (
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="mt-1">{user.address}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Additional Information</h3>
                <div className="mt-4 space-y-4">
                  {user.dateOfBirth && (
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="mt-1">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  )}
                  {user.gender && (
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="mt-1">{user.gender}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cvs' && (
            <div className="mt-6">
              {loading ? (
                <p>Loading CVs...</p>
              ) : error ? (
                <p className="text-red-500">Error loading CVs</p>
              ) : cvs && cvs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {cvs.map(cv => (
                    <CvCard key={cv.id} cv={cv} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No CVs found for this user</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;