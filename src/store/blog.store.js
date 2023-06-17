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

export const useBlogStore = create(
 devtools(
  logger((set) => ({
   blogs: [],
   getAllBlogs: (blogs) => {
    set((state) => ({
     blogs: blogs,
    }));
   },
  }))
 )
);
