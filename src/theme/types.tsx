export type Themes = "light" | "dark";

export type ThemeState = {
  theme: Themes;
  setTheme(theme: Themes): void;
};

export type ThemeContextProps = {
  children: React.ReactNode;
};