import BookViewer from "@/components/BookViewer";
import { creatures } from "@/data/creatures";

export default function Home() {
  return (
    <main className="min-h-screen">
      <BookViewer creatures={creatures} />
    </main>
  );
}
