import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

interface DocPage {
  slug: string;
  title: string;
  content: string;
}

// Client component to handle navigation
export default function DocsPage(props: PageProps) {
  return (
    <>
      <Head>
        <title>Go Girl Gala Square Terminal Guide</title>
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <style dangerouslySetInnerHTML={{ __html: `
          .markdown-body img {
            max-width: 100%;
            border-radius: 8px;
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .content-wrapper {
            max-width: 100%;
            overflow-x: auto;
          }
          
          /* Image grid for documentation */
          .img-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin: 20px 0;
          }
          
          .img-grid img {
            width: 100%;
            height: auto;
            margin: 0;
            object-fit: contain;
            cursor: pointer;
          }
          
          @media (max-width: 768px) {
            .img-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (max-width: 480px) {
            .img-grid {
              grid-template-columns: 1fr;
            }
          }
          
          /* Fix for mobile view */
          @media (max-width: 768px) {
            .main-content {
              padding-top: 40px;
            }
            
            .sticky {
              top: 32px;
            }
          }
          
          /* Better typography */
          .markdown-body h1 {
            font-size: 2.2em;
            color: #333;
            margin-bottom: 1em;
          }
          
          .markdown-body h2 {
            font-size: 1.8em;
            margin-top: 1.5em;
            color: #444;
          }
          
          .markdown-body h3 {
            font-size: 1.4em;
            color: #555;
          }
          
          .markdown-body p {
            line-height: 1.6;
            margin-bottom: 1.2em;
          }
          
          .markdown-body ul, .markdown-body ol {
            margin-bottom: 1.5em;
          }
          
          .markdown-body code {
            background-color: #f5f5f5;
            border-radius: 4px;
            padding: 2px 5px;
          }

          .loading-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Debug panel styles */
          .debug-panel {
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 20px;
            padding: 15px;
          }
          
          .debug-panel h3 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #333;
          }
          
          .debug-panel pre {
            background-color: #272822;
            color: #f8f8f2;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
          }
          
          .debug-panel button {
            background-color: #4299e1;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
          }
          
          .debug-panel button:hover {
            background-color: #3182ce;
          }
          
          #debug-output {
            max-height: 300px;
            overflow-y: auto;
          }
          
          /* Lightbox styles */
          .lightbox {
            display: none;
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 1em;
            background: rgba(0, 0, 0, 0.8);
            cursor: pointer;
          }
          
          .lightbox:target {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          
          .lightbox::after {
            content: "Click outside or press any key to close";
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.85rem;
            margin-top: 1rem;
            position: absolute;
            bottom: 1.5rem;
            left: 0;
            right: 0;
            text-align: center;
          }
          
          .lightbox img {
            max-height: 85vh;
            max-width: 85vw;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            animation: lightbox-in 0.3s ease-out;
            object-fit: contain;
            cursor: default;
          }
          
          .lightbox .close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 3rem;
            height: 3rem;
            background: white;
            color: black;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 10000;
          }
          
          .lightbox .nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 3rem;
            height: 3rem;
            background: rgba(255, 255, 255, 0.8);
            color: black;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.2s;
          }
          
          .lightbox .nav:hover {
            background: white;
          }
          
          .lightbox .prev {
            left: 1rem;
          }
          
          .lightbox .next {
            right: 1rem;
          }
          
          @keyframes lightbox-in {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        ` }} />
      </Head>
      <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
          <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 class="text-2xl font-bold text-gray-900">Go Girl Gala Square Terminal Guide</h1>
          </div>
        </header>
        
        <main class="max-w-7xl mx-auto pt-24 sm:pt-20 pb-6 px-4 sm:px-6 lg:px-8 main-content">
          <div class="flex flex-col md:flex-row gap-6">
            {/* Sidebar navigation */}
            <div class="w-full md:w-64 flex-shrink-0">
              <div class="bg-white p-4 rounded-lg shadow-sm sticky top-24 sm:top-20">
                <h2 class="font-semibold text-lg mb-4">Documentation</h2>
                <div id="nav-container">
                  <div class="flex justify-center p-4">
                    <div class="loading-spinner"></div>
                  </div>
                </div>
                
                {/* Retry button that appears when loading fails */}
                <div id="retry-container" class="mt-4 hidden">
                  <button id="retry-button" class="w-full py-2 px-3 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                    Retry Loading
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div class="flex-1">
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <div class="content-wrapper">
                  <div id="content-container" class="markdown-body">
                    <div class="flex justify-center items-center p-10">
                      <div class="loading-spinner mr-3"></div>
                      <p>Loading documentation...</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Debug panel - hidden by default */}
              <div id="debug-panel" class="debug-panel mt-4 hidden">
                <h3>Debug Information</h3>
                <div id="debug-output">
                  <p>No debug information available yet.</p>
                </div>
                <button id="toggle-debug-details">Show Full Response</button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <script dangerouslySetInnerHTML={{ __html: `
        // Initialize variables
        let pages = [];
        let activeSlug = '';
        let debugInfo = { };
        let isDebugVisible = false;
        let showFullDebug = false;
        
        // Debug utility function
        function logDebug(message, data) {
          console.log(message, data);
          const output = document.getElementById('debug-output');
          if (output) {
            if (typeof data === 'object') {
              debugInfo[message] = data;
              const pre = document.createElement('pre');
              pre.textContent = message + ': ' + JSON.stringify(data, null, 2).substring(0, 500) + (JSON.stringify(data, null, 2).length > 500 ? '...' : '');
              output.appendChild(pre);
            } else {
              const p = document.createElement('p');
              p.textContent = message + (data ? ': ' + data : '');
              output.appendChild(p);
            }
          }
        }
        
        // Show or hide debug panel
        function toggleDebugPanel(show) {
          const panel = document.getElementById('debug-panel');
          if (panel) {
            panel.classList.toggle('hidden', !show);
            isDebugVisible = show;
          }
        }
        
        // Toggle full debug details
        document.getElementById('toggle-debug-details').addEventListener('click', function() {
          showFullDebug = !showFullDebug;
          this.textContent = showFullDebug ? 'Hide Full Response' : 'Show Full Response';
          
          const output = document.getElementById('debug-output');
          if (output) {
            output.innerHTML = '';
            
            for (const [key, value] of Object.entries(debugInfo)) {
              const pre = document.createElement('pre');
              pre.textContent = key + ': ' + JSON.stringify(value, null, 2)
                .substring(0, showFullDebug ? 100000 : 500) 
                + (showFullDebug ? '' : '...');
              output.appendChild(pre);
            }
          }
        });
        
        // Function to render markdown content
        function renderMarkdown(content) {
          try {
            return marked.parse(content);
          } catch (err) {
            logDebug('Error parsing markdown', err);
            return '<p class="text-red-500">Error rendering content: ' + err.message + '</p><pre>' + content.substring(0, 500) + '...</pre>';
          }
        }
        
        // Function to set the active page
        function setActivePage(slug) {
          // Ignore lightbox slugs
          if (slug.startsWith('lightbox-')) {
            return;
          }
          
          // Remove active class from all nav items
          document.querySelectorAll('[id^="nav-page-"]').forEach(el => {
            el.classList.remove('bg-indigo-50', 'text-indigo-700', 'font-medium');
            el.classList.add('text-gray-700');
          });
          
          // Add active class to current nav item
          const navItem = document.getElementById('nav-page-' + slug);
          if (navItem) {
            navItem.classList.add('bg-indigo-50', 'text-indigo-700', 'font-medium');
            navItem.classList.remove('text-gray-700');
          }
          
          // Find page content
          const page = pages.find(p => p.slug === slug);
          if (page) {
            // Render content
            document.getElementById('content-container').innerHTML = renderMarkdown(page.content);
          } else {
            logDebug('Active page not found', { slug, availableSlugs: pages.map(p => p.slug) });
            document.getElementById('content-container').innerHTML = '<p class="text-red-500">Content not found for: ' + slug + '</p>';
          }
        }
        
        // Function to create navigation items
        function createNavItems() {
          const navContainer = document.getElementById('nav-container');
          navContainer.innerHTML = '';
          
          if (pages.length === 0) {
            navContainer.innerHTML = '<p class="text-gray-500 p-3">No documentation available.</p>';
            return;
          }
          
          const nav = document.createElement('nav');
          nav.className = 'space-y-1';
          
          pages.forEach(page => {
            const link = document.createElement('a');
            link.href = '#' + page.slug;
            link.id = 'nav-page-' + page.slug;
            link.className = 'block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50';
            link.textContent = page.title;
            
            // Add active class if this is the active page
            if (page.slug === activeSlug) {
              link.classList.remove('text-gray-700');
              link.classList.add('bg-indigo-50', 'text-indigo-700', 'font-medium');
            }
            
            nav.appendChild(link);
          });
          
          navContainer.appendChild(nav);
        }
        
        // Fetch documentation from API
        async function fetchDocs() {
          try {
            // Show loading states
            document.getElementById('nav-container').innerHTML = '<div class="flex justify-center p-4"><div class="loading-spinner"></div></div>';
            document.getElementById('content-container').innerHTML = '<div class="flex justify-center items-center p-10"><div class="loading-spinner mr-3"></div><p>Loading documentation...</p></div>';
            document.getElementById('retry-container').classList.add('hidden');
            
            logDebug('Fetching documentation from API');
            console.time('API Request');
            
            const response = await fetch('/api/docs');
            console.timeEnd('API Request');
            
            logDebug('API Response Status', response.status + ' ' + response.statusText);
            
            if (!response.ok) {
              throw new Error('Failed to fetch documentation: ' + response.status + ' ' + response.statusText);
            }
            
            const rawText = await response.text();
            logDebug('API Response Size', rawText.length + ' bytes');
            
            try {
              const data = JSON.parse(rawText);
              logDebug('API Response Data', data);
              
              if (data.error) {
                throw new Error(data.error);
              }
              
              if (!Array.isArray(data)) {
                throw new Error('Expected an array of documentation pages, got: ' + typeof data);
              }
              
              pages = data;
              logDebug('Parsed Pages', { count: pages.length, pages: pages.map(p => ({ slug: p.slug, title: p.title })) });
              
              // Get initial slug from hash or first page
              const hash = window.location.hash.replace('#', '');
              
              // Skip lightbox hashes for navigation
              if (hash && hash.startsWith('lightbox-')) {
                activeSlug = pages.length > 0 ? pages[0].slug : '';
              } else {
                activeSlug = hash || (pages.length > 0 ? pages[0].slug : '');
              }
              
              // If no hash is set and we have pages, set the hash to the first page slug
              if (!hash && pages.length > 0) {
                window.location.hash = pages[0].slug;
              } else {
                // Create navigation items without triggering the hash change event
                createNavItems();
                
                // Set initial content directly if not using hash navigation
                if (activeSlug) {
                  setActivePage(activeSlug);
                } else {
                  document.getElementById('content-container').innerHTML = '<p>No documentation available.</p>';
                }
              }
              
              logDebug('Active Slug', activeSlug);
              
              // Hide retry button
              document.getElementById('retry-container').classList.add('hidden');
            } catch (jsonErr) {
              logDebug('JSON Parse Error', jsonErr);
              throw new Error('Failed to parse API response: ' + jsonErr.message + '\\nRaw response: ' + rawText.substring(0, 200) + '...');
            }
          } catch (err) {
            console.error('Error fetching documentation:', err);
            logDebug('Fetch Error', err);
            
            document.getElementById('nav-container').innerHTML = '<p class="text-red-500 p-3">Error loading navigation: ' + err.message + '</p>';
            document.getElementById('content-container').innerHTML = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error loading documentation: ' + err.message + '</div>';
            
            // Show retry button
            document.getElementById('retry-container').classList.remove('hidden');
            toggleDebugPanel(true);
          }
        }
        
        // Set up retry button
        document.getElementById('retry-button').addEventListener('click', fetchDocs);
        
        // Event listener for hash changes
        window.addEventListener('hashchange', (e) => {
          const hash = window.location.hash.replace('#', '');
          
          // Skip navigation if hash is for a lightbox
          if (hash && hash.startsWith('lightbox-')) {
            // Keep reference to current active slug for use when closing the lightbox
            document.querySelectorAll('.lightbox').forEach(lightbox => {
              // Find all close buttons and update them
              lightbox.querySelectorAll('.close').forEach(closeBtn => {
                // We'll intercept the click with our event handler, but set the href for fallback
                closeBtn.setAttribute('href', '#' + activeSlug);
              });
            });
            return;
          }
          
          if (hash) {
            activeSlug = hash;
            setActivePage(activeSlug);
          } else if (pages.length > 0) {
            // Default to first page if no hash
            activeSlug = pages[0].slug;
            setActivePage(activeSlug);
          }
        });
        
        // Add keyboard shortcut for debug panel
        document.addEventListener('keydown', function(e) {
          // Ctrl+Shift+D or Cmd+Shift+D toggles debug panel
          if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'd') {
            toggleDebugPanel(!isDebugVisible);
            e.preventDefault();
          }
        });
        
        // Add event listeners for lightboxes
        function setupLightboxHandlers() {
          // Click handler for opening lightboxes
          document.addEventListener('click', function(e) {
            // Check if clicking a lightbox thumbnail link
            const thumbnailLink = e.target.closest('.img-grid a[href^="#lightbox-"]');
            if (thumbnailLink) {
              e.preventDefault();
              const lightboxId = thumbnailLink.getAttribute('href').substring(1);
              const lightbox = document.getElementById(lightboxId);
              
              if (lightbox) {
                // Show the lightbox
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                
                // Update URL without scrolling
                const scrollPosition = window.scrollY;
                history.pushState(null, '', '#' + lightboxId);
                window.scrollTo(0, scrollPosition);
                
                // Add keydown event listener when lightbox is opened
                addKeydownListener();
              }
            }
            
            // Check if clicking directly on a lightbox background (not on the image)
            const lightboxElement = e.target.closest('.lightbox');
            if (lightboxElement && e.target.classList.contains('lightbox')) {
              e.preventDefault();
              
              // Hide the lightbox
              lightboxElement.style.display = 'none';
              
              // Update URL to active slug without scrolling
              const scrollPosition = window.scrollY;
              history.pushState(null, '', '#' + activeSlug);
              window.scrollTo(0, scrollPosition);
              
              // Remove keydown listener when lightbox is closed
              removeKeydownListener();
            }
            
            // Check if clicking a close button
            const closeButton = e.target.closest('.lightbox .close');
            if (closeButton) {
              e.preventDefault();
              
              // Find the parent lightbox
              const lightbox = closeButton.closest('.lightbox');
              if (lightbox) {
                // Hide the lightbox
                lightbox.style.display = 'none';
                
                // Update URL to active slug without scrolling
                const scrollPosition = window.scrollY;
                history.pushState(null, '', '#' + activeSlug);
                window.scrollTo(0, scrollPosition);
                
                // Remove keydown listener when lightbox is closed
                removeKeydownListener();
              }
            }
            
            // Check if clicking next/prev navigation
            const navButton = e.target.closest('.lightbox .nav');
            if (navButton) {
              e.preventDefault();
              
              // Get the current lightbox and hide it
              const currentLightbox = navButton.closest('.lightbox');
              if (currentLightbox) {
                currentLightbox.style.display = 'none';
                
                // Get the target lightbox ID
                const targetId = navButton.getAttribute('href').substring(1);
                const targetLightbox = document.getElementById(targetId);
                
                if (targetLightbox) {
                  // Show the target lightbox
                  targetLightbox.style.display = 'flex';
                  targetLightbox.style.alignItems = 'center';
                  targetLightbox.style.justifyContent = 'center';
                  
                  // Update URL without scrolling
                  const scrollPosition = window.scrollY;
                  history.pushState(null, '', '#' + targetId);
                  window.scrollTo(0, scrollPosition);
                }
              }
            }
          });
          
          // Function to handle keydown events
          function handleKeydown(e) {
            // Close lightbox on any key press
            const openLightbox = document.querySelector('.lightbox[style*="display: flex"]');
            if (openLightbox) {
              // Hide the lightbox
              openLightbox.style.display = 'none';
              
              // Update URL to active slug without scrolling
              const scrollPosition = window.scrollY;
              history.pushState(null, '', '#' + activeSlug);
              window.scrollTo(0, scrollPosition);
              
              // Remove this event listener
              removeKeydownListener();
            }
          }
          
          // Function to add keydown event listener
          function addKeydownListener() {
            document.addEventListener('keydown', handleKeydown);
          }
          
          // Function to remove keydown event listener
          function removeKeydownListener() {
            document.removeEventListener('keydown', handleKeydown);
          }
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
          fetchDocs();
          setupLightboxHandlers();
        });
        
        // Backup initialization in case DOMContentLoaded already fired
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          setTimeout(() => {
            fetchDocs();
            setupLightboxHandlers();
          }, 1);
        }
      ` }} />
    </>
  );
} 