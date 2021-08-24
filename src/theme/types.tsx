export type Themes = "default" | "emerald" | "eletricIndigo" | "magentaProcess" | "saffron" 
| "steelTeal" | "tomato" | "darkSalmon" | "copper";

export type ThemeState = {
  theme: Themes;
  setTheme(theme: Themes): void;
};

export type ThemeContextProps = {
  children: React.ReactNode;
};