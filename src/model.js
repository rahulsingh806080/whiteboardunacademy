import { TOOL_TYPES } from './constants'

/**
 * class Model
 * Model contains all the application data and public methods to modify the data
 * Single source of truth
 */
export class Model {
    constructor() {
        this._color = '#000'
        this._tool = TOOL_TYPES.PEN
        this._width = 2
        this.undoStack = []
        this.undoLimit = 3
    }

    updateColor(color) {
        this._color = color
    }

    get color() {
        return this._color;
    }

    updateTool(tool) {
        this._tool = tool
    }

    get tool() {
        return this._tool;
    }

    updateWidth(width) {
        this._width = width
    }

    get width() {
        return this._width;
    }

    addNewItem(item) {
        this.undoStack.push(item)
    }

    removeItem() {
        this.undoStack.shift()
    }

    removeLastItem() {
        this.undoStack.pop()
    }
}
