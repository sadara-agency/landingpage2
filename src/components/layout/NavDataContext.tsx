'use client';

import { createContext, useContext } from 'react';
import type { navItems as NavItems, cta as Cta } from '@/content/nav';
import type { homePillars as HomePillars } from '@/content/home';

// Nav/pillar data sourced from Supabase (via getDoc) at the layout, shared with
// client nav components without prop-drilling through deep trees.
export type NavData = {
  navItems: typeof NavItems;
  cta: typeof Cta;
  homePillars: typeof HomePillars;
};

const NavDataContext = createContext<NavData | null>(null);

export function NavDataProvider({ value, children }: { value: NavData; children: React.ReactNode }) {
  return <NavDataContext.Provider value={value}>{children}</NavDataContext.Provider>;
}

export function useNavData(): NavData {
  const ctx = useContext(NavDataContext);
  if (!ctx) throw new Error('useNavData must be used within NavDataProvider');
  return ctx;
}
