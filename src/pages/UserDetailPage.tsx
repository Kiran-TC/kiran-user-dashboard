import { useParams } from 'react-router-dom';
import { useState } from 'react';
import RoleModal from '../components/RoleModal';
import { useStore } from '../store/useStore';

function UserDetailPage() {
  const { id } = useParams();
  const userId = Number(id);
  const user = useStore(state => state.users.find(u => u.id === userId));
  const updateUserRoles = useStore(state => state.updateUserRoles);

  const [showModal, setShowModal] = useState(false);

  if (!user) return <p>User not found.</p>;

  const handleSaveRoles = (updatedRoles: string[]) => {
    updateUserRoles(user.id, updatedRoles);
    setShowModal(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Detail: {user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.status}</p>

      <div style={{ marginTop: '10px' }}>
        <p><strong>Role:</strong> {user.role}</p>
        <button onClick={() => setShowModal(true)}>Manage Roles</button>
      </div>

      {showModal && (
        <RoleModal
          roles={[user.role]} // current role as array
          onClose={() => setShowModal(false)}
          onSave={handleSaveRoles}
        />
      )}
    </div>
  );
}

export default UserDetailPage;
