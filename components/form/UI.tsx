import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export function FormGrid({ children }: PropsWithChildren) {
  return <div className="grid lg:grid-cols-8">{children}</div>;
}

export function FormContentCol({ children }: PropsWithChildren) {
  return (
    <div className="relative z-20 mb-16 self-start lg:col-span-5 lg:col-start-1 lg:row-start-1">
      {children}
    </div>
  );
}

export function FormApplyButton({ label }: { label: string }) {
  const router = useRouter();
  const currentPath = router.asPath;

  const handleClick = () => {
    // add query param to url
    router.push(`${currentPath}?form=apply`, undefined, { shallow: true });
  };

  return (
    <div className="z-50 col-span-full flex justify-end gap-16 self-end lg:sticky lg:bottom-8">
      <button onClick={handleClick}>{label}</button>
    </div>
  );
}
