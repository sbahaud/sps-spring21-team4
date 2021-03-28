/**
 * Fetch an annotation from the server when an annotated line is clicked
 * @param {*} lineId The ID of the annotated line
 */
async function getAnnotation(lineId) {
  const response = await fetch(`/annotation?lineId=${lineId}`);
  const responseJson = await response.json();
  const annotationContainer = document.querySelector('.annotation');
  responseJson.forEach(annotation => {
      annotationContainer.innerHTML =
          `<p class="annotation-text">${annotation.annotationText}</p>`;
  });
}
