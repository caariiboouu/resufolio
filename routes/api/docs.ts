import { Handlers } from "$fresh/server.ts";
import { join } from "$std/path/mod.ts";
import { extract } from "$std/front_matter/yaml.ts";

interface DocPage {
  slug: string;
  title: string;
  content: string;
}

interface FrontMatterAttrs {
  title?: string;
  [key: string]: unknown;
}

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log("API endpoint called - GET /api/docs");

    try {
      // First, check if the docs directory exists
      const docsPath = join(Deno.cwd(), "docs/gogirlgala");

      try {
        const dirInfo = await Deno.stat(docsPath);
        if (!dirInfo.isDirectory) {
          console.error(`Path exists but is not a directory: ${docsPath}`);
          return new Response(
            JSON.stringify({
              error: "Documentation directory not found",
              path: docsPath,
              exists: true,
              isDirectory: false,
            }),
            {
              status: 404,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
        console.log(`Directory exists: ${docsPath}`);
      } catch (statErr) {
        console.error(`Error checking directory: ${docsPath}`, statErr);

        // Try to list the parent directory to see what's available
        try {
          const parentPath = join(Deno.cwd(), "docs");
          console.log(`Checking parent directory: ${parentPath}`);
          const parentEntries = [];
          for await (const entry of Deno.readDir(parentPath)) {
            parentEntries.push(entry.name);
          }
          console.log(
            `Contents of parent directory: ${parentEntries.join(", ")}`,
          );
        } catch (parentErr) {
          console.error("Error listing parent directory:", parentErr);
        }

        return new Response(
          JSON.stringify({
            error: "Documentation directory not found",
            path: docsPath,
            exists: false,
            details: statErr instanceof Error
              ? statErr.message
              : String(statErr),
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Get all files in the directory
      const docPages: DocPage[] = [];
      const entries = [];

      try {
        for await (const dirEntry of Deno.readDir(docsPath)) {
          entries.push(dirEntry);
        }

        console.log(`Found ${entries.length} files/directories in ${docsPath}`);

        // Log all entries for debugging
        for (const entry of entries) {
          console.log(
            `Entry: ${entry.name} (${entry.isFile ? "File" : "Directory"})`,
          );
        }
      } catch (readErr) {
        console.error(`Error reading directory: ${docsPath}`, readErr);
        return new Response(
          JSON.stringify({
            error: "Failed to read documentation directory",
            details: readErr instanceof Error
              ? readErr.message
              : String(readErr),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Process each markdown file
      for (const dirEntry of entries) {
        if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
          try {
            const filePath = join(docsPath, dirEntry.name);
            console.log(`Reading file: ${filePath}`);

            const fileContent = await Deno.readTextFile(filePath);
            console.log(`File content length: ${fileContent.length} bytes`);

            // Extract title and content - handle files without front matter
            let title = "";
            let content = fileContent;

            try {
              // First try with front matter extraction
              const { attrs, body } = extract(fileContent) as {
                attrs: FrontMatterAttrs;
                body: string;
              };

              // If front matter extraction worked, use it
              title = attrs.title || extractTitleFromMarkdown(body) ||
                dirEntry.name.replace(".md", "");
              content = body;

              console.log(
                `Front matter extraction successful for: ${dirEntry.name}`,
              );
            } catch (frontMatterErr) {
              // If front matter extraction failed, fall back to just extracting title from content
              console.log(
                `No front matter found in ${dirEntry.name}, extracting title from content directly`,
              );
              title = extractTitleFromMarkdown(fileContent) ||
                dirEntry.name.replace(".md", "");
              content = fileContent;
            }

            const slug = dirEntry.name.replace(".md", "");

            docPages.push({
              slug,
              title,
              content,
            });

            console.log(
              `Successfully processed: ${dirEntry.name} with title: ${title}`,
            );
          } catch (fileErr) {
            console.error(`Error processing file ${dirEntry.name}:`, fileErr);
          }
        }
      }

      if (docPages.length === 0) {
        console.log("No markdown files were processed successfully");
        // Return a sample doc for debugging
        docPages.push({
          slug: "debug",
          title: "Debug Information",
          content: `# Debug Information
          
This is a test document created by the API when no valid markdown files were found.

Directory: \`${docsPath}\`
Files found: ${entries.length}
Markdown files: ${
            entries.filter((e) => e.isFile && e.name.endsWith(".md")).length
          }

Please make sure the markdown files exist in the correct directory.`,
        });
      } else {
        console.log(`Successfully processed ${docPages.length} markdown files`);
      }

      // Sort pages alphabetically by title
      docPages.sort((a, b) => a.title.localeCompare(b.title));

      // Return the data as JSON
      return new Response(JSON.stringify(docPages), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: unknown) {
      console.error("Unhandled error in API handler:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : String(error);
      return new Response(
        JSON.stringify({
          error: errorMessage,
          stack: error instanceof Error ? error.stack : undefined,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  },
};

function extractTitleFromMarkdown(content: string): string | null {
  // Find the first heading in the markdown content
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}
