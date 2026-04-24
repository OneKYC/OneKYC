@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --navy-950: #1B2A4A;
    --navy-900: #162238;
    --navy-800: #1E3355;
    --amber-600: #C69B3C;
    --amber-500: #D4A843;
    --amber-400: #E0BC68;
    --warm-ivory: #F7F4EE;
    --warm-sand: #EDE9E1;
    --warm-white: #FAFAF7;
    --navy-muted: #5A6B82;
    --navy-subtle: #8A96A8;
    --navy-stroke: #C5CDD6;
    --success: #3D8B5E;
    --amber-ghost: rgba(198, 155, 60, 0.08);
    --navy-ghost: rgba(27, 42, 74, 0.04);

    --page-margin: clamp(24px, 5vw, 80px);
    --section-padding-y: clamp(80px, 12vh, 140px);
    --element-gap-sm: 16px;
    --element-gap-md: 32px;
    --element-gap-lg: 64px;
    --grid-gap: 32px;
    --max-content-width: 1200px;
    --border-radius-sm: 4px;
    --border-radius-md: 8px;

    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.625rem;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: var(--navy-950);
    background-color: var(--warm-ivory);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }
}

@layer base {
  * {
    @apply border-border;
  }
}
