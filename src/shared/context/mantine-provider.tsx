'use client';
import { MantineProvider as MantineThemeProvider } from '@mantine/core';
import { useGlobalStore } from '@stores/global/global.store';
import { themeColors } from '@theme/colors';
import { mantineTheme } from '@theme/mantine-theme';
import { useEffect, useState, type ReactNode } from 'react';
type MantineProviderProps = {
  children: ReactNode;
};
export const MantineProvider = ({ children }: MantineProviderProps) => {
  const [isMounted, setMount] = useState(false);
  const theme = useGlobalStore(state => state.theme);
  //To avoid errors on SSR with deep links
  useEffect(() => {
    setMount(true);
  }, []);
  if (!isMounted) return null;
  return (
    <MantineThemeProvider
      forceColorScheme={theme}
      theme={{
        ...mantineTheme,
        colors: {
          ...themeColors,
        },
      }}
    >
      {children}
    </MantineThemeProvider>
  );
};
