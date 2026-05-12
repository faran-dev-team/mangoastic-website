import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-black">
      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
