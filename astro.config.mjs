// @ts-check
import { defineConfig } from 'astro/config';

// Static personal site for zinu.kim, deployed on Cloudflare Pages.
export default defineConfig({
  site: 'https://zinu.kim',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
