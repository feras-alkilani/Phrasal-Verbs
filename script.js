let data = null;

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    renderGroups();
  })
  .catch((err) => {
    console.error("Failed to load data:", err);
  });

function renderGroups() {
  if (!data) return;
  const container = document.getElementById("groupsContainer");
  container.innerHTML = data.wordGroups
    .map(
      (group) => `
    <div>
      <div class="group-title">${group.groupName}</div>
      <div class="flex flex-wrap gap-3">
        ${group.words
          .map(
            (word) =>
              `<button class="word-button px-4 py-2 bg-white shadow rounded hover:bg-gray-200" onclick="showDetails('${word}')">${capitalizeFirstLetter(
                word
              )}</button>`
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}

function showDetails(word) {
  if (!data) return;
  const details = data.wordDetails[word];
  const container = document.getElementById("detailsContainer");
  if (!details) {
    container.innerHTML = `<p class="text-red-500">No details found for "${word}".</p>`;
    return;
  }
  container.innerHTML = `
    <div class="p-4 rounded-lg context-${
      details.context
    } border border-gray-300">
      <h2 class="text-2xl font-bold mb-2">${capitalizeFirstLetter(word)}</h2>
      <p class="mb-2"><strong>Meaning:</strong> ${details.meaning}</p>
      <p class="mb-2"><strong>Derivatives:</strong> ${details.derivatives}</p>
      <p class="mb-2"><strong>Synonyms:</strong> ${details.synonyms}</p>
      <div class="space-y-1">
        ${details.examples.map((ex) => `<p>📘 ${ex}</p>`).join("")}
      </div>
      <p class="text-sm text-gray-500 mt-2">Context: ${details.context}</p>
      <p class="text-sm text-gray-500 mt-2">Frequency: ${details.frequency}</p>
      <p class="text-sm text-gray-500 mt-2">Translations: ${
        details.translations
      }</p>
    </div>
  `;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
