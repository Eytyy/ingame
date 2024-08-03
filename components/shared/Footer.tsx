import { cn } from "@/lib/utils";
import { SettingsPayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

type Props = SettingsPayload["footer"];

export default function Footer({ address, social, partners }: Props) {
  return (
    <footer
      className={cn(
        "relative grid gap-10 bg-black px-[var(--cellW)] pb-[var(--cellW)]",
        "lg:grid-cols-5 lg:px-[calc(var(--cellW)*0.5)] lg:py-[calc(var(--cellW)*0.5)]",
      )}
    >
      <section className="lg:col-span-2">
        <header>
          <h3 className="sr-only">Our Locations</h3>
        </header>
        <ColGrid>
          {address.map((address) => (
            <AddressLocation key={address._key} {...address} />
          ))}
        </ColGrid>
      </section>
      <section className="lg:col-span-2">
        <header className="mb-3">
          <h3 className="m text-sm">Our Partners</h3>
        </header>
        <div className="flex gap-10">
          {partners.map((partner) => (
            <Partner key={partner._key} {...partner} />
          ))}
        </div>
      </section>
      <div className="space-y-4 text-sm">
        <p>© {new Date().getFullYear()} ingame.All rights reserved.</p>
        <div className="max-w-[120px]">
          <Logo />
        </div>
        <p>
          For company information and other legal bits, see our Privacy Policy.
        </p>
      </div>
    </footer>
  );
}

function AddressLocation(props: SettingsPayload["footer"]["address"][0]) {
  return (
    <div className="flex flex-col">
      <p className="mb-2 font-bold uppercase">{props.city}</p>
      <div className="text-sm">
        <p className="max-w-[32ch]">{props.addressLine}</p>
        <div>
          <Link target="_blank" href={`mailto:${props.email}`}>
            Email: {props.email}
          </Link>
        </div>
        <div>
          <Link target="_blank" href={`tel:${props.phone}`}>
            Tel: {props.phone}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Partner(props: SettingsPayload["footer"]["partners"][0]) {
  return (
    <div key={props._key} className="flex items-center">
      <Link target="_blank " href={props.url} className="text-white underline">
        <div className="relative w-[120px]">
          {props.logo ? (
            <Image
              src={props.logo.url}
              alt={props.name}
              width={props.logo.width}
              height={props.logo.height}
              sizes="200px"
            />
          ) : (
            <div className="h-20 w-full bg-white" />
          )}
        </div>
      </Link>
    </div>
  );
}

function ColGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 lg:grid-cols-2">{children}</div>;
}
