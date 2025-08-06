import { Resource } from "@/lib/graphql/generated/graphql"

export type RandomStoreType = {
  resources: Resource[]
  currentIndex: number
  resourceIds: number[]
  updateResources: (resources: Resource[]) => void
  incrementCurrentIndex: () => void
  resetCurrentIndex: () => void
  updateResourceIds: (resources: number[]) => void
}