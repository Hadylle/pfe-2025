import { useState } from 'react';
import useFetch from '../../api/hooks/useFetch';
import UserRow from '../../components/dashboard/UserRow';
import UserDetailsModal from '../../components/dashboard/UserDetailsModal';

const Users = () => {
  const { data: users, loading, error } = useFetch('auth/users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-8">Loading users...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading users</div>;

  const admins = users.filter((user) => user.role === 'ADMIN');
  const regularUsers = users.filter((user) => user.role !== 'ADMIN');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {admins.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Admins</h2>
          <div className="space-y-4">
            {admins.map((user) => (
              <UserRow key={user.id} user={user} onView={() => handleViewUser(user)} />
            ))}
          </div>
        </div>
      )}

      {regularUsers.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-3">Users</h2>
          <div className="space-y-4">
            {regularUsers.map((user) => (
              <UserRow key={user.id} user={user} onView={() => handleViewUser(user)} />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Users;
