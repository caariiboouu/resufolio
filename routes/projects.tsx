import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";
import AnalyticsTracker from "../islands/AnalyticsTracker.tsx";

export default function Projects(props: PageProps) {
  const projects = [
    {
      id: "community-care-mobile-app",
      title: "CommunityCare Connect Mobile App Announcement",
      video: "/videos/Introducing the CommunityCare Connect Mobile App.mp4",
      description: [
        "Created in Adobe Premier",
        "Advertised on social media and beyond"
      ],
      extendedDescription: "In this project I was given creative control over the direction and visual solutions in this video. Transitions, timing, and how each element is presented."
    },
    {
      id: "ccok-member",
      title: "CCOK Member Portal",
      video: "/videos/ccok-member.mp4",
      description: [
        "Built with Angular, Bootstrap, animated SVG charts"
      ],
      extendedDescription: "Much of my work in this portal is in the cohesiveness of the layout and design, the charts, and many of the layouts seen in this walkthrough."
    },
    {
      id: "drive-reorganizer",
      title: "Drive Reorganizer",
      video: "/videos/drive-reorganizer.mp4",
      description: [
        "Built with Google Drive, Python and Redis/Celery"
      ],
      extendedDescription: "I architected the data solutions for TPC Studios for their reserve of client files, this drive organizer project is entirely of my own making, and serves to tidy up drives to get around the limitations of Google Drive's service, allowing for easy team access."
    },
    {
      id: "price-comparison",
      title: "Price Comparison Tool",
      video: "/videos/price-comparison.mp4",
      description: [
        "Built with Angular, Bootstrap"
      ],
      extendedDescription: "This was my first major UX project at CCOK. Much of the flow of the application had already been built, but I was responsible for API integration and refinement. One of the most significant features I added is the map functionality. This is a government mandated feature and all of the required parts were arranged, the core of my proposal was simply to extend what was required to a valuable feature that benefits the user."
    },
    {
      id: "responsive-stuffed-tables",
      title: "Responsive Stuffed Tables",
      video: "/videos/responsive-stuffed-tables.mp4",
      description: [
        "Built with CSS Grid Level 2"
      ],
      extendedDescription: "This is an experimental solution to overstuffed tables. They expand horizontally on hover."
    },
    {
      id: "tucker",
      title: "Tucker Tennis",
      video: "/videos/tucker.mp4",
      description: [
        "Built with Wordpress, Foundation"
      ],
      extendedDescription: "This is one of the more sophisticated Wordpress sites I've created, a custom template, custom post types, and a full custom form on the admin panel for the owner to be able to make changes."
    },
    {
      id: "user-access-walkthrough",
      title: "User Access Walkthrough",
      video: "/videos/useraccesswalkthrough.mp4",
      description: [
        "Built with Angular, Bootstrap"
      ],
      extendedDescription: "This walkthrough demonstrates the user access management system with role-based permissions and seamless navigation flow."
    },
    {
      id: "virtual-id-card",
      title: "Virtual ID Card Responsiveness",
      video: "/videos/virtual-id-card.mp4",
      description: [
        "Built with Angular, Bootstrap"
      ],
      extendedDescription: "This is a side by side demonstration of the value of proper responsive layout. Left is after right is before."
    }
  ];

  return (
    <>
      <Head>
        <title>Projects - Joel Cuthriell</title>
        <meta
          name="description"
          content="View my latest projects and demos showcasing UX/UI design and development work."
        />
        <meta property="og:title" content="Projects - Joel Cuthriell" />
        <meta
          property="og:description"
          content="View my latest projects and demos showcasing UX/UI design and development work."
        />
        <meta property="og:url" content={`${props.url.origin}/projects`} />
      </Head>
      
      <div class="min-h-screen bg-gradient-to-br from-[#E7DECA] to-white">
        <Header />
        <AnalyticsTracker />
        
        <main class="pt-32 pb-16 px-6">
          <div class="max-w-6xl mx-auto">
            <h1 class="text-5xl font-bold text-[#232323] mb-4 text-center">
              Projects
            </h1>
            
            <div class="space-y-20">
              {projects.map((project, index) => (
                <section key={project.id} class={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div class={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <video
                      controls
                      preload="metadata"
                      class="w-full rounded-lg shadow-lg"
                      style="max-height: 400px;"
                    >
                      <source 
                        src={project.video} 
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div class={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <h2 class="text-3xl font-bold text-[#232323] mb-6">
                      {project.title}
                    </h2>
                    <ul class="space-y-3 mb-6">
                      {project.description.map((item, itemIndex) => (
                        <li key={itemIndex} class="flex items-start">
                          <span class="text-[#54ac9b] mr-3 mt-1">•</span>
                          <span class="text-[#1a1a1a] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div class="prose prose-lg text-[#1a1a1a] leading-relaxed">
                      <p class="italic text-gray-600">
                        {project.extendedDescription}
                      </p>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}