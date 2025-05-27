import { useState } from 'react';
import { useStore } from '../store/useStore';

interface RoleModalProps {
  userId: number;
  currentRole: string;
  onClose: () => void;
  roles: string[];
}

const RoleModal: React.FC<RoleModalProps> = ({ userId, currentRole, onClose }) => {
  const roles = useStore(state => state.roles);
  const updateUserRoles = useStore(state => state.updateUserRoles);
  const addRole = useStore(state => state.addRole);
  const deleteRole = useStore(state => state.deleteRole);

  const [newRole, setNewRole] = useState(currentRole);
  const [newRoleInput, setNewRoleInput] = useState('');

  const handleSave = () => {
    updateUserRoles(userId, [newRole]);
    onClose();
  };

  const handleAddRole = () => {
    if (newRoleInput.trim()) {
      addRole(newRoleInput.trim());
      setNewRoleInput('');
    }
  };

  const handleDeleteRole = (role: string) => {
    if (window.confirm(`Delete role "${role}"?`)) {
      deleteRole(role);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Edit Role</h3>

        <select
          value={newRole}
          onChange={e => setNewRole(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Add new role"
            value={newRoleInput}
            onChange={e => setNewRoleInput(e.target.value)}
            style={{ padding: '5px', width: '70%', marginRight: '5px' }}
          />
          <button onClick={handleAddRole}>Add</button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Delete Role:</strong>
          <ul>
            {roles.map(role => (
              <li key={role} style={{ marginBottom: '4px' }}>
                {role}{' '}
                <button
                  onClick={() => handleDeleteRole(role)}
                  style={{ color: 'red', marginLeft: '10px' }}
                  disabled={role === 'Viewer'} // prevent deleting fallback role
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
  },
};

export default RoleModal;
