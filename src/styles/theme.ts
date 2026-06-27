export const theme = {
  colors: {
    // Principal
    primary: "#2563EB",
    primaryHover: "#1D4ED8",

    // Backgrounds
    background: "#0B1120",
    sidebar: "#0F172A",
    header: "#111827",
    surface: "#1E293B",

    // Textos
    text: "#F9FAFB",
    textSecondary: "#94A3B8",

    // Bordas
    border: "#243044",

    // Status
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },

  shadow: {
    sm: "0 4px 10px rgba(0,0,0,.25)",
    md: "0 10px 30px rgba(0,0,0,.35)",
  },
};

export type ThemeType = typeof theme;