import PortfolioCards from "../islands/PortfolioCards.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-lg mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/jc.png"
          width="128"
          height="128"
          alt="Joel Cuthriell, a UX Specialist with design, development, and consulting experience"
        />
        <h1 class="text-4xl font-bold">UX Specialist</h1>
        <p class="my-4">
          User Interface / Animation / Digital Media
        </p>
        <PortfolioCards />
      </div>
    </div>
  );
}
