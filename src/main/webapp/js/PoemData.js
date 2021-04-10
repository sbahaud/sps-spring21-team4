import { PoemUtils } from './PoemUtils.js';
/**
 * Gets a poem and its annotations
 */
class PoemData {
  constructor() {
    this.poemId = null;
    this.poemData = null;
    this.annotationData = null;
  }

  /**
   * Get the poem data
   * @returns Poem data as a JSON object
   */
  async getPoemData() {
    try {
      const response = await fetch(`/poem?id=${this.poemId}`);
      const poemDataJson = await response.json();
      this.poemData = poemDataJson[0];
      return poemDataJson;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get all the poem annotations
   * @returns Annotation data as a JSON object
   */
  async getPoemAnnotations() {
    try {
      const response = await fetch(`/annotations?poemId=${this.poemId}`);
      const annotationsDataJson = await response.json();
      this.annotationData = annotationsDataJson;
      return annotationsDataJson;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Add annotations to a line
   * @param {object} line - A poem line
   */
  addLineAnnotation(line, lineElement) {
    lineElement.classList.add('annotated');
    lineElement.addEventListener('click', () => {
      let addAnnotationForm = document.querySelector('.add-annotation');
      let annotationsContent =
        document.querySelector('.annotations-content');
      let lineAnnotations = this.annotationData.filter(annotation => annotation.lineId == line.lineId);
      let allAnnotationsForLine = [];
      lineAnnotations.forEach(annotation => {
        allAnnotationsForLine.push(annotation.annotationText);
      });
      // Unhide the annotations content container while hiding the new
      // annotations form
      addAnnotationForm.classList.add('hidden');
      annotationsContent.classList.remove('hidden');
      annotationsContent.innerHTML = allAnnotationsForLine.join('\n').replace(/\n/g, '<br>');
    });
  }

  /**
   * Reveal the new annotation form
   * @param {object} line - A poem line
   */
  showAnnotationForm(line) {
    let addAnnotationForm = document.querySelector('.add-annotation');
    let annotationsContent = document.querySelector('.annotations-content');
    // show the annotations form while hiding the annotations content
    // container
    addAnnotationForm.classList.remove('hidden');
    annotationsContent.classList.add('hidden');
    Object.assign(addAnnotationForm, {
      'data-lineid': line.lineId,
      'data-poemid': this.poemData.id
    });
  }

  /**
   * Add the poem data to the page
   */
  addPoemToPage() {
    // Get the poem content container
    let poemContent = document.querySelector('.poem-content');
    poemContent.setAttribute('data-poemid', this.poemData.id);

    // Add the poem title and poet name to the page
    let poemTitle = PoemUtils.createElement('h3', this.poemData.poemTitle, { class: 'poem-title' });
    let poetName = PoemUtils.createElement(
      'p', `by ${this.poemData.poetName}`,
      { class: 'my-3 poet-name text-small text-bold text-uppercase' });

    poemContent.appendChild(poemTitle);
    poemContent.appendChild(poetName);

    // Add poem lines and attach a click event listener to the lines
    const poemLines = JSON.parse(this.poemData.poemLines);
    const allLineIds = this.annotationData.map(annotation => parseInt(annotation.lineId));
    for (let line of poemLines) {
      let lineElement = PoemUtils.createElement('p', line.lineText, {
        class: 'poem-line',
        'data-lineid': line.lineId
      });
      // If the line has an annotation, show the annotation once the line is
      // clicked
      if (allLineIds.includes(line.lineId)) {
        this.addLineAnnotation(line, lineElement);
      }
      // Otherwise, show the "add annotation" section
      else {
        lineElement.addEventListener('click', () => { this.showAnnotationForm(line) });
      }
      poemContent.appendChild(lineElement);
    }
    // Poem source and date added
    let poemSource = PoemUtils.createElement(
      'div', `Source: ${this.poemData.source}`,
      { class: 'text-small text-italic text-gray mt-2' });
    let poemDateAdded = PoemUtils.createElement(
      'span', `Added on ${new Date(this.poemData.dateAdded).toDateString()}`,
      { class: 'text-small text-italic text-gray' });
    poemContent.appendChild(poemSource);
    poemContent.appendChild(poemDateAdded);
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    this.poemId = params.get('id');
    if (this.poemId) {
      await this.getPoemData();
      await this.getPoemAnnotations();
      this.addPoemToPage();
    }
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new PoemData().init();
});
