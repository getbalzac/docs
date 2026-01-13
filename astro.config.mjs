// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Balzac",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/getbalzac/balzac",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            { label: "Getting Started", slug: "guides/getting-started" },
            { label: "Quick Start", slug: "guides/quick-start" },
            { label: "Installation", slug: "guides/installation" },
            { label: "Project Structure", slug: "guides/project-structure" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Configuration", slug: "reference/configuration" },
            { label: "Collections", slug: "reference/collections" },
            { label: "Templates", slug: "reference/templates" },
            { label: "Hooks", slug: "reference/hooks" },
          ],
        },
      ],
    }),
  ],
});
