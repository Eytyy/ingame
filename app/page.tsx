import { loadHomePage } from "@/sanity/loader/loadQuery";
import { draftMode } from "next/headers";
import HomePagePreview from "@/components/pages/HomePagePreview";
import Link from "next/link";
import { studioUrl } from "@/sanity/env";
import HomePage from "@/components/pages/HomePage";

export default async function Home() {
  const initial = await loadHomePage();

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />;
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{" "}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    );
  }
  return <HomePage data={initial.data} />;
}
