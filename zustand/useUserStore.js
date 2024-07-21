import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      tokenType: null,
      accessToken: null,
      firstName: null,
      lastName: null,
      setUser: (user) =>
        set({
          tokenType: user.tokenType,
          accessToken: user.accessToken,
          firstName: user.attributes.first_name,
          lastName: user.attributes.last_name,
        }),
      clearUser: () =>
        set({
          tokenType: null,
          accessToken: null,
          firstName: null,
          lastName: null,
        }),
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          AsyncStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => AsyncStorage.removeItem(name),
      },
    }
  )
);

export default useUserStore;
