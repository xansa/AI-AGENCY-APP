---
name: Arka Editorial Narrative
colors:
  surface: '#0f141a'
  surface-dim: '#0f141a'
  surface-bright: '#353941'
  surface-container-lowest: '#0a0e15'
  surface-container-low: '#171c23'
  surface-container: '#1b2027'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2ec'
  on-surface-variant: '#c6c6cc'
  inverse-surface: '#dfe2ec'
  inverse-on-surface: '#2c3138'
  outline: '#909096'
  outline-variant: '#45474c'
  surface-tint: '#c0c6da'
  primary: '#c0c6da'
  on-primary: '#2a3040'
  primary-container: '#0b1220'
  on-primary-container: '#777d8f'
  inverse-primary: '#585e6f'
  secondary: '#c8c6c2'
  on-secondary: '#31302d'
  secondary-container: '#474743'
  on-secondary-container: '#b7b5b0'
  tertiary: '#b4c5ff'
  on-tertiary: '#002a78'
  tertiary-container: '#000f37'
  on-tertiary-container: '#3d74fc'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce2f6'
  primary-fixed-dim: '#c0c6da'
  on-primary-fixed: '#151b2a'
  on-primary-fixed-variant: '#404757'
  secondary-fixed: '#e5e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#0f141a'
  on-background: '#dfe2ec'
  surface-variant: '#31353c'
typography:
  display-2xl:
    fontFamily: EB Garamond
    fontSize: 128px
    fontWeight: '500'
    lineHeight: 110%
    letterSpacing: -0.04em
  display-xl:
    fontFamily: EB Garamond
    fontSize: 80px
    fontWeight: '500'
    lineHeight: 110%
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 115%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 120%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 130%
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: '0'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: 0.14em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 100%
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  section-padding-v: 160px
  section-padding-h: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is rooted in **Exaggerated Minimalism** and **Editorial Prestige**. It balances the authoritative weight of traditional broadsheet journalism with the sleek, high-velocity feel of a modern digital agency. The UI should evoke a sense of curated intelligence, confidence, and bespoke craftsmanship.

The aesthetic utilizes aggressive white space (or "ink space") to frame content as art. Layouts should feel intentional and structural, moving away from standard bootstrap-style grids toward asymmetric, dynamic compositions that guide the eye through high-contrast storytelling.

## Colors

The palette is built on a high-contrast foundation to ensure maximum legibility and emotional impact.

*   **Anchor (Background):** #0B1220 (Deep Navy/Ink Black). Used for the primary canvas to create depth.
*   **Contrast (Text/Surfaces):** #FAF7F2 (Warm Cream). Used for primary typography and inverted section backgrounds to provide a tactile, paper-like quality.
*   **Accent:** #2563EB (Bright Blue). Reserved exclusively for primary calls to action, active navigation states, and critical focal points. Use sparingly to maintain the editorial "premium" feel.
*   **Muted States:** Use the Warm Cream color at 78% opacity for secondary body text and 40% for decorative borders or disabled states.

## Typography

Typography is the primary visual driver of this design system. 

*   **Headlines:** Utilize **EB Garamond**. At large scales (Display 2XL/XL), tracking should be tightened significantly (-0.03em to -0.04em) to create a "locked-in" editorial look.
*   **Body:** Utilize **Plus Jakarta Sans**. It provides a clean, contemporary counterpoint to the serif headlines. Ensure generous line-height (1.6) to facilitate readability against dark backgrounds.
*   **Overlines/Metadata:** Always use `label-caps`. The wide letter-spacing (0.14em) creates a structural "frame" for the content below it.

## Layout & Spacing

This design system uses a **Fluid Editorial Grid**. While a 12-column foundation is used for alignment, elements should frequently "break" the grid or use offset positioning to create visual interest.

*   **Asymmetry:** Headlines should often be offset to the left or right, leaving significant negative space in the adjacent columns.
*   **Generous Breathing Room:** Vertical section padding is intentionally large (160px+) to ensure each case study or service offering feels like a distinct chapter.
*   **Desktop:** 12 columns, 64px margins.
*   **Tablet:** 8 columns, 40px margins.
*   **Mobile:** 4 columns, 24px margins. Use `display-xl-mobile` to ensure headlines remain impactful without breaking words awkwardly.

## Elevation & Depth

To maintain the "Minimalist" and "Editorial" aesthetic, traditional shadows are avoided. Depth is achieved through **Tonal Layering** and **High-Contrast Outlines**.

*   **Surfaces:** Backgrounds remain flat #0B1220. Floating elements (like modals or dropdowns) should use a subtle border of #FAF7F2 at 15% opacity rather than a shadow.
*   **The "Paper" Effect:** When switching to a light-themed section, the background becomes #FAF7F2 and text becomes #0B1220. This "hard-cut" transition between sections creates a physical sense of depth as the user scrolls.
*   **Interaction:** Use 1px solid borders for interactive containers to define boundaries without adding visual "weight."

## Shapes

The shape language is disciplined and architectural. 

*   **Corners:** Use a consistent **Soft (4px)** radius for most UI elements. This prevents the design from feeling too "sharp/aggressive" (Brutalist) while remaining more serious than fully rounded "consumer" apps.
*   **Media:** Imagery (case study photography, video) should maintain 0px (sharp) corners to emphasize the editorial grid and look like printed photographs.
*   **Buttons:** Apply a slightly more pronounced 8px (rounded-lg) for tactile comfort, or keep them consistent with the 4px system for a more rigid look.

## Components

*   **Buttons:**
    *   **Primary:** Solid #2563EB background with #FAF7F2 text. High-contrast, rectangular with a 4px radius. 
    *   **Secondary:** Ghost style. #FAF7F2 border (1px) with #FAF7F2 text. Hover state fills the background with #FAF7F2 and flips text to #0B1220.
*   **Inputs:** Minimalist bottom-border only (#FAF7F2 at 40% opacity). On focus, the border becomes the Accent Blue. Labels use the `label-caps` style positioned above the field.
*   **Cards:** No background or shadow. Defined by a top-border of 1px (#FAF7F2 at 20%) and generous internal padding. Content is stacked vertically using `stack-md`.
*   **Icons:** Use **Lucide** style (2px stroke). Icons should always be monochromatic (Cream or Blue) and sized at 20px or 24px to maintain the "Thin Line" aesthetic.
*   **Navigation:** Clean, horizontal list. Active links are denoted by the Accent Blue or a small 4px dot below the text.
*   **Section Dividers:** Thin 1px lines (#FAF7F2 at 10%) used sparingly to separate vertical content blocks without cluttering the "ink space."