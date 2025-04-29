import Header from "../islands/Header.tsx";
import ResumeContent from "../islands/ResumeContent.tsx";

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col bg-[#E7DECA]">
      <Header />
      
      <main className="flex-grow w-full relative">
        <div className="container max-w-screen-xl mx-auto px-4 py-6">
          <ResumeContent />

        </div>
      </main>
    </div>
  );
} 