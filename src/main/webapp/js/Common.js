
// Common functions used throughout the project

/**
 * Creates an html element with various properties
 * @param {string} tag The HTML tag name
 * @param {string} content The inner html content for the tag
 * @param {object} attributes A key-value pair of attributes for the element
 * @returns {HTMLElement} An html element with the specified properties
 */
export function CreateElement(tag, content, attributes) {
  let element = document.createElement(tag);
  if (content) {
    element.innerHTML = content;
  }
  if (attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  return element;
}
