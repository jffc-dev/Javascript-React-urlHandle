import { Resource } from "@/lib/graphql/generated/graphql"

export type RandomStoreType = {
  resources: Resource[]
  currentIndex: number
  updateResources: (resources: Resource[]) => void
  incrementCurrentIndex: () => void
  resetCurrentIndex: () => void
}