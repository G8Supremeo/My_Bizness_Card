# 📖 Technical Guide: Build This 3D Digital Business Card from Scratch

> **Who is this guide for?**
> This guide is written for someone who **only knows HTML and CSS**. If you've never heard of React, JSX, npm, or TypeScript — **that's perfectly fine.** We will explain every single concept, every file, every function, and every line of syntax from absolute zero. By the end, you will have built a fully working, animated, 3D business card entirely by yourself.

---

## Table of Contents

1. [What Even Is This Project?](#1-what-even-is-this-project)
2. [New Concepts You'll Learn (Don't Panic!)](#2-new-concepts-youll-learn-dont-panic)
3. [Why TypeScript Instead of JavaScript?](#3-why-typescript-instead-of-javascript)
4. [Deep Dive: `.js` vs `.jsx` vs `.ts` vs `.tsx`](#4-deep-dive-js-vs-jsx-vs-ts-vs-tsx)
5. [The Tools We Need (Prerequisites)](#5-the-tools-we-need-prerequisites)
6. [Step 1: Creating the Project](#step-1-creating-the-project)
7. [Step 2: Understanding What Vite Created for You](#step-2-understanding-what-vite-created-for-you)
8. [Step 3: Installing Extra Packages We Need](#step-3-installing-extra-packages-we-need)
9. [Step 4: Setting Up Tailwind CSS + Custom Fonts](#step-4-setting-up-tailwind-css--custom-fonts)
10. [Step 5: Understanding `main.tsx` — The Starting Point](#step-5-understanding-maintsx--the-starting-point)
11. [Step 6: Understanding `App.tsx` — The Container](#step-6-understanding-apptsx--the-container)
12. [Step 7: Building `BusinessCard.tsx` — The Star of the Show](#step-7-building-businesscardtsx--the-star-of-the-show)
    - [Part A: The Imports (Loading Our Tools)](#part-a-the-imports-loading-our-tools)
    - [Part B: The Component Shell](#part-b-the-component-shell)
    - [Part C: State — Remembering Things (Dark Mode & Card Flip)](#part-c-state--remembering-things-dark-mode--card-flip)
    - [Part D: 3D Tilt Effect — Making the Card Follow Your Mouse](#part-d-3d-tilt-effect--making-the-card-follow-your-mouse)
    - [Part E: Mouse Movement Handler — Calculating Where the Cursor Is](#part-e-mouse-movement-handler--calculating-where-the-cursor-is)
    - [Part F: VCard Download — Generating a Contact File](#part-f-vcard-download--generating-a-contact-file)
    - [Part G: The JSX Layout — Building the Visual Card](#part-g-the-jsx-layout--building-the-visual-card)
13. [Step 8: Run It!](#step-8-run-it)
14. [Complete Function Reference](#complete-function-reference)
15. [How to Use OOP in This Project](#how-to-use-oop-in-this-project)
16. [Full Project File Structure](#full-project-file-structure)

---

## 1. What Even Is This Project?

This project is a **digital business card** — a small, single-page web application that looks and behaves like a physical card you'd hand to someone. But way cooler, because:

- It **tilts in 3D** when you move your mouse over it (like holding a holographic card).
- It **flips over** when you click it (to show a QR code on the back).
- It has a **dark/light mode toggle** (switching between sky blue and rose themes).
- It lets people **download your contact info** as a `.vcf` file (the same format your phone uses for contacts).

---

## 2. New Concepts You'll Learn (Don't Panic!)

If you only know HTML and CSS, here are the new things you'll encounter. **Don't worry** — we explain each one as we go:

| Concept | What It Is (In Plain English) |
|---|---|
| **npm** | A tool that downloads code libraries other people have written, so you don't have to write everything yourself. Think of it like an app store for JavaScript code. |
| **Node.js** | A program you install on your computer that lets you run JavaScript outside of a web browser. Required for npm to work. |
| **React** | A JavaScript library (made by Facebook) that helps you build web pages by breaking them into small, reusable pieces called "components." |
| **JSX** | A special syntax that lets you write HTML-like code *inside* JavaScript files. Instead of writing HTML in a `.html` file and JS in a `.js` file, you combine them in one place. |
| **Component** | A reusable building block. Think of it like a custom HTML tag you invent yourself. For example, `<BusinessCard />` is a component we create that renders an entire card. |
| **Vite** | A super fast development tool that bundles your code and serves it in a browser with live reloading (every time you save a file, the browser updates instantly). |
| **TypeScript** | JavaScript with added safety. It checks your code for mistakes before you even run it. See Section 3 for more details. |
| **Tailwind CSS** | A CSS library that gives you pre-made class names (like `bg-blue-500`, `rounded-xl`, `text-white`) so you can style things without writing custom CSS rules. |
| **Framer Motion** | A React library specifically designed for animations. It provides special elements like `<motion.div>` that can animate smoothly. |

---

## 3. Why TypeScript Instead of JavaScript?

You might have expected `.js` files but instead you see `.ts` and `.tsx` files. Here's why:

**TypeScript = JavaScript + Safety Checks.**

Imagine you write this in regular JavaScript:
```javascript
// Regular JavaScript — No complaints, but this is a BUG
function addNumbers(a, b) {
    return a + b;
}

addNumbers("hello", 5); // Returns "hello5" instead of a number. Oops!
```

Now the same thing in TypeScript:
```typescript
// TypeScript — Catches the bug BEFORE you run it
function addNumbers(a: number, b: number): number {
    return a + b;
}

addNumbers("hello", 5); // RED ERROR IN YOUR EDITOR: "hello" is not a number!
```

**The key points:**
- You add `: number` or `: string` or `: boolean` after variables to tell TypeScript what kind of data they should hold.
- If you make a mistake, your code editor (VS Code) will underline it in red *instantly*, before you even open the browser.
- **Every valid JavaScript line is also valid TypeScript.** TypeScript just *adds* safety on top.
- When you generate a new React project with Vite (the tool we use), it defaults to TypeScript because it's the modern industry standard.

**File extensions (quick reference):**
| Extension | Meaning |
|---|---|
| `.js` | Regular JavaScript |
| `.ts` | TypeScript (no HTML-like syntax inside) |
| `.jsx` | JavaScript with JSX (HTML inside JS) |
| `.tsx` | TypeScript with JSX (HTML inside TS) — **This is what our main file uses** |

For a much deeper explanation of each file type with examples, see the next section.

---

## 4. Deep Dive: `.js` vs `.jsx` vs `.ts` vs `.tsx`

This is one of the most confusing things for beginners, so let's break it down completely.

### `.js` — Plain JavaScript

This is the standard JavaScript you may already know. You write logic, manipulate the DOM, and handle events, but you **cannot** write HTML-like syntax (JSX) inside it.

```javascript
// greeting.js — plain JavaScript
function greet(name) {
    const heading = document.createElement('h1');
    heading.textContent = 'Hello, ' + name + '!';
    document.body.appendChild(heading);
}

greet('Supreme');
```

**When to use:** Configuration files, utility scripts, Node.js server code, or any JavaScript that doesn't render UI components.

**In our project:** We don't have any `.js` files because we use TypeScript.

---

### `.jsx` — JavaScript + JSX (HTML inside JavaScript)

**JSX** stands for **JavaScript XML**. It lets you write HTML-like code directly inside your JavaScript. The browser can't read JSX natively — a tool like Vite converts it into regular JavaScript behind the scenes.

```jsx
// Greeting.jsx — JavaScript with HTML syntax inside!
function Greeting() {
    const name = 'Supreme';
    
    // This LOOKS like HTML, but it's actually JSX:
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>Welcome to my card.</p>
        </div>
    );
}
```

**Compare the two approaches:**

| Approach | How You Create a Heading |
|---|---|
| Plain HTML | `<h1>Hello!</h1>` (in a `.html` file) |
| Plain JS (`.js`) | `document.createElement('h1'); heading.textContent = 'Hello!';` |
| JSX (`.jsx`) | `return <h1>Hello!</h1>;` (inside a JS function!) |

JSX is basically a shortcut so you don't have to write `document.createElement()` over and over again. It looks like HTML but it's secretly JavaScript.

**When to use:** Any React component that renders visual UI, if your project does NOT use TypeScript.

---

### `.ts` — TypeScript (no HTML/JSX)

TypeScript files contain pure logic with type safety, but **no JSX** (no HTML-like syntax inside).

```typescript
// mathUtils.ts — TypeScript without JSX
function addNumbers(a: number, b: number): number {
    return a + b;
}

// TypeScript catches this mistake:
addNumbers('hello', 5); // ERROR: 'hello' is not a number!
```

**When to use:** Configuration files, data models, utility functions, API calls — anything that doesn't render UI.

**In our project:** `vite.config.ts` is a `.ts` file because it's just configuration — no HTML rendering.

---

### `.tsx` — TypeScript + JSX (The Full Package)

This combines TypeScript's type safety with JSX's ability to write HTML inside JavaScript. **This is what our `BusinessCard.tsx` uses.**

```tsx
// Greeting.tsx — TypeScript + JSX

// The ": string" is TypeScript, the <h1> is JSX
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>;
}

// TypeScript catches this:
<Greeting name={42} />  // ERROR: 42 is not a string!
```

**When to use:** Any React component that renders visual UI in a TypeScript project.

**In our project:** `BusinessCard.tsx`, `App.tsx`, and `main.tsx` are all `.tsx` files because they render UI and use TypeScript.

---

### Summary: Which Files Use Which Extension in Our Project?

| File | Extension | Why? |
|---|---|---|
| `BusinessCard.tsx` | `.tsx` | Contains React components (JSX) + TypeScript types |
| `App.tsx` | `.tsx` | Contains a React component (JSX) + TypeScript |
| `main.tsx` | `.tsx` | Contains JSX (`<App />`) + TypeScript |
| `vite.config.ts` | `.ts` | Pure configuration, no JSX needed |
| `index.css` | `.css` | Standard CSS file |
| `index.html` | `.html` | Standard HTML file |

### A Visual Mental Model

```
         ┌─────────────────────────────────────────┐
         │              FILE EXTENSIONS             │
         ├───────────────┬─────────────────────────┤
         │               │    + TYPE SAFETY         │
         │               │    (TypeScript)          │
         ├───────────────┼─────────────────────────┤
         │  .js          │  .ts                    │
         │  Plain logic  │  Plain logic + types    │
         ├───────────────┼─────────────────────────┤
         │  + HTML (JSX) │  + HTML (JSX)           │
         ├───────────────┼─────────────────────────┤
         │  .jsx         │  .tsx  ← WE USE THIS    │
         │  Logic + HTML │  Logic + HTML + types   │
         └───────────────┴─────────────────────────┘
```

---

## 5. The Tools We Need (Prerequisites)

Before starting, you need two things installed on your computer:

### Install Node.js
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the installer (just click "Next" through everything)
4. To verify it worked, open your terminal (Command Prompt on Windows, Terminal on Mac) and type:
```bash
node --version
```
You should see something like `v20.x.x`. If you see an error, Node.js didn't install correctly.

### Install a Code Editor
We recommend **Visual Studio Code** (VS Code):
1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download and install it.

**That's it!** `npm` comes bundled with Node.js automatically.

---

## Step 1: Creating the Project

Open your terminal and run these three commands one at a time:

```bash
npm create vite@latest my_dcard -- --template react-ts
```

**What does this command do?**
- `npm create vite@latest` — Tells npm to download and run the Vite project generator.
- `my_dcard` — This is the name of the folder it will create.
- `--template react-ts` — Tells Vite to set up a React project using TypeScript.

After it finishes, you'll see a new folder called `my_dcard`. Now run:

```bash
cd my_dcard
npm install
```

- `cd my_dcard` — Moves your terminal into the new project folder.
- `npm install` — Downloads all the basic libraries (React, TypeScript, etc.) that the project template needs. These get stored in a folder called `node_modules` (you never need to touch this folder).

---

## Step 2: Understanding What Vite Created for You

After running the commands above, you'll have a folder structure like this:

```
my_dcard/
├── node_modules/        ← Downloaded libraries (DON'T touch this)
├── public/              ← Static files (like favicon images)
├── src/                 ← YOUR CODE LIVES HERE
│   ├── assets/          ← Images, etc.
│   ├── App.tsx          ← The main "container" component
│   ├── main.tsx         ← The very first file that runs
│   └── index.css        ← Your global CSS styles
├── index.html           ← The single HTML page (yes, just one!)
├── package.json         ← A "recipe card" listing all your dependencies
├── vite.config.ts       ← Configuration for the Vite build tool
└── tsconfig.json        ← Configuration for TypeScript
```

### Wait, only ONE HTML file?

Yes! In React, you only have **one** HTML file (`index.html`). React takes control of a single `<div id="root">` inside that HTML file and dynamically builds the entire page using JavaScript. This is called a **Single Page Application (SPA)**.

Here's what our `index.html` looks like:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/my_dcard.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- We load Google Fonts here, just like you would in any normal HTML page -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet">
  
  <title>Lead AI/ML Engineer | Digital Business Card</title>
</head>
<body class="font-inter antialiased">

  <!-- THIS is the single div that React takes over and fills with content -->
  <div id="root"></div>
  
  <!-- This loads the JavaScript that starts the whole app -->
  <script type="module" src="/src/main.tsx"></script>
  
</body>
</html>
```

**Things you already know here:** `<head>`, `<body>`, `<link>`, `<script>` — it's standard HTML! The only new thing is that instead of writing your page content directly in the `<body>`, React will inject it into `<div id="root">` using JavaScript.

---

## Step 3: Installing Extra Packages We Need

Our card uses special animation and styling libraries. Run this command in your terminal (make sure you're still inside the `my_dcard` folder):

```bash
npm install framer-motion tailwindcss @tailwindcss/vite lucide-react react-icons qrcode.react
```

**What did we just install?**

| Package | What It Does |
|---|---|
| `framer-motion` | The animation engine. Gives us `<motion.div>` elements that can smoothly animate properties like rotation, scale, opacity. |
| `tailwindcss` | Lets us style elements using class names like `bg-blue-500` instead of writing CSS rules. |
| `@tailwindcss/vite` | A plugin that connects Tailwind to our Vite build tool. |
| `lucide-react` | Provides beautiful SVG icons like ☀️ Sun, 🌙 Moon, ⬇️ Download as React components. |
| `react-icons` | Another icon library, specifically for brand icons like LinkedIn, GitHub, etc. |
| `qrcode.react` | Generates QR code images automatically from a URL. |

---

## Step 4: Setting Up Tailwind CSS + Custom Fonts

### 4a. Configure Vite to use Tailwind

Open `vite.config.ts` and make it look like this:

```typescript
import { defineConfig } from 'vite'          // Vite's built-in config helper
import react from '@vitejs/plugin-react'        // Plugin that enables React support
import tailwindcss from '@tailwindcss/vite'     // Plugin that enables Tailwind CSS

// This function tells Vite: "Use these plugins when building my project"
export default defineConfig({
  plugins: [
    react(),          // Enable React
    tailwindcss(),    // Enable Tailwind CSS
  ],
})
```

### 4b. Set up the CSS file

Open `src/index.css` and **replace everything** with:

```css
/* This single line imports the entire Tailwind CSS framework */
@import "tailwindcss";

/* @theme lets us define custom design tokens (like CSS variables) */
@theme {
  --color-glass: rgba(255, 255, 255, 0.1);       /* Semi-transparent white for glass effect */
  --color-glass-border: rgba(255, 255, 255, 0.2); /* Slightly more visible white for borders */
  --font-inter: 'Inter', sans-serif;               /* Our body text font */
  --font-outfit: 'Outfit', sans-serif;             /* Our heading font */
}

/* @layer utilities lets us create custom CSS classes that work just like Tailwind classes */
@layer utilities {
  /* These three classes are ESSENTIAL for the 3D flip effect: */
  
  .preserve-3d {
    transform-style: preserve-3d;
    /* 
      In normal CSS, if you rotate a parent <div>, its children are flat.
      This property tells the browser: "Hey, my children exist in real 3D space!"
      Without this, the flip animation would look flat and weird.
    */
  }

  .backface-hidden {
    backface-visibility: hidden;
    /* 
      Imagine a playing card. When you flip it face-down, you can't see the front anymore.
      This CSS property does exactly that — it hides the "back" of an element.
      We use this so that the front face disappears when the card is flipped to show the back.
    */
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
    /* 
      This pre-rotates an element 180 degrees around the vertical (Y) axis.
      We apply this to the BACK face of the card, so it starts "facing away" from us.
      When the card flips 180 degrees, the back face comes into view!
    */
  }
}
```

**If you know CSS, this should feel familiar!** The only new things are `@import "tailwindcss"` (which loads Tailwind) and `@theme` (which is Tailwind v4's way of defining design tokens).

---

## Step 5: Understanding `main.tsx` — The Starting Point

This is the **very first JavaScript file** that runs when someone opens your website. Think of it as the ignition key that starts the car.

```tsx
import { StrictMode } from 'react'             // A React wrapper that helps catch bugs during development
import { createRoot } from 'react-dom/client'   // The function that connects React to the HTML page
import './index.css'                             // Loads our CSS file (including Tailwind)
import App from './App.tsx'                      // Loads our App component (we'll look at this next)

// Find the <div id="root"> in index.html and fill it with our App component
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Line by line:**
1. `import` — This is how you load code from other files or libraries. It's like `<link>` or `<script src="">` in HTML, but for JavaScript modules.
2. `createRoot(document.getElementById('root')!)` — This finds the `<div id="root">` in your HTML file. The `!` at the end is TypeScript saying "I promise this element exists, don't worry."
3. `.render(<StrictMode><App /></StrictMode>)` — This tells React: "Take the `App` component and display it inside that div."

**What is `<App />`?** That's JSX! Let's talk about JSX now.

### What is JSX?

JSX = **J**avaScript + **X**ML (HTML-like syntax).

In normal web development, you have separate files:
- `index.html` for structure
- `style.css` for styling
- `script.js` for behavior

In React, you combine HTML structure and JavaScript logic **in the same file** using JSX:

```tsx
// THIS IS JSX — It looks like HTML but it's INSIDE a JavaScript file!
function Greeting() {
  const name = "Supreme";          // This is JavaScript
  return <h1>Hello, {name}!</h1>;  // This is JSX (HTML + JS mixed together)
}
```

**Key JSX differences from HTML:**
| HTML | JSX | Why? |
|---|---|---|
| `class="big"` | `className="big"` | `class` is a reserved word in JavaScript |
| `<img>` | `<img />` | All tags MUST be closed in JSX |
| `style="color: red"` | `style={{ color: 'red' }}` | Styles are JavaScript objects, not strings |
| `onclick="doThing()"` | `onClick={doThing}` | Event handlers use camelCase and pass function references |
| `<!-- comment -->` | `{/* comment */}` | Comments use JS syntax wrapped in curly braces |

**The curly braces `{ }`:** Whenever you want to use JavaScript inside your HTML-like JSX, you wrap it in curly braces. For example, `{name}` outputs the value of the `name` variable.

---

## Step 6: Understanding `App.tsx` — The Container

This is the **main component** of the application. It's very simple because all the interesting stuff happens inside `BusinessCard.tsx`:

```tsx
import BusinessCard from './BusinessCard';   // Load our custom BusinessCard component

// Define a component called "App"
function App() {
  return (
    <BusinessCard />    // Display the BusinessCard component
  );
}

export default App;   // Make this component available for other files to import
```

**What are `import` and `export`?**
- `export default App` — Makes the `App` function available for **other** files to use.
- `import BusinessCard from './BusinessCard'` — Loads the `BusinessCard` component from the file `./BusinessCard.tsx`. The `./` means "in the same folder."

Think of it like HTML includes: you're saying "insert the BusinessCard here."

---

## Step 7: Building `BusinessCard.tsx` — The Star of the Show

This is the main file where ALL the magic happens. Let's build it section by section.

### Part A: The Imports (Loading Our Tools)

At the top of the file, we load everything we need:

```tsx
import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Moon, Sun, Download, Sparkles, RefreshCw } from 'lucide-react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import CardImage from './assets/D_Card.jpeg';
```

**What each import does:**

| Import | What It Is |
|---|---|
| `useState` | A React function that lets your component "remember" data (like whether dark mode is on). |
| `type { MouseEvent }` | A TypeScript type definition that describes mouse events. The `type` keyword means we only need it for type-checking, not for runtime code. |
| `motion` | A special version of HTML elements (`motion.div`, `motion.button`) that can be animated. |
| `useMotionValue` | Creates a number that Framer Motion tracks for animations. |
| `useTransform` | Converts one number range into another (e.g., mouse position → rotation degrees). |
| `useSpring` | Adds smooth, bouncy physics to a number so it doesn't jump instantly. |
| `QRCodeSVG` | A component that generates a QR code image from a URL string. |
| `Moon, Sun, Download...` | Ready-made SVG icon components. You use them like `<Sun />` or `<Moon />`. |
| `FaLinkedin, FaGithub...` | Brand icons for social media platforms. |
| `CardImage` | Your profile photo. In React, you import images like this so Vite can optimize them. |

---

### Part B: The Component Shell

Every React component is just a **function that returns JSX** (HTML-like code):

```tsx
const BusinessCard: React.FC = () => {
    // All your JavaScript logic goes here (state, functions, etc.)
    
    return (
        // All your HTML-like JSX goes here (what the user sees)
        <div>Hello World</div>
    );
};

export default BusinessCard;
```

- `const BusinessCard: React.FC` — We're creating a constant called `BusinessCard`. The `: React.FC` part is TypeScript saying "this is a React Functional Component."
- `() => { ... }` — This is an **arrow function**, a shorter way of writing `function() { ... }`.
- `return (...)` — Whatever JSX is inside the `return()` is what gets displayed on the screen.
- `export default BusinessCard` — Makes this component importable by other files (like `App.tsx`).

---

### Part C: State — Remembering Things (Dark Mode & Card Flip)

In regular HTML/JS, you might use a global variable to track whether dark mode is on:
```javascript
// Old school approach
let isDarkMode = true;
```

In React, you use **`useState`** instead. Why? Because when a `useState` value changes, React **automatically re-renders** (redraws) the component to reflect the new value. A regular variable would change but the screen wouldn't update.

```tsx
const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
const [isFlipped, setIsFlipped] = useState<boolean>(false);
```

**Breaking this down:**
- `useState<boolean>(true)` — Create a piece of state that starts as `true` and can only be `true` or `false`.
- `[isDarkMode, setIsDarkMode]` — This gives you TWO things:
  1. `isDarkMode` — The **current value** (starts as `true`).
  2. `setIsDarkMode` — A **function to change** that value.
- You **never** write `isDarkMode = false` directly. You always call `setIsDarkMode(false)`. This is how React knows to re-draw the screen.

**How the toggle works:**
```tsx
const toggleFlip = () => setIsFlipped(!isFlipped);
// The "!" means "opposite". If isFlipped is false, !isFlipped is true, and vice versa.
```

**How we use it in JSX:**
```tsx
// The ternary operator: condition ? valueIfTrue : valueIfFalse
<div className={isDarkMode ? 'bg-sky-950' : 'bg-rose-50'}>
```
This is like writing: "If dark mode is on, use the class `bg-sky-950` (dark sky blue). Otherwise, use `bg-rose-50` (light rose)."

**Template Literals (the backtick strings):**
```tsx
className={`some-fixed-class ${isDarkMode ? 'dark-class' : 'light-class'}`}
```
The backticks `` ` `` let you embed JavaScript expressions inside strings using `${ }`. This is how we dynamically switch CSS classes.

---

### Part D: 3D Tilt Effect — Making the Card Follow Your Mouse

This is the most complex part, but the concept is simple: **track where the mouse is → convert that position into rotation angles → apply those angles to the card.**

```tsx
// STEP 1: Create two "trackable numbers" for X and Y mouse position
const x = useMotionValue(0);
const y = useMotionValue(0);
```
`useMotionValue(0)` creates a special number starting at `0`. Unlike `useState`, changing a motion value does NOT re-render the entire component — it directly updates the CSS, making it much faster and smoother.

```tsx
// STEP 2: Add spring physics so the movement is smooth, not jerky
const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
```
`useSpring` wraps our tracking numbers in "spring physics." Instead of the card snapping instantly to the cursor position, it eases there smoothly with a slight bounce.
- `stiffness: 150` — How quickly the spring pulls towards the target (higher = faster snap).
- `damping: 15` — How quickly the bouncing settles down (higher = less bouncing).

```tsx
// STEP 3: Convert mouse position percentages to rotation angles
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
```
`useTransform` is a **mapper**. Think of it as a math formula:
- When the mouse Y position is `-0.5` (top of the card), rotate X axis to `15deg` (tilts towards you).
- When the mouse Y position is `0.5` (bottom of the card), rotate X axis to `-15deg` (tilts away).
- Everything in between is smoothly interpolated.

**Visual diagram:**
```
    Mouse at top (-0.5)  →  Card tilts towards you (15deg)
    Mouse at center (0)  →  Card is flat (0deg)
    Mouse at bottom (0.5) → Card tilts away (-15deg)
```

These `rotateX` and `rotateY` values are then applied directly to the card's `style`:
```tsx
<motion.div style={{ rotateX, rotateY, perspective: 1200 }}>
```
- `perspective: 1200` — This tells the browser how "deep" the 3D effect looks. A smaller number = more dramatic 3D. A larger number = subtler 3D.

---

### Part E: Mouse Movement Handler — Calculating Where the Cursor Is

When the user moves their mouse over the card, we need to figure out *where* on the card their cursor is, as a percentage from -0.5 to 0.5:

```tsx
const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    // Get the physical boundaries of the card on screen
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the card's top-left corner
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Convert to a percentage from -0.5 to 0.5
    // If mouse is at left edge: 0/width - 0.5 = -0.5
    // If mouse is at center: (width/2)/width - 0.5 = 0
    // If mouse is at right edge: width/width - 0.5 = 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    // Update the tracking numbers (this triggers the spring animation!)
    x.set(xPct);
    y.set(yPct);
};
```

**What is `event`?**

When a user interacts with a web page (click, hover, scroll, etc.), the browser creates an "event" object containing information about what happened. Here, `event` contains:
- `event.clientX` — The mouse's X position on the entire screen.
- `event.clientY` — The mouse's Y position on the entire screen.
- `event.currentTarget` — The HTML element the event listener is attached to (our card div).

**What is `getBoundingClientRect()`?**

This is a built-in browser function that returns the position and size of an HTML element. It gives you:
- `rect.left` — How many pixels from the left edge of the screen the element starts.
- `rect.top` — How many pixels from the top.
- `rect.width`, `rect.height` — The element's dimensions.

**The reset function:**
```tsx
const resetMouse = () => { x.set(0); y.set(0); };
```
When the mouse **leaves** the card (`onMouseLeave`), we reset both tracking numbers to `0`, which smoothly animates the card back to a flat, centered position.

---

### Part F: VCard Download — Generating a Contact File

This function creates a downloadable `.vcf` (Virtual Contact File) — the same format your phone uses for contacts.

```tsx
const downloadVCard = (e: React.MouseEvent) => {
    // CRITICAL: Stop this click from "bubbling up" to the parent div.
    // Without this line, clicking the download button would ALSO flip the card!
    e.stopPropagation();
    
    // Create the raw text content of a VCard file
    // Each line follows the VCard 3.0 standard format:
    // PROPERTY:VALUE
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Supreme Oghenewoakpo
ORG:Creative Dev
TEL;TYPE=CELL:+13433426280
EMAIL:supremeoghenewoakpo@gmail.com
URL:https://g8supremeo.github.io
END:VCARD`;
    
    // Turn the text string into a binary file in memory
    const blob = new Blob([vcard], { type: 'text/vcard' });
    
    // Create a temporary download URL pointing to that in-memory file
    const url = window.URL.createObjectURL(blob);
    
    // Create an invisible <a> link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Supreme_Ogh.vcf');  // Set the filename
    
    // Add the hidden link to the page, force-click it, then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```

**What is `e.stopPropagation()`?**

In HTML, events "bubble up." If you click a button that's inside a div, the div **also** receives the click event. Since our entire card has an `onClick={toggleFlip}` handler, clicking the download button would flip the card AND download the file. `e.stopPropagation()` says: "Stop! Don't tell the parent elements about this click."

**What is a `Blob`?**

A `Blob` (Binary Large Object) is a way to create a file in memory using JavaScript, without needing a server. We create a blob containing our VCard text, generate a temporary URL for it, and trigger a download.

---

### Part G: The JSX Layout — Building the Visual Card

Now let's look at how the visual layout is constructed. This is the `return(...)` section.

**The outer wrapper:**
```tsx
<div className={`min-h-screen w-full flex items-center justify-center p-4 
  transition-colors duration-700 font-inter 
  ${isDarkMode ? 'bg-sky-950 text-white' : 'bg-rose-50 text-rose-950'}`}>
```
This is a full-screen container that centers the card. The Tailwind classes:
- `min-h-screen` → CSS: `min-height: 100vh` (full viewport height)
- `w-full` → CSS: `width: 100%`
- `flex items-center justify-center` → CSS: `display: flex; align-items: center; justify-content: center`
- `transition-colors duration-700` → Smoothly transition background color over 700ms when theme changes

**The glowing background orbs (glassmorphism):**
```tsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] 
      rounded-full blur-3xl animate-pulse mix-blend-screen
      ${isDarkMode ? 'bg-rose-600/30' : 'bg-rose-300/40'}`} />
    <div className={`absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw]
      rounded-full blur-3xl mix-blend-screen
      ${isDarkMode ? 'bg-sky-600/20' : 'bg-sky-300/40'}`} />
</div>
```
These are two giant, blurred circles positioned behind the card. They create the ambient, glowing effect. `pointer-events-none` means they don't interfere with clicking.

**The theme toggle button:**
```tsx
<button onClick={() => setIsDarkMode(!isDarkMode)} className="...">
    {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-700" />}
</button>
```
- `onClick={() => setIsDarkMode(!isDarkMode)}` — When clicked, flip the `isDarkMode` boolean.
- `{isDarkMode ? <Sun /> : <Moon />}` — If dark mode is on, show the Sun icon (to switch to light). Otherwise show Moon.

**The 3D tilt container:**
```tsx
<motion.div
    style={{ rotateX, rotateY, perspective: 1200 }}
    onMouseMove={handleMouseMove}
    onMouseLeave={resetMouse}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative w-full max-w-sm h-[520px] cursor-pointer touch-none"
    onClick={toggleFlip}
>
```
- `<motion.div>` — A special Framer Motion div that can be animated.
- `style={{ rotateX, rotateY }}` — Apply our calculated rotation angles.
- `onMouseMove={handleMouseMove}` — Call our function whenever the mouse moves over this element.
- `initial={{ opacity: 0, y: 50 }}` — When the page first loads, the card starts invisible and 50px below its final position.
- `animate={{ opacity: 1, y: 0 }}` — Then it smoothly fades in and slides up to its correct position.
- `onClick={toggleFlip}` — Clicking anywhere on the card flips it.

**The flip container:**
```tsx
<motion.div
    animate={{ rotateY: isFlipped ? 180 : 0 }}
    transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
    className="w-full h-full relative preserve-3d"
>
```
- When `isFlipped` is `true`, rotate this div 180 degrees on the Y axis. When `false`, rotate to 0.
- `type: "spring"` — Use spring physics for the flip animation (it has a slight bounce).
- `preserve-3d` — Our custom CSS class that enables real 3D space for children.

**The front face:**
```tsx
<div className="absolute inset-0 backface-hidden rounded-[2.5rem] border p-6 
  shadow-2xl backdrop-blur-2xl flex flex-col justify-between ...">
```
- `absolute inset-0` — Makes this face fill the entire parent container.
- `backface-hidden` — Hides this face when it's rotated past 90 degrees (when the card is flipped).
- `backdrop-blur-2xl` — Blurs anything behind this element, creating the frosted glass effect.

**The back face:**
```tsx
<div className="absolute inset-0 backface-hidden rotate-y-180 ...">
```
- Same as the front face, BUT it has `rotate-y-180` — it starts rotated 180 degrees (facing away from us).
- When the parent flips 180 degrees, the BACK face comes into view and the FRONT face hides.

**The skill tags loop:**
```tsx
{[
    { name: 'Computer Vision', url: 'https://github.com/g8supremeo' },
    { name: 'CNNs', url: 'https://github.com/g8supremeo' },
    // ...more tags
].map((tag, i) => (
    <motion.a key={tag.name} href={tag.url} target="_blank" ...>
        {tag.name}
    </motion.a>
))}
```
This is the `.map()` function — the React equivalent of a `for` loop. It takes an array of objects and generates a `<motion.a>` element for each one. The `key` prop is required by React to uniquely identify each element in a list.

**The QR Code component:**
```tsx
<QRCodeSVG value="https://g8supremeo.github.io" size={160} level="H" includeMargin={false} />
```
This single line generates an entire QR code! You just pass it a URL and it renders an SVG image. `level="H"` means "high error correction" — the QR code will still scan even if up to 30% of it is damaged.

---

## Step 8: Run It!

Make sure you're in the project folder and run:
```bash
npm run dev
```

This starts a local development server. Open your browser and navigate to:
```
http://localhost:5173
```

You should see your beautiful 3D business card! 🎉

**Hot Module Replacement (HMR):** Every time you save a file, the browser automatically updates without you needing to refresh. This makes development incredibly fast.

---

## Full Project File Structure

Here's the final file structure with descriptions:

```
my_dcard/
├── node_modules/              ← All downloaded libraries (auto-generated, don't edit)
├── public/
│   └── my_dcard.png           ← Favicon (the tiny icon in the browser tab)
├── src/
│   ├── assets/
│   │   └── D_Card.jpeg        ← Your profile photo
│   ├── App.tsx                ← Main container, imports and displays BusinessCard
│   ├── BusinessCard.tsx       ← THE MAIN FILE — all card logic and layout
│   ├── index.css              ← Global styles: Tailwind import + custom 3D utilities
│   ├── main.tsx               ← Entry point: connects React to the HTML page
│   └── vite-env.d.ts          ← TypeScript type definitions for Vite (auto-generated)
├── index.html                 ← The single HTML page, loads fonts and mounts React
├── package.json               ← Lists all dependencies and npm scripts
├── tsconfig.json              ← TypeScript configuration
├── tsconfig.app.json          ← TypeScript config for app source files
├── tsconfig.node.json         ← TypeScript config for Node.js files (like vite.config)
└── vite.config.ts             ← Vite build tool configuration (React + Tailwind plugins)
```

---

## Complete Function Reference

Here is a master checklist of **every single function and hook** used in `BusinessCard.tsx`, what it does, and where it's explained in this guide:

| # | Function / Hook | What It Does | Type | Explained In |
|---|---|---|---|---|
| 1 | `useState<boolean>(true)` | Creates a "remembered" variable that triggers a re-render when changed. We use it twice: once for `isDarkMode` and once for `isFlipped`. | React Hook | [Part C](#part-c-state--remembering-things-dark-mode--card-flip) |
| 2 | `useMotionValue(0)` | Creates a trackable number for animations. Unlike `useState`, changing it does NOT cause a full component re-render — it directly updates CSS for smooth performance. Used for mouse X and Y tracking. | Framer Motion Hook | [Part D](#part-d-3d-tilt-effect--making-the-card-follow-your-mouse) |
| 3 | `useSpring(value, config)` | Wraps a `useMotionValue` in spring physics. Instead of jumping instantly to a new value, it eases there with bounce and momentum. Config has `stiffness` (snap speed) and `damping` (bounce control). | Framer Motion Hook | [Part D](#part-d-3d-tilt-effect--making-the-card-follow-your-mouse) |
| 4 | `useTransform(input, inputRange, outputRange)` | Maps one range of numbers to another. We use it to convert mouse position (-0.5 to 0.5) into rotation angles (-15deg to 15deg). | Framer Motion Hook | [Part D](#part-d-3d-tilt-effect--making-the-card-follow-your-mouse) |
| 5 | `handleMouseMove(event)` | Calculates where the cursor is on the card (as a -0.5 to 0.5 percentage) using `getBoundingClientRect()`, then updates the motion values. Fires every time the mouse moves over the card. | Custom Function | [Part E](#part-e-mouse-movement-handler--calculating-where-the-cursor-is) |
| 6 | `resetMouse()` | Sets both X and Y motion values back to 0 when the mouse leaves the card, smoothly animating the card back to a flat position. | Custom Function | [Part E](#part-e-mouse-movement-handler--calculating-where-the-cursor-is) |
| 7 | `downloadVCard(e)` | Generates a `.vcf` contact file in memory using a `Blob`, creates a temporary download URL, programmatically clicks a hidden `<a>` link to trigger the download, then cleans up. Uses `e.stopPropagation()` to prevent the card from flipping. | Custom Function | [Part F](#part-f-vcard-download--generating-a-contact-file) |
| 8 | `toggleFlip()` | Flips the `isFlipped` state from `true` to `false` or vice versa using the `!` (NOT) operator. This triggers the flip animation. | Custom Function | [Part C](#part-c-state--remembering-things-dark-mode--card-flip) |
| 9 | `setIsDarkMode(!isDarkMode)` | Inline toggle used in the theme button's `onClick`. Flips the dark mode boolean, causing the entire component to re-render with the new theme colors. | State Setter (inline) | [Part G](#part-g-the-jsx-layout--building-the-visual-card) |
| 10 | `e.stopPropagation()` | A built-in browser method that prevents a click event from "bubbling up" to parent elements. Used on the download button and social links so clicking them doesn't also flip the card. | Browser API | [Part F](#part-f-vcard-download--generating-a-contact-file) |
| 11 | `getBoundingClientRect()` | A built-in browser method that returns the size and position of an HTML element on screen. We use it to calculate where the mouse is relative to the card's edges. | Browser API | [Part E](#part-e-mouse-movement-handler--calculating-where-the-cursor-is) |
| 12 | `.map((item, index) => ...)` | A built-in JavaScript array method that loops through every item and returns a new element for each one. We use it to generate skill tags and social icons from arrays of data. | JavaScript Array Method | [Part G](#part-g-the-jsx-layout--building-the-visual-card) |
| 13 | `document.createElement('a')` | A built-in browser method that creates a new HTML element in memory. Used in the VCard download function to create a hidden download link. | Browser API | [Part F](#part-f-vcard-download--generating-a-contact-file) |
| 14 | `new Blob([data], { type })` | Creates a file-like object in memory from raw data. We use it to turn a VCard text string into a downloadable file without needing a server. | Browser API | [Part F](#part-f-vcard-download--generating-a-contact-file) |
| 15 | `URL.createObjectURL(blob)` | Creates a temporary URL that points to an in-memory Blob, allowing us to use it as a download link's `href`. | Browser API | [Part F](#part-f-vcard-download--generating-a-contact-file) |
| 16 | `createRoot(element).render()` | The React function that takes control of a DOM element (like `<div id="root">`) and renders a React component tree inside it. Used in `main.tsx`. | React DOM API | [Step 5](#step-5-understanding-maintsx--the-starting-point) |

---

## How to Use OOP in This Project

### What is OOP?

**OOP** stands for **Object-Oriented Programming**. If you only know HTML and CSS, here's the idea in plain English:

Imagine you're building furniture. Instead of building each chair from scratch every time, you create a **blueprint** (a "class") that describes what a chair looks like and what it can do. Then you **manufacture** ("instantiate") as many chairs as you want from that single blueprint.

In code, a **class** is a blueprint, and an **object** is a specific instance built from that blueprint.

```typescript
// A BLUEPRINT (class) for a contact
class Contact {
    name: string;
    email: string;
    phone: string;

    constructor(name: string, email: string, phone: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    greet(): string {
        return `Hello, I'm ${this.name}!`;
    }
}

// MANUFACTURING (creating instances from the blueprint)
const supreme = new Contact('Supreme', 'supreme@email.com', '+1234567890');
console.log(supreme.greet()); // "Hello, I'm Supreme!"
```

### But Wait — React Doesn't Really Use Traditional OOP!

Here's an important thing to understand: Modern React (React 16.8+) uses **Functional Components** and **Hooks** instead of classes. The code in our project is written in this modern functional style.

Older React code (pre-2019) used **Class Components** like this:

```tsx
// OLD WAY — Class Component (OOP style)
class BusinessCard extends React.Component {
    state = { isDarkMode: true, isFlipped: false };

    toggleFlip = () => {
        this.setState({ isFlipped: !this.state.isFlipped });
    };

    render() {
        return (
            <div onClick={this.toggleFlip}>
                {this.state.isDarkMode ? 'Dark' : 'Light'}
            </div>
        );
    }
}
```

The **modern way** (what we use) replaces that with functions and hooks:
```tsx
// MODERN WAY — Functional Component with Hooks
const BusinessCard: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    return (
        <div onClick={toggleFlip}>
            {isDarkMode ? 'Dark' : 'Light'}
        </div>
    );
};
```

**Why did React move away from classes?**
- Hooks are simpler and require less code
- No confusing `this` keyword
- Easier to share logic between components
- Better performance in most cases

### So Where CAN You Use OOP in This Project?

Even though React components are functions, **OOP is still very useful** for organizing data and business logic. Here are concrete examples of how you could enhance this project with OOP:

#### Example 1: A `ContactInfo` Class to Manage Personal Data

Instead of hardcoding strings directly in the JSX, you can create a class that represents a contact:

```typescript
// src/models/ContactInfo.ts

class ContactInfo {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    portfolioUrl: string;
    linkedinUrl: string;
    githubUrl: string;

    constructor(
        firstName: string,
        lastName: string,
        title: string,
        email: string,
        phone: string,
        portfolioUrl: string,
        linkedinUrl: string,
        githubUrl: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.email = email;
        this.phone = phone;
        this.portfolioUrl = portfolioUrl;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
    }

    // METHOD: Get the full name
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    // METHOD: Generate the VCard text
    toVCard(): string {
        return [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${this.fullName}`,
            `TEL;TYPE=CELL:${this.phone}`,
            `EMAIL:${this.email}`,
            `URL:${this.portfolioUrl}`,
            'END:VCARD'
        ].join('\n');
    }

    // METHOD: Get all social links as an array
    getSocialLinks() {
        return [
            { name: 'LinkedIn', url: this.linkedinUrl, icon: 'FaLinkedin' },
            { name: 'GitHub', url: this.githubUrl, icon: 'FaGithub' },
            { name: 'Portfolio', url: this.portfolioUrl, icon: 'FaGlobe' },
        ];
    }
}

export default ContactInfo;
```

Then use it in your component:
```tsx
// In BusinessCard.tsx
import ContactInfo from './models/ContactInfo';

const me = new ContactInfo(
    'Supreme', 'Oghenewoakpo', 'AI/ML Engineer',
    'supremeoghenewoakpo@gmail.com', '+13433426280',
    'https://g8supremeo.github.io',
    'https://linkedin.com/in/supreme-oghenewoakpo-195ab134',
    'https://github.com/g8supremeo'
);

// Now in your JSX:
<h1>{me.fullName}</h1>
<p>{me.title}</p>
```

**Benefits:** All personal data lives in one place. If you want to change your email, you change it in ONE spot instead of hunting through JSX.

---

#### Example 2: A `Theme` Class with Inheritance

You can use **inheritance** (one of OOP's pillars) to define theme variations:

```typescript
// src/models/Theme.ts

class Theme {
    name: string;
    bgColor: string;
    textColor: string;
    cardBg: string;
    accentGradient: string;

    constructor(name: string, bg: string, text: string, card: string, accent: string) {
        this.name = name;
        this.bgColor = bg;
        this.textColor = text;
        this.cardBg = card;
        this.accentGradient = accent;
    }
}

// INHERITANCE: DarkTheme "extends" (is a special version of) Theme
class DarkTheme extends Theme {
    constructor() {
        super(
            'Dark Sky',
            'bg-sky-950',
            'text-white',
            'bg-sky-900/60',
            'from-sky-400 to-rose-500'
        );
    }
}

class LightTheme extends Theme {
    constructor() {
        super(
            'Light Rose',
            'bg-rose-50',
            'text-rose-950',
            'bg-rose-100/60',
            'from-rose-400 to-sky-500'
        );
    }
}

export { DarkTheme, LightTheme };
```

Then in your component:
```tsx
const darkTheme = new DarkTheme();
const lightTheme = new LightTheme();
const currentTheme = isDarkMode ? darkTheme : lightTheme;

// In JSX:
<div className={`${currentTheme.bgColor} ${currentTheme.textColor}`}>
```

**Benefits:** Adding a new theme (e.g., a "Sunset" theme) is just creating a new class that extends `Theme`. No hunting through JSX to change colors.

---

#### Example 3: A `Skill` Class for the Tags

```typescript
// src/models/Skill.ts

class Skill {
    name: string;
    projectUrl: string;
    category: 'ai' | 'engineering' | 'data';

    constructor(name: string, url: string, category: 'ai' | 'engineering' | 'data') {
        this.name = name;
        this.projectUrl = url;
        this.category = category;
    }

    // Returns a CSS class based on category
    getCategoryColor(isDark: boolean): string {
        const colors = {
            ai: isDark ? 'border-sky-500/50 text-sky-300' : 'border-sky-500/30 text-sky-600',
            engineering: isDark ? 'border-rose-500/50 text-rose-300' : 'border-rose-500/30 text-rose-600',
            data: isDark ? 'border-purple-500/50 text-purple-300' : 'border-purple-500/30 text-purple-600',
        };
        return colors[this.category];
    }
}

export default Skill;
```

---

### The Four Pillars of OOP (and How They Apply Here)

For reference, here are the four core OOP concepts and how they map to this project:

| OOP Principle | What It Means | Example in This Project |
|---|---|---|
| **Encapsulation** | Bundling data and the functions that operate on it together inside a class. | The `ContactInfo` class bundles name, email, phone AND the `toVCard()` method together. You don't need to know HOW the VCard is generated — you just call `me.toVCard()`. |
| **Abstraction** | Hiding complex implementation behind a simple interface. | `me.toVCard()` hides all the VCard formatting logic. The component just calls one method and gets a string back. |
| **Inheritance** | Creating new classes based on existing ones, reusing code. | `DarkTheme extends Theme` — the dark theme reuses the base `Theme` structure but fills in specific sky blue values. |
| **Polymorphism** | Different classes responding to the same method call in different ways. | Both `DarkTheme` and `LightTheme` have the same properties (`bgColor`, `textColor`), but return different values. The component doesn't need to know which theme it's using — it just reads `currentTheme.bgColor`. |

### When Should You Use OOP vs Functions?

| Use OOP (Classes) When... | Use Functions When... |
|---|---|
| You have data with related behaviors (e.g., Contact + toVCard) | You have simple, standalone logic (e.g., `toggleFlip`) |
| You need multiple variations of the same thing (e.g., themes) | The logic is used once and doesn't need a blueprint |
| You want to enforce structure across your codebase | You're writing React components (hooks work better than classes in modern React) |
| You're modeling real-world entities (Contact, Skill, Theme) | You're handling events or simple state changes |

**Bottom line:** Use OOP for your **data models and business logic**, and use functions + hooks for your **React components and UI behavior**. They complement each other perfectly!

---

<div align="center">
  <p><em>You made it! 🎓 You now understand every single piece of this project.</em></p>
  <p>Crafted with 💖 and ☕ by Supreme Oghenewoakpo.</p>
</div>
