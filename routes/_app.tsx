import { type PageProps } from "$fresh/server.ts";
import { useCSP } from "$fresh/runtime.ts";
import AnalyticsTracker from "../islands/AnalyticsTracker.tsx";

export default function App({ Component }: PageProps) {
  useCSP((csp) => {
    csp.directives.defaultSrc = ["'self'"];
    csp.directives.scriptSrc = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
    csp.directives.styleSrc = ["'self'", "'unsafe-inline'"];
    csp.directives.imgSrc = ["'self'", "data:", "https:"];
    csp.directives.fontSrc = ["'self'", "https:", "data:"];
    csp.directives.connectSrc = ["'self'"];
    csp.directives.objectSrc = ["'none'"];
    csp.directives.baseUri = ["'self'"];
    csp.directives.formAction = ["'self'"];
    csp.directives.frameAncestors = ["'none'"];
  });
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Joel Cuthriell • UX</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-[#E7DECA] min-h-screen">
        <Component />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
