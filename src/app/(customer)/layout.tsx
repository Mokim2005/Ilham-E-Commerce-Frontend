import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/footer/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
