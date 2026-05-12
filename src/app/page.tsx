import Image from "next/image";
import SampleHero from "../components/SampleHero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-center py-8 px-6 bg-white dark:bg-black sm:items-start">
        <header className="w-full mb-8 flex items-center justify-between">
          <Image src="/next.svg" alt="logo" width={120} height={28} priority />
        </header>

        <SampleHero />

        <footer className="mt-12 w-full text-center text-sm text-zinc-500">
          Built with Tailwind, DaisyUI, and selective MUI components.
        </footer>
      </main>
    </div>
  );
}
