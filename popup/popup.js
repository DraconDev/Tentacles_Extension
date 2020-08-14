document.addEventListener(
  "DOMContentLoaded",
  function (params) {
    document
      // .getElementById("toggle_button")
      .querySelector("button")
      .addEventListener("click", onClick, false);

    function onClick(params) {
      // alert("test popup");
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi");
      });
    }
  },
  false
);
