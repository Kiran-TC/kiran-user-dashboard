import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usersData from '../data/users.json';
import { useStore } from '../store/useStore';

const USERS_PER_PAGE = 5;

function UserListPage() {
  const users = useStore(state => state.users);
  const setUsers = useStore(state => state.setUsers);
  const [search, setSearch] = useState('');
  const [visibleUsersCount, setVisibleUsersCount] = useState(USERS_PER_PAGE);

  useEffect(() => {
    setUsers(usersData); // load JSON once on mount
  }, [setUsers]);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Users to display = slice of filtered users up to visibleUsersCount
  const visibleUsers = filteredUsers.slice(0, visibleUsersCount);

  // Load more users on button click
  const loadMoreUsers = () => {
    setVisibleUsersCount(prev => Math.min(prev + USERS_PER_PAGE, filteredUsers.length));
  };

  // Optional: auto load more on scroll near bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadMoreUsers();
    }
  };

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredUsers, visibleUsersCount]);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleUsersCount(USERS_PER_PAGE); // reset visible users count on search
        }}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <table border={1} cellPadding={10} cellSpacing={0} style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More button - show only if more users left */}
      {visibleUsersCount < filteredUsers.length && (
        <button
          onClick={loadMoreUsers}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default UserListPage;
