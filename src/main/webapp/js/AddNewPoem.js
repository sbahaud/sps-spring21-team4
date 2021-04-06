/**
 * Add a new poem
 */
class AddNewPoem {
  /**
   * Parse the poem text into lines
   * @param {string} text Full text of poem
   * @returns {Array} The individual lines of the poem
   * @todo Write a function that handles stanzas and empty lines
   */
  ParsePoemLines(text) {
    return text.replace('\r', '').split('\n');
  }
  /**
   * Post poem data to server
   * @param {object} data The poem data
   */
  PostPoemData(data) {
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
  Init() {
    let submitAnnotationButton = document.querySelector('#submit-btn');
    submitAnnotationButton.addEventListener('click', (e) => {
      let formData = new FormData(document.querySelector('#new-poem-form'));
      let fullText = formData.get('fullText');
      let poemLines = this.ParsePoemLines(fullText);
      let data = Object.fromEntries(formData.entries());
      data['poemLines'] = poemLines;
      data.source = data.source || '';
      this.PostPoemData(data);
      e.preventDefault();
    });
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new AddNewPoem().Init();
});
