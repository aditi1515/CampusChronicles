import { create } from "zustand";
import { devtools } from "zustand/middleware";
const logger = (config) => (set, get, api) =>
 config(
  (args) => {
   console.log("Action:", args);
   set(args);
   console.log("New state:", get());
  },
  get,
  api
 );

export const useAuthStore = create(
 devtools(
  logger((set) => ({
   user: null,
   isAuthenticated: false,
   registerUser: (user) => {
    set((state) => ({
     user: user,
     isAuthenticated: true,
    }));
   },
   loginUser: (user) => {
    set((state) => ({
     user: user,
     isAuthenticated: true,
    }));
   },
   logoutUser: () => {
    set((state) => ({
     user: null,
     isAuthenticated: false,
    }));
   },
  }))
 )
);
