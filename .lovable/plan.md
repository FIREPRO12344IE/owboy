# Cinematic Private Access Experience

## Goal
Create a mobile-first, single-page music experience that feels like a private invitation: access code first, a short welcome reveal, then exclusive artwork and actions. Include a minimal merch view marked “Coming soon.”

## Experience
- Open on a full-screen access gate with oversized editorial type and a compact code field.
- Accept a demo access code and transition into a brief cinematic welcome animation.
- Reveal the exclusive drop with large artwork, release details, and clear “Listen now” and “Download” actions.
- Add minimal navigation between the exclusive drop and a sparse merch view that says “Coming soon.”
- Keep transitions smooth and restrained, with reduced-motion support.

## Visual Direction
- Deep black and charcoal surfaces, soft off-white type, and subtle film grain.
- Bold, clean display typography with strong scale contrast and generous breathing room.
- Editorial music photography as the dominant visual element.
- Compact label-like controls with squared corners; no oversized pills, neon purple, gradients, or glitch effects.

## Technical Details
- Build the experience at `/` using local React state; no account or database is needed for this first version.
- Generate and bundle one original cinematic artwork asset.
- Define all palette, typography, texture, and motion values in the global design system.
- Add route-specific social and search metadata.
- Verify the access flow, navigation, and layout at the requested mobile viewport and on desktop.
