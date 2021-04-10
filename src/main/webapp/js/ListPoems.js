import { PoemUtils } from './PoemUtils.js';
/**
 * List poems
 */
class ListPoems {
  constructor() {
    this.data = null;
  }

  /**
   * Fetch a list of poems from the server
   * @returns A JSON list of poems
   */
  async getPoemData() {
    const response = await fetch('/poem');
    const responseJson = await response.json();
    this.data = responseJson;
    return responseJson;
  }

  /**
   * Add the list of poems to the page
   * @param {object} poemData A list of poems
   */
  addPoemsToPage(poemData) {
    let poemContent = document.querySelector('.poem-content')
    poemData.forEach(poem => {
      let container = PoemUtils.createElement('div', null, { class: 'container poem' });
      let poemTitle = PoemUtils.createElement('a', poem.poemTitle, {
        'data-id': poem.id,
        href: `/poem.html?id=${poem.id}`,
        class: 'poem-title text-large'
      });
      let poemAuthor = PoemUtils.createElement('p', `by ${poem.poetName}`, { class: 'poem-author text-capitalize text-small' });
      container.appendChild(poemTitle);
      container.appendChild(poemAuthor);
      poemContent.appendChild(container);
    });
  }

  init() {
    this.getPoemData().then(data => {
      this.addPoemsToPage(data);
    });
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new ListPoems().init();
});
