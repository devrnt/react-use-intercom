'use client';

import { useIntercom } from "react-use-intercom";

export default function Home() {
  const { boot } = useIntercom();

  return (
    <main>
      <button onClick={() => boot()}>Boot</button>
    </main>
  );
}