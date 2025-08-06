import { create } from "zustand"
import { persist } from "zustand/middleware"
import { RandomStoreType } from "./types"
import { Resource } from "@/lib/graphql/generated/graphql"

export const useRandomStore = create<RandomStoreType>()(
  persist(
    (set) => ({
      resources: [],
      currentIndex: 0,
      resourceIds: [],
      selectedResourceId: null,
      updateResources: (resources: Resource[]) => {
        set({ resources })
      },
      incrementCurrentIndex: () => {
        set((state) => ({ currentIndex: state.currentIndex + 1 }));
      },
      resetCurrentIndex: () => {
        set(() => ({ currentIndex: 0 }));
      },
      updateResourceIds: (ids: number[]) => {
        set(() => ({ resourceIds: ids }));
      },
      setSelectedResourceId: (id: number | null) => {
        set(() => ({ selectedResourceId: id }));
      }
    }),
    {
      name: "random-store",
    },
  ),
)