import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { GlobalStoreType, ThemeModeType } from "./types"
export const useGlobalStore = create<GlobalStoreType>()(
  persist(
    (set) => ({
      theme: "light",
      updateTheme: (theme: ThemeModeType) => {
        set({ theme })
      }
    }),
    {
      name: "global-store",
    },
  ),
)