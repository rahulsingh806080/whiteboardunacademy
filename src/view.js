import { getMouseCoordsOnCanvas } from './utils';
import { TOOL_TYPES } from './constants';

/**
 * Class View
 * The view layer is responsible to render elements on the canvas
 * Also attaches event listeners with proper methods to be invoked
 */
export class View {
    constructor() {
        this.canvas = this.getElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.resize();
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    showElement(selector) {
        const elem = this.getElement(selector);
        elem.style.visibility = 'visible';
    }

    resize() {
        const height = document.documentElement.clientHeight;
        const width = document.documentElement.clientWidth;
        this.canvas.height = height - 50;
        this.canvas.width = width - 110;
    }

    handleResize = () => {
        this.resize();
    }

    mouseDown = (event, action) => {
        this.startPos = getMouseCoordsOnCanvas(this.canvas, event);
        this.context.beginPath();
        this.context.moveTo(this.startPos.x, this.startPos.y);
    }

    renderPen(event) {
        this.context.lineCap = 'round';
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.stroke();
    }

    renderEraser() {
        this.context.clearRect(this.currentPos.x, this.currentPos.y, 18, 18);
    }

    renderHighlighter(e, width) {
        //Highighter logic here
        this.context.lineTo(this.currentPos.x, this.currentPos.y);
        this.context.globalCompositeOperation = "multiply";
        this.context.globalAlpha = 0.5;
        this.context.fillRect(e.clientX - 10, e.clientY - 10, 5 * width, 5 * width);
    }

    handleMouseMove = (event, tool, width) => {
        this.currentPos = getMouseCoordsOnCanvas(this.canvas, event);

        switch (tool) {
            case TOOL_TYPES.PEN:
                this.renderPen(event);
                break;
            case TOOL_TYPES.ERASER:
                this.renderEraser(event);
                break;
            default:
                this.renderHighlighter(event, width);
        }
    }

    strokeColor = (color) => {
        this.context.strokeStyle = color;
    }

    fillStyle = (color) => {
        this.context.fillStyle = color;
    }

    width = (width) => {
        this.context.lineWidth = width;
    }

    undoDrawing = (undoStack) => {
        this.context.putImageData(undoStack[undoStack.length - 1].image, 0, 0);
    }

    bindWindowResize() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    bindMouseDown(handler) {
        this.getElement('canvas').addEventListener('mousedown', (event) => {
            this.savedImage = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            handler(event, this.mouseDown);
        });
    }

    bindMouseMove(handler) {
        window.addEventListener('mousemove', (event) => {
            handler(event, this.handleMouseMove);
        })
    }

    bindMouseUp(handler) {
        this.getElement('canvas').addEventListener('mouseup', (event) => {
            handler(event, () => this.context.beginPath());
        });
    }

    bindColorChange(handler) {
        this.getElement('.colors')
            .addEventListener('click', (event) => {
                //Update both stroke and fill color
                handler(event, this.strokeColor);
                handler(event, this.fillStyle);
            });
    }

    bindWidthChange(handler) {
        this.getElement('#pen-size')
            .addEventListener('click', (event) => {
                handler(event, this.width);
            });
    }

    bindHighlightWidthChange(handler) {
        this.getElement('#highlighter-size')
            .addEventListener('click', (event) => {
                handler(event, this.width);
            });
        this.getElement('[data-tooltype=HIGHLIGHTER]')
            .addEventListener('click', (event) => {
                handler(event, this.width);
            });
    }

    bindToolChange(handler) {
        this.getElement('#tool-container')
            .addEventListener('click', (event) => {
                handler(event);
            });
    }
}