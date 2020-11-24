import { Controller } from './controller'
import { Model } from './model'
import { View } from './view'
import { TOOL_TYPES } from './constants'

//Wrap application inside onLoad to ensure dom is available
window.addEventListener('load', () => {
    // Start app
    new Controller(new Model(), new View())

    // Attach event listeners for active class
    document.querySelectorAll('[data-tooltype]').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('[data-tooltype].active').classList.toggle('active')
            item.classList.toggle('active')

            const currentTool = item.getAttribute('data-tooltype')
            switch (currentTool) {
                case TOOL_TYPES.PEN:
                    document.querySelector('#pen-size').style.display = 'block'
                    document.querySelector('#highlighter-size').style.display = 'none'
                    break
                case TOOL_TYPES.HIGHLIGHTER:
                    document.querySelector('#highlighter-size').style.display = 'block'
                    document.querySelector('#pen-size').style.display = 'none'
                    break
                default:
                    document.querySelector('#highlighter-size').style.display = 'none'
                    document.querySelector('#pen-size').style.display = 'none'
            }
        })
    });

    document.querySelectorAll('[data-linewidth]').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('[data-linewidth].active').classList.toggle('active')
            item.classList.toggle('active')
        })
    });

    document.querySelectorAll('[data-brushsize]').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('[data-brushsize].active').classList.toggle('active')
            item.classList.toggle('active')
        })
    });

    document.querySelectorAll('[data-color]').forEach((item) => {
        item.addEventListener('click', () => {
            document.querySelector('[data-color].active').classList.toggle('active')
            item.classList.toggle('active')
        })
    });
})
