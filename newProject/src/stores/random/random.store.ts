import { create } from "zustand"
import { persist } from "zustand/middleware"
import { RandomStoreType } from "./types"
import { Resource } from "@/lib/graphql/generated/graphql"

export const useRandomStore = create<RandomStoreType>()(
  persist(
    (set) => ({
      resources: [],
      currentIndex: 0,
      updateResources: (resources: Resource[]) => {
        set({ resources })
      },
      incrementCurrentIndex: () => {
        set((state) => ({ currentIndex: state.currentIndex + 1 }));
      },
      resetCurrentIndex: () => {
        set(() => ({ currentIndex: 0 }));
      },
    }),
    {
      name: "random-store",
    },
  ),
)