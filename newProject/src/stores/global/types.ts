export type ThemeModeType = "light" | "dark"

export type GlobalStoreType = {
  theme: ThemeModeType
  updateTheme: (theme: ThemeModeType) => void
}