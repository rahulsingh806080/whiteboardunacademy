/**
 * Gets the current position of the cursor with respect to the canvas
 * @param {domElement} canvas domElement
 * @param {Event} e event instance
 * @return {Object} x and y position
 */
export function getMouseCoordsOnCanvas(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
}
