import { OurIntercomProvider } from './intercom';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OurIntercomProvider>
          {children}
        </OurIntercomProvider>
      </body>
    </html>
  );
}