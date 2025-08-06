import { Resource } from "@/lib/graphql/generated/graphql"

export type RandomStoreType = {
  resources: Resource[]
  currentIndex: number
  resourceIds: number[]
  selectedResourceId: number | null
  updateResources: (resources: Resource[]) => void
  incrementCurrentIndex: () => void
  resetCurrentIndex: () => void
  updateResourceIds: (resources: number[]) => void
  setSelectedResourceId: (id: number | null) => void
}