
import { create } from 'zustand';
import { mockUsers, UserData, UserStatus } from '@/data/mockData';
import { persist } from 'zustand/middleware';

interface UserStore {
  users: UserData[];
  addUser: (user: Omit<UserData, "id" | "qrCode">) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: mockUsers,
      addUser: (userData) => set((state) => ({
        users: [...state.users, {
          ...userData,
          id: crypto.randomUUID(),
          qrCode: `user-${Date.now()}`
        }]
      }))
    }),
    {
      name: 'user-storage'
    }
  )
);
