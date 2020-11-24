import { TOOL_TYPES } from './constants';

/**
 * Class Controller
 * Entry point for the application
 * Responsible for connection between model and view layer
 */
export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isActive = false;

        //Bind event listeners
        this.view.bindWindowResize();
        this.view.bindMouseDown(this.toggleActiveAndUpdateStack);
        this.view.bindMouseUp(this.toggleActive);
        this.view.bindMouseMove(this.handleMouseMove);
        this.view.bindColorChange(this.updateColor);
        this.view.bindWidthChange(this.updateWidth);
        this.view.bindHighlightWidthChange(this.updateWidth)
        this.view.bindToolChange(this.updateTool);
    }

    toggleActive = (event, callback) => {
        this.isActive = !this.isActive;
        if (callback) callback(event);
    }

    toggleActiveAndUpdateStack = (event, callback) => {
        this.toggleActive();
        if (this.model.undoStack.length > this.model.undoLimit) this.model.removeItem();

        //If last action and current action are highlight, undo the last operation
        const prevAction = this.model.undoStack[this.model.undoStack.length - 1];
        this.model.addNewItem({ image: this.view.savedImage, action: this.model.tool });

        if (prevAction && prevAction.action === TOOL_TYPES.HIGHLIGHTER && this.model.tool === TOOL_TYPES.HIGHLIGHTER) {
            this.undoDraw(event, this.view.undoDrawing);
        }
        if (callback) callback(event, this.model.tool);
    }

    handleMouseMove = (event, callback) => {
        if (event.target.nodeName !== "CANVAS") {
            this.isActive = false;
        }
        if (!this.isActive) return false;
        if (callback) callback(event, this.model.tool, this.model.width);
    };

    updateColor = (event, callback) => {
        const color = event.target.dataset.color || event.target.parentElement.dataset.color;
        this.model.updateColor(color);
        if (callback) callback(this.model.color)
    };

    updateTool = (event, callback) => {
        const action = event.target.dataset.tooltype || event.target.parentElement.dataset.tooltype;
        this.model.updateTool(action);
        if (callback) callback(this.model.tool)
    };

    undoDraw = (event, callback) => {
        if (this.model.undoStack.length > 0) {
            this.model.removeLastItem(); //pop
            if (callback) callback(this.model.undoStack)
        } else {
            alert("Sorry, No more undo actions available");
        }
    };

    updateWidth = (event, callback) => {
        //Either linewith or highligher width has to be changed
        const width =
            event.target.dataset.linewidth || event.target.parentElement.dataset.linewidth ||
            event.target.dataset.brushsize || event.target.parentElement.dataset.brushsize;

        this.model.updateWidth(+width);
        if (callback) callback(this.model.width)
    };
}