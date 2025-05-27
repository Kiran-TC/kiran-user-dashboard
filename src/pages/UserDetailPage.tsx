import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import RoleModal from '../components/RoleModal';

function UserDetailPage() {
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();

  const users = useStore(state => state.users);
  const user = users.find(u => u.id === userId);

  const [showModal, setShowModal] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>User not found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Detail</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p>
        <strong>Role:</strong> {user.role}{' '}
        <button onClick={() => setShowModal(true)} style={{ marginLeft: '10px' }}>
          Edit Role
        </button>
      </p>
      <p><strong>Status:</strong> {user.status}</p>

      <button onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>
        Go Back
      </button>

      {showModal && (
        <RoleModal
          userId={user.id}
          currentRole={user.role}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default UserDetailPage;
