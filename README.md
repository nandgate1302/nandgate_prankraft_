# The Adaptive Auth Gateway

A React-based authentication interface that explores Behavioral UX and Deceptive Design. This project was developed for Prankraft 2026 conducted by IEEE Computer Society SB GECT to demonstrate how front-end states can be used to subvert standard user expectations through cultural context and reactionary triggers.

## Core Interaction Flow

1. **Behavioral Login**
   
   The login phase features a reactive "Blinking Guy" avatar.
      - The avatar blinks if the user pauses or erases text in the username field.
      - The avatar's eyes close entirely during password entry to simulate "secure" monitoring.

2. **Navarasa Verification (CAPTCHA)**
   
   A 9-grid CAPTCHA utilizing Jagathy Sreekumar’s Navarasas from a Malayalam film.
      - Users are prompted to identify "self-discovered" expressions.
      - Incorrect selections trigger a synchronized audio and Vibration API pulse.
      - Progression is tied to a "forced failure" state, users must select the wrong grids to trigger the next phase.

3. **System Failure & Redirection**
   
      - A recreation of the Chrome "Aw, Snap!" page appears post-verification.
      - The "Reload" button initiates a 6-8 second Rickroll sequence.
      - The experience ends with a "Jal Lijiye" hospitality meme, providing a link to the source code and an option to return home.

## Hidden Features

1. **Inactivity Monitor**: Triggers a "Faah!" audio jump-scare if the interface remains idle for 30 seconds.

2. **URL Hijacking**: Navigating to /admin renders a Confused Nick Young meme instead of a standard 404.

3. **Haptic Integration**: All audio triggers are mapped to the mobile Vibration API for tactile feedback.

## Tech Stack

**Framework**: React.js (Vite)

**Styling**: Tailwind CSS

**Deployment**: Vercel
