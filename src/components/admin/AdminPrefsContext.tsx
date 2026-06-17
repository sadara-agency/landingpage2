'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'en' | 'ar';
type Theme = 'dark' | 'light';

interface AdminPrefs {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const AdminPrefsContext = createContext<AdminPrefs>({
  locale: 'en',
  setLocale: () => {},
  theme: 'dark',
  setTheme: () => {},
});

export function AdminPrefsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('admin-locale') as Locale | null;
    const savedTheme = localStorage.getItem('admin-theme') as Theme | null;
    if (savedLocale === 'ar' || savedLocale === 'en') setLocaleState(savedLocale);
    if (savedTheme === 'light' || savedTheme === 'dark') setThemeState(savedTheme);
    setMounted(true);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem('admin-locale', l);
  }

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem('admin-theme', t);
  }

  // Avoid flash: render children only after localStorage is read
  if (!mounted) return null;

  return (
    <AdminPrefsContext.Provider value={{ locale, setLocale, theme, setTheme }}>
      {children}
    </AdminPrefsContext.Provider>
  );
}

export function useAdminPrefs() {
  return useContext(AdminPrefsContext);
}
