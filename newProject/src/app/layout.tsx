import '@mantine/core/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { MantineProvider } from '@/shared/context/mantine-provider';
import { ApolloWrapper } from '@/lib/apollo/wrapper';
import Layout from '@/components/Common/Layout/Layout';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider>
            <Layout>{children}</Layout>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
