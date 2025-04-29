// Custom PDF.js viewer configuration
document.addEventListener('webviewerloaded', function() {
  // Get the viewer
  const PDFViewerApplication = window.PDFViewerApplication;
  
  // Function to check URL params
  function getURLParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }
  
  // Wait for the viewer to initialize
  PDFViewerApplication.initializedPromise.then(() => {
    // Check if sidebar parameter is set to false
    if (getURLParam('sidebar') === 'false') {
      // Close the sidebar if it's open
      if (PDFViewerApplication.pdfSidebarView && 
          PDFViewerApplication.pdfSidebarView.isOpen) {
        PDFViewerApplication.pdfSidebarView.close();
      }
    }
  });
}); 