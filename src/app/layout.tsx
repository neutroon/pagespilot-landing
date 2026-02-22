// This root layout is required by Next.js but renders no UI.
// The real layout (html, body, fonts, i18n) lives in [locale]/layout.tsx
// because it needs access to the locale param.
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
