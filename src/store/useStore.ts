import { create } from 'zustand';
import type { User } from '../types';

interface StoreState {
  users: User[];
  roles: string[];
  setUsers: (users: User[]) => void;
  updateUserRoles: (userId: number, newRoles: string[]) => void;
  addRole: (role: string) => void;
  deleteRole: (role: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  users: [],
  roles: ['Admin', 'Editor', 'Viewer'],

  setUsers: (users) => set({ users }),

  updateUserRoles: (userId, newRoles) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, role: newRoles[0] || user.role } : user
      ),
    })),

  addRole: (role) =>
    set((state) =>
      state.roles.includes(role) ? state : { roles: [...state.roles, role] }
    ),

  deleteRole: (role) =>
    set((state) => ({
      roles: state.roles.filter((r) => r !== role),
      users: state.users.map((user) =>
        user.role === role ? { ...user, role: 'Viewer' } : user
      ),
    })),
}));
