import React from "react";

interface IHeader {}

export default function Header(props: IHeader) {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-12">
      <Cell />
      <div className="col-span-2 col-start-1 row-span-1 row-start-1 content-center bg-black">
        <div className="mx-auto text-center font-mono text-[2.5vw]">ingame</div>
      </div>
    </header>
  );
}

function Cell() {
  return (
    <div className="cell bg-red after: col-span-1 col-start-1 row-start-1 h-full after:block after:pt-[100%]"></div>
  );
}
