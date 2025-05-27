import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import usersData from '../data/users.json';
import { useStore } from '../store/useStore';

const USERS_PER_PAGE = 5;

function UserListPage() {
  const users = useStore(state => state.users);
  const setUsers = useStore(state => state.setUsers);
  const [search, setSearch] = useState('');
  const [visibleUsersCount, setVisibleUsersCount] = useState(USERS_PER_PAGE);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsers(usersData);
  }, [setUsers]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Slice only the visible users count
  const visibleUsers = filteredUsers.slice(0, visibleUsersCount);

  // Load next 5 users ONLY if not reached end
  const loadMoreUsers = () => {
    setVisibleUsersCount(prev =>
      Math.min(prev + USERS_PER_PAGE, filteredUsers.length)
    );
  };

  // Scroll handler to load more on near bottom scroll
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Trigger when user scrolls within 100px of bottom
    if (scrollHeight - scrollTop - clientHeight < 100) {
      // Load more ONLY if there are more users to load
      if (visibleUsersCount < filteredUsers.length) {
        loadMoreUsers();
      }
    }
  };

  return (
    <div
      className="container"
      style={{ padding: '20px', height: '600px', overflowY: 'auto', border: '1px solid #ccc' }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisibleUsersCount(USERS_PER_PAGE); // Reset to first page on search
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

      {/* Optional Load More Button */}
      {visibleUsersCount < filteredUsers.length && (
        <button
          onClick={loadMoreUsers}
          style={{ marginTop: '15px', padding: '10px 15px', cursor: 'pointer' }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default UserListPage;
