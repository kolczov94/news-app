import { Header } from "../components/header";
import { News } from "../components/news";

export const AppPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="container mt-4 flex flex-1">
        <News />
      </section>
    </main>
  );
};
