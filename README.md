# Whiteboard

A drawing board application with a canvas element with support to draw and write on it.

[View Demo](https://canvas-whiteboard.netlify.app/ "View Demo")

### Features

#### Tools

- _Pen_ - Permanent strokes with sizes 1,2,3,4,5 pixels
- _Highlighter_ - Stroke with an opacity of 50% and initial width 5px(width can be selected from the sidecontrols). The previous highlight gets removed on drawing a new highlight stroke
- _Eraser_ - Remove drawing by dragging over it

#### Color

- _Color_ - options in the right bar changes the color of pen and highlighter

#### Technologies/Tools

VanillaJS with webpack for bundling and babel for transpilation

#### Steps to run

1. Clone the repository
2. npm i
3. npm run dev - starts a development server

#### Architecture

> The code is separated following MVC architecture to ensure modularity

- _Model_ - Contains core data for the application
- _View_ - Handles the UI and event listeners in the DOM
- _Controller_ - acts as a bridge between model and view
