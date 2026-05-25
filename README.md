# Lamborghini Showcase

A cinematic, section-based Lamborghini landing experience built with React, Vite, GSAP, and Tailwind CSS.

The app uses a loader-first flow, chained reveal animations, and controlled wheel scrolling to move section by section.

## Tech Stack

- React 19
- Vite 8
- GSAP + ScrollTrigger + SplitText
- Tailwind CSS 4
- react-responsive

## Features

- Fullscreen animated loader before page content appears
- Sequential section reveal flow:
	Hero -> Back -> Side -> Engine -> Stats -> Footer
- SplitText line-by-line text animations
- ScrollTrigger-based section animation timelines
- One-wheel-step section navigation with fast-scroll protection
- Native scrolling allowed inside tall sections before snapping to next section
- Scroll restoration disabled on refresh so page always starts from top
- Mobile responsive layouts, including 2x2 stats grid on small screens

## Project Structure

```text
src/
	App.jsx
	index.css
	main.jsx
	context/
		AnimationContext.jsx
	components/
		Loader.jsx
		Hero.jsx
		Back.jsx
		Side.jsx
		Engine.jsx
		Stats.jsx
		Footer.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` starts Vite in development mode
- `npm run build` builds the production bundle
- `npm run preview` previews the built app locally
- `npm run lint` runs ESLint checks

## Animation Flow Notes

- Global animation completion state is managed in `AnimationContext`.
- Each section waits for the previous section completion flag before becoming visible/animated.
- Loader completion controls when main sections mount.
- Section scroll behavior is managed in `App.jsx` to keep navigation predictable when scrolling quickly.

## Assets

Static assets are stored in:

- `public/images`
- `public/audio`

## License

This project is for showcase/demo purposes.
