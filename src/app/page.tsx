import CreaturePage from "@/components/CreaturePage";
import { creatures } from "@/data/creatures";

export default function Home() {
  const creature = creatures[0];

  return (
    <main className="min-h-screen pt-0">
      <CreaturePage creature={creature} />
    </main>
  );
}
