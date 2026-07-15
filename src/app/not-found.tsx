import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/footer/footer";
import { NotFoundContent } from "@/components/not-found/animated-content";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
