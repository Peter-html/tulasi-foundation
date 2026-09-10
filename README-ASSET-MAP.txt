TULASI FOUNDATION - FULL MEDIA BUILD
====================================

This package contains the full React/Vite website plus the currently available website media.
The 3D GLB itself is NOT included because it was not uploaded as a file in chat.

CURRENT PROJECT PREVIEW MAPPING
-------------------------------
Project 01 (Limelight)
  Cover image:
    public/projects/limelight/limelight-2.webp
  Hover video:
    public/videos/projects/project-1-preview.mp4
  This file is the uploaded "project-2-preview.mp4", renamed for its website slot.

Project 02
  Cover/side/gallery images are lightweight still frames made from its current preview footage:
    public/projects/project-02/cover.webp
    public/projects/project-02/side.webp
    public/projects/project-02/gallery-1.webp
    public/projects/project-02/gallery-2.webp
    public/projects/project-02/gallery-3.webp
  Hover video:
    public/videos/projects/project-2-preview.mp4
  This file is the uploaded "project-3-preview.mp4", renamed for its website slot.

Project 03
  Cover/side/gallery images are lightweight still frames made from the current Tulasi hero footage:
    public/projects/project-03/cover.webp
    public/projects/project-03/side.webp
    public/projects/project-03/gallery-1.webp
    public/projects/project-03/gallery-2.webp
    public/projects/project-03/gallery-3.webp
  Hover video:
    public/videos/hero/tulasi-hero.mp4
  Project 03 deliberately reuses the SAME file as the homepage hero, so the video is not duplicated.

Project 04
  Static image only. NO previewVideo field is configured.
    public/projects/project-04/project-4-cover.webp

HOMEPAGE HERO
-------------
  public/videos/hero/tulasi-hero.mp4

The included hero copy is optimized to 1920x1080 / 30fps / H.264 for browser playback.

3D CONCEPT VILLA
----------------
Place your downloaded GLB here:
  public/models/concept-villa.glb

The website code already points to this filename. Once you add the GLB, Project 02's concept section will use the interactive viewer.
The viewer is configured for an approximately 180-degree horizontal orbit with cursor drag and exterior zoom.

If the model initially faces the wrong direction, edit:
  src/data/mockProjects.js
and change:
  conceptModelRotationY: 0
Possible values to try:
  Math.PI / 2
  Math.PI
  -Math.PI / 2

WHERE TO EDIT PROJECT DETAILS
-----------------------------
Edit:
  src/data/mockProjects.js

That file controls:
  project name
  location
  type
  project status
  pricing text
  description
  cover image
  hover preview video
  gallery images
  concept model path

PROJECT 04 IMAGE-ONLY RULE
--------------------------
Do not add previewVideo to project-04 in mockProjects.js.
ProjectCard.jsx automatically keeps the image visible when previewVideo is absent.

RUNNING THE WEBSITE
-------------------
1. Open Command Prompt inside the Tulasi-Foundation-main folder.
2. Run:
     npm install
3. Run:
     npm run dev

The package.json already contains the dependencies needed for the 3D viewer:
  three
  @react-three/fiber
  @react-three/drei

IMPORTANT
---------
Do not copy your original 4K drone files into public/ for production. Use the optimized web versions included here.
