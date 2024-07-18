import Header from "../islands/Header.tsx";
import PortfolioCards from "../islands/PortfolioCards.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <Header />
        <PortfolioCards />

        <div class="text-center mt-4 p-2">
          <a
            href="mailto:joel@cuthriell.com"
            class="text-[#32564f] hover:text-[#54ac9b] underline"
          >
            joel@cuthriell.com
          </a>
        </div>
        
      </div>
    </div>
  );
}
