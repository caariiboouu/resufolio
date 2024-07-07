import { type PageProps } from "$fresh/server.ts";
import { useCSP } from "$fresh/runtime.ts";

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
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>resufolio</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-[#1bafc6]">
        <Component />
      </body>
    </html>
  );
}
