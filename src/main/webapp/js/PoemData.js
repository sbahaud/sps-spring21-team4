import { CreateElement } from './Common.js';
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
  async GetPoemData() {
    try {
      const response = await fetch(`/poem?id=${this.poemId}`);
      const poemDataJson = await response.json();
      this.poemData = poemDataJson;
      return poemDataJson;
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * Get all the poem annotations
   * @returns Annotation data as a JSON object
   */
  async GetPoemAnnotations() {
    try {
      const response = await fetch(`/annotations?poemId=${this.poemId}`);
      const annotationsDataJson = await response.json();
      this.annotationData = annotationsDataJson;
      return annotationsDataJson;
    } catch (err) {
      throw new Error(err);
    }
  }
  AddPoemToPage(poem) {
    // Get the poem content container
    let poemContent = document.querySelector('.poem-content');
    poemContent.setAttribute('data-poemid', poem.id);

    // Add the poem title and poet name to the page
    let poemTitle = CreateElement('h3', poem.poemTitle, { class: 'poem-title' });
    let poetName = CreateElement(
      'p', `by ${poem.poetName}`,
      { class: 'my-3 poet-name text-small text-bold text-uppercase' })

    poemContent.appendChild(poemTitle);
    poemContent.appendChild(poetName);

    // Add poem lines and attach a click event listener to the lines
    const poemLines = JSON.parse(poem.poemLines);
    const allLineIds =
      this.annotationData.map(annotation => parseInt(annotation.lineId));
    for (let line of poemLines) {
      let lineElement = document.createElement('p');
      // If the line has an annotation, show the annotation once the line is
      // clicked
      if (allLineIds.includes(line.lineId)) {
        lineElement.classList.add('annotated');
        lineElement.addEventListener('click', () => {
          let addAnnotationForm = document.querySelector('.add-annotation');
          let annotationsContent =
            document.querySelector('.annotations-content');
          let lineAnnotations = this.annotationData.filter(
            annotation => annotation.lineId == line.lineId);
          let allAnnotationsForLine = [];
          lineAnnotations.forEach(annotation => {
            allAnnotationsForLine.push(annotation.annotationText);
          });
          // Unhide the annotations content container while hiding the new
          // annotations form
          addAnnotationForm.classList.add('hidden');
          annotationsContent.classList.remove('hidden');
          annotationsContent.innerHTML = allAnnotationsForLine.join('\n');
        })
      }
      // Otherwise, show the "add annotation" section
      else {
        lineElement.addEventListener('click', () => {
          let addAnnotationForm = document.querySelector('.add-annotation');
          let annotationsContent =
            document.querySelector('.annotations-content');
          // show the annotations form while hiding the annotations content
          // container
          addAnnotationForm.classList.remove('hidden');
          annotationsContent.classList.add('hidden');
          addAnnotationForm.setAttribute('data-lineid', line.lineId);
          addAnnotationForm.setAttribute('data-poemid', poem.id);
        });
      }
      lineElement.classList.add('poem-line');
      lineElement.setAttribute('data-lineid', line.lineId);
      lineElement.innerHTML = line.lineText;
      poemContent.appendChild(lineElement);
    }
    // Poem source and date added
    let poemSource = CreateElement(
      'div', `Source: ${poem.source}`,
      { class: 'text-small text-italic text-gray mt-2' });
    let poemDateAdded = CreateElement(
      'span', `Added on ${new Date(poem.dateAdded).toDateString()}`,
      { class: 'text-small text-italic text-gray' });
    poemContent.appendChild(poemSource);
    poemContent.appendChild(poemDateAdded);
  }
  async Init() {
    const params = new URLSearchParams(window.location.search);
    this.poemId = params.get('id');
    if (this.poemId) {
      const poem = await this.GetPoemData();
      const annotations = await this.GetPoemAnnotations();
      this.AddPoemToPage(poem[0]);
      console.log(annotations);
    }
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new PoemData().Init();
});
