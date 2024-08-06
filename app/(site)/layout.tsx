import type { Metadata } from "next";
import "../globals.css";
import { AppProvider } from "@/context/AppContext";
import { loadSettings } from "@/sanity/loader/loadQuery";
import Footer from "@/components/shared/Footer";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { Toaster } from "sonner";

const metadata = {
  title:
    "INGAME: Bridging Traditional Marketing and Immersive Gaming for Gen Z",
  description:
    "Bridging traditional marketing with immersive gaming experiences on platforms like Roblox. Engage Gen Z with custom, interactive brand adventures in the metaverse. Transform your brand today!",
};

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await loadSettings();
  const ogImage = urlForOpenGraphImage(settings?.seo.seoImage);
  return {
    ...metadata,
    title: settings?.seo.seoTitle || metadata.title,
    description: settings?.seo.seoDescription || metadata.description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
      title: settings?.seo.seoTitle || metadata.title,
      description: settings?.seo.seoDescription || metadata.description,
    },
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await loadSettings();

  if (!settings.data) {
    return (
      <div className="text-center">You don&rsquo;t have settings yet, </div>
    );
  }

  return (
    <AppProvider>
      {children}
      <Footer {...settings.data.footer} />
      <Toaster />
    </AppProvider>
  );
}
