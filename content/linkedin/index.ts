/**
 * LinkedIn posts barrel export.
 *
 * Re-exports the LinkedInPost array from the original file for backward
 * compatibility with the social media agent. Each post also has its own
 * folder under content/linkedin/post-XX/ with:
 *   - tekst.md   (copy-paste ready LinkedIn text)
 *   - carousel/   (branded PNG slides, 1080x1080)
 *
 * To regenerate carousel PNGs: node scripts/generate-linkedin-carousels.mjs
 */
export { linkedInPosts, type LinkedInPost } from "../linkedin-posts";
