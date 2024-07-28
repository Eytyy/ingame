"use client";

import React from "react";
import { useQuery, type QueryResponseInitial } from "@sanity/react-loader";
import { HomePagePayload } from "@/types";
import { homePageQuery } from "@/sanity/lib/queries";
import HomePage from "./HomePage";

type Props = {
  initial: QueryResponseInitial<HomePagePayload | null>;
};

export default function HomePagePreview({ initial }: Props) {
  const { data, encodeDataAttribute } = useQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { initial },
  );

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }
  return <HomePage data={data} encodeDataAttribute={encodeDataAttribute} />;
}
