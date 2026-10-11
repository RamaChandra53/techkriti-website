# Atmospheric assets

Generated with the built-in image generation tool on 11 October 2026. The original logo and castle wallpaper are unchanged. These transparent sprites are decorative fictional imagery, not MGIT photography. Optimized WebP versions are served from `public/effects/`.

## Ghost prompt

Use case: stylized-concept. Asset type: transparent cinematic VFX sprite for a haunted castle website background. A single realistic spectral human apparition full length, eerie indistinct faceless hooded figure made of translucent silver-blue vapor and threadbare flowing gauze, no eyes or mouth icon, natural tattered fabric fine detail dissolving into wispy mist at bottom. Photorealistic movie VFX, dim cold lightning rim light, soft feathered alpha edges, subtly asymmetric, centered and isolated, no scenery, no shadow floor, no text. Ghost should be an elusive pale figure glimpsed in rain, not a cartoon, not a bedsheet with round eyes. Genuine transparent background. Full figure entirely within frame.

## Bat prompt

Use case: photorealistic-natural. Asset type: transparent VFX sprite. One realistic small nocturnal bat seen from slightly below, wings fully extended symmetrically horizontally, anatomically accurate delicate leathery wing membranes stretched between long finger bones, small furry body, subtle pointed ears, dark charcoal black with faint cool moonlit rim light. Entire creature isolated centered with generous transparent margin; full span visible, no scenery, no text, no shadows behind it. Natural wildlife photography, no cartoon, no icon. Wide horizontal composition. True transparent background. Used as distant flying bat over a moonlit castle.

## Behavior

The fixed decorative canvas renders depth-varied rain and flying bats at approximately 30 frames per second, capped at 1.5 device pixel ratio. Bats use a textured wing mesh with shoulder rotation, delayed wrist flex, a rigid body, velocity-based steering, damping, and banking. This is a stylized kinematic flight model, not a scientific aerodynamics simulation. Brighter branching lightning and a single illumination bloom every 9–18 seconds reveal the ghost sprites. Rain uses 360 particles on desktop and 165 on phones; the extra hero veil is removed so the weather remains visible over the existing darkened wallpaper. Hidden tabs suspend rendering, reduced-motion users receive the static wallpaper, and a visible pause control disables the canvas. The countdown targets midnight IST on the confirmed festival date, 16 October 2026, and explicitly states that opening time remains unconfirmed. It clamps at zero.
