/**
 * Add a new poem
 */
class AddPoem {
  /**
   * Parse the poem text into lines
   * @param {string} text Full text of poem
   * @returns {Array} The individual lines of the poem
   * @todo Write a function that handles stanzas and empty lines
   */
  parsePoemLines(text) {
    return text.replace('\r', '').split('\n');
  }

  /**
   * Post poem data to server
   * @param {object} data The poem data
   */
  postPoemData(data) {
    try {
      fetch('/new-poem', {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify(data)
      }).then(
        response => {
          /**
           * @todo - Do something with this response code
           * @todo Perhaps show a confirmation of successful addition
           */
          console.log(response.json())
        })
    } catch (err) {
      throw new Error(err);
    }
  }

  init() {
    let submitAnnotationButton = document.querySelector('#submit-btn');
    submitAnnotationButton.addEventListener('click', (e) => {
      let formData = new FormData(document.querySelector('#new-poem-form'));
      let fullText = formData.get('fullText');
      let poemLines = this.parsePoemLines(fullText);
      let data = Object.fromEntries(formData.entries());
      data['poemLines'] = poemLines;
      data.source = data.source || '';
      this.postPoemData(data);
      e.preventDefault();
    });
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new AddPoem().Init();
});
