import Header from "../islands/Header.tsx";
import PortfolioCards from "../islands/PortfolioCards.tsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E7DECA]">
      <Header />

      <main className="flex-grow w-full relative">
        <div className="container max-w-screen-xl mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <PortfolioCards />

            <div className="text-center mt-8 mb-4 p-4">
              <a
                href="mailto:joel@cuthriell.com"
                className="text-[#32564f] hover:text-[#54ac9b] underline transition-colors duration-300"
              >
                joel@cuthriell.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
