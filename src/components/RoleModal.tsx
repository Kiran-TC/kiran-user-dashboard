import { useState } from 'react';
import { useStore } from '../store/useStore';

interface RoleModalProps {
  userId: number;
  currentRole: string;
  onClose: () => void;
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
          style={styles.select}
        >
          {roles.map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div style={styles.addRoleContainer}>
          <input
            type="text"
            placeholder="Add new role"
            value={newRoleInput}
            onChange={e => setNewRoleInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddRole} style={styles.addButton}>Add</button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Delete Role:</strong>
          <ul style={styles.roleList}>
            {roles.map(role => (
              <li key={role} style={styles.roleItem}>
                {role}
                <button
                  onClick={() => handleDeleteRole(role)}
                  style={styles.deleteButton}
                  disabled={role === 'Viewer'}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleSave} style={styles.saveButton}>Save</button>
          <button onClick={onClose} style={styles.cancelButton}>Cancel</button>
        </div>
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
    padding: '10px',
    zIndex: 999,
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box' as const,
  },
};

const styles = {
  select: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    fontSize: '16px',
  },
  addRoleContainer: {
    display: 'flex',
    marginBottom: '10px',
    gap: '5px',
  },
  input: {
    padding: '8px',
    flex: 1,
    fontSize: '14px',
  },
  addButton: {
    padding: '8px 12px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  roleList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  roleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  deleteButton: {
    marginLeft: '10px',
    color: 'red',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  saveButton: {
    padding: '8px 16px',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 16px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RoleModal;
