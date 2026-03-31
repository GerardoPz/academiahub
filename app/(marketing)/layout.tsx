import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

/**
 * Layout component that renders a marketing page shell with a navbar, main content area, and footer.
 *
 * @param children - The page content to render inside the layout's main area.
 * @returns The layout's JSX element containing the navbar, the `children` wrapped in a full-height main area, and the footer.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
