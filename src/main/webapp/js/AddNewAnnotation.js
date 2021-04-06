/**
 * Add a new annotation to a line
 */
class AddNewAnnotation {
  /**
   * Post new annotation to server
   * @param {object} data The annotation data
   */
  PostNewAnnotation(data) {
    try {
      fetch('/new-annotation', {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(data)
      })
    } catch (err) {
      throw new Error(err);
    }
  }
  Init() {
    let submitAnnotationButton = document.querySelector('#annotation-submit-btn');
    let discardAnnotationButton = document.querySelector('#annotation-discard-btn');
    console.log(submitAnnotationButton, discardAnnotationButton)
    submitAnnotationButton.addEventListener('click', (e) => {
      e.preventDefault();
      let dataset = document.querySelector('.add-annotation').dataset;
      let formData = new FormData(document.querySelector('#new-annotation-form'));
      let data = Object.fromEntries(formData.entries());
      data['poemId'] = dataset.poemid;
      data['lineId'] = dataset.lineid;
      this.PostNewAnnotation(data);
    });
    discardAnnotationButton.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.add-annotation').classList.remove('hidden');
    });
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new AddNewAnnotation().Init();
});
