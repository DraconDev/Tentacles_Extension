//  LOCAL Storage

// Save data to storage locally, in just this browser...

// chrome.storage.local.set({ tectaclesToggleStored: true }, function () {
//   //  Data's been saved boys and girls, go on home
// });

// chrome.storage.local.get(
//   /* String or Array */ ["tectaclesToggleStored"],
//   function (items) {
//     //  items = [ { "phasersTo": "awesome" } ]
//   }
// );

const toggleStatus = () => {
  chrome.storage.local.get(
    /* String or Array */ ["tectaclesToggleStored"],
    function (items) {
      chrome.storage.local.set(
        { tectaclesToggleStored: !items.tectaclesToggleStored },
        function () {
          //  Data's been saved boys and girls, go on home
        }
      );
    }
  );
  document.location.reload();
};

function replaceText(element) {
  let tempArray = [];
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    tempArray = element.textContent
      .split(" ")
      .map((e) => {
        if (Math.floor(Math.random() * 25) + 1 === 25) {
          if (e.match(/(?<!\S)[A-Z]{1}[a-z]+(?!\S.)/)) {
            return e.replace(/(?<!\S)[A-Z]{1}[a-z]+(?!\S.)/, "Tentacles");
          } else {
            return e.replace(/(?<!\S)[a-z]+(?!\S.)/, "tentacles");
          }
        } else {
          return e;
        }
      })
      .join(" ");

    element.textContent = tempArray;
  }
}

chrome.runtime.onMessage.addListener(function (request) {
  toggleStatus();
});

chrome.storage.local.get(
  /* String or Array */ ["tectaclesToggleStored"],
  function (items) {
    //  items = [ { "phasersTo": "awesome" } ]

    if (
      items.tectaclesToggleStored === true ||
      items.tectaclesToggleStored === undefined
    ) {
      replaceText(document.body);
    }
  }
);
