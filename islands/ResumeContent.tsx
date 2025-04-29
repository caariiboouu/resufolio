import { useState } from "preact/hooks";
import ResumeViewer from "./ResumeViewer.tsx";

export default function ResumeContent() {
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const pdfUrl = "/portfolio-joel-cuthriell.pdf";
  
  return (
    <>
      <div className="max-w-4xl mx-auto bg-[#E7DECA] text-[#32564f] p-8 rounded-lg border border-[#32564f]">
        {/* Header with contact info and resume button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="text-left text-[#32564f]/80 mb-4 md:mb-0">
            <a className="underline" href="mailto:joel@cuthriell.com">joel@cuthriell.com</a> | <a className="underline" href="tel:+14055820062">405.582.0062</a> | Tulsa, OK
          </p>
          <button
            onClick={() => setResumeModalOpen(true)}
            className="px-4 py-2 bg-[#32564f] text-white rounded hover:bg-[#54ac9b] transition-colors duration-300"
          >
            Open Portfolio
          </button>
        </div>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 pb-2 border-b border-[#32564f]/20">Skills</h2>
          <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 gap-1">
            <li>Typescript, React, React Native, Angular</li>
            <li>Figma, Adobe Creative Suite</li>
            <li>Git, Azure, AWS</li>
            <li>Tailwind, Bootstrap, Material UI</li>
          </ul>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-[#32564f]/20">Experience</h2>
          
          {/* Job 1 */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-xl font-medium">UI/UX Developer</h3>
              <p className="text-[#32564f]/80">Aug 2022 – Present</p>
            </div>
            <p className="italic mb-2">CommunityCare HMO | Tulsa, OK</p>
            <ul className="list-disc pl-5">
              <li>Design and implement user interfaces for employee and member-facing applications</li>
              <li>Create vector and CSS animations for enhanced user experience</li>
              <li>Develop complex information displays using Angular and Bootstrap</li>
              <li>Produce motion graphics for video content</li>
              <li>Integrate APIs and conduct quality control testing</li>
            </ul>
          </div>
          
          {/* Job 2 */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-xl font-medium">Consultant</h3>
              <p className="text-[#32564f]/80">Oct 2021 – Present</p>
            </div>
            <p className="italic mb-2">Self-Employed | Tulsa, OK</p>
            <ul className="list-disc pl-5">
              <li>Heavy focus on user research, troubleshooting, and building systems for employee use</li>
              <li>Develop brochure sites and frontend interfaces using React Native, React, and Gatsby</li>
              <li>Advise on and implement project management practices, including Kanban methodologies</li>
              <li>Manage IT infrastructure across multiple business locations</li>
            </ul>
          </div>
          
          {/* Job 3 */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-xl font-medium">Front End Developer / UI / UX</h3>
              <p className="text-[#32564f]/80">Dec 2019 – August 2021</p>
            </div>
            <p className="italic mb-2">SEQTEK | Sapulpa, OK</p>
            <ul className="list-disc pl-5">
              <li>Design and refine projects using Foundation, React, and Angular</li>
              <li>Implement API integrations for CRUD operations, including JWT authentication</li>
              <li>Reviewed strategy and interface direction with owners users</li>
              <li>Collaborate with backend developers on C# and .NET systems</li>
              <li>Utilize Azure DevOps for CI/CD pipelines</li>
            </ul>
          </div>
          
          {/* Job 4 */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between mb-1">
              <h3 className="text-xl font-medium">Interactive Manager</h3>
              <p className="text-[#32564f]/80">Nov 2013 – Aug 2019</p>
            </div>
            <p className="italic mb-2">TPC Studios | Tulsa, OK</p>
            <ul className="list-disc pl-5">
              <li>Lead development of responsive websites, from brochure sites to full e-commerce platforms</li>
              <li>Design reviews with creative staff and technical instruction</li>
              <li>Specialize in custom design and animation for enhanced user engagement</li>
              <li>Manage IT infrastructure, including LAMP stack servers, local networks, and device management</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-[#32564f]/20">Projects</h2>
          <ul className="list-disc pl-5">
            <li>Building internal management tool interfaces for QuikTrip</li>
            <li>HIPAA-compliant secure file scanning workflow for a surgical equipment consultant</li>
            <li>Motion graphics for CommunityCare HMO: <a href="https://www.youtube.com/watch?v=n2ru5WyMzLk" target="_blank" rel="noopener noreferrer" className="text-[#32564f] hover:underline">YouTube Video</a></li>
            <li>Homepage content modernization for <a href="https://ccok.com/" target="_blank" rel="noopener noreferrer" className="text-[#32564f] hover:underline">ccok.com</a></li>
            <li>Cryptocurrency project contributions: Developed marketing strategies, designed infographics, and organized community initiatives</li>
          </ul>
        </section>
      </div>

      {/* PDF Resume Modal */}
      <ResumeViewer
        pdfUrl={pdfUrl}
        isOpen={isResumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
} 