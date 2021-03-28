/**
 * Fetch poem from server
 * @TODO Add ability to get single poem using the poem's ID
 */
async function getPoems() {
  const response = await fetch('/poem');
  const responseJson = await response.json();
  responseJson.forEach(poem => {
    addPeomToPage(poem);
  });
}

/**
 * Add a poem to the page using the poem data
 * @param {*} poem Poem data including title, name of poet and poem lines
 */
function addPeomToPage(poem) {
  let container = document.querySelector('.poem');
  let poemTitle = document.querySelector('.poem-title');
  let poemAuthor = document.querySelector('.poem-author');
  let poemText = document.querySelector('.poem-text');
  let poemSource = document.querySelector('.poem-source');
  
  poemTitle.innerHTML = poem.poemTitle;
  poemAuthor.innerHTML += poem.poetName;
  poemSource.innerHTML += poem.source;
  const poemLines = JSON.parse(poem.poemLines);
  for (let i = 0; i < poemLines.length; i++) {
    poemText.innerHTML += `<p class="poem-line ${
        poemLines[i].hasAnnotation ? 'annotated' :
                                     ''}" onclick="getAnnotation('${
        poemLines[i].lineId}');" id="${poemLines[i].lineId}" data-lineId="${
        poemLines[i].lineId}">${poemLines[i].lineText}</p>`;
  }
}

// Update the page once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getPoems);