document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
      initMisc();
    }
};

function initMisc() {
    const lobbyN01_tab = document.getElementById("lobbyN01-tab");
    const lobbyN02_tab = document.getElementById("lobbyN02-tab");
    const lobbyN03_tab = document.getElementById("lobbyN03-tab");
    const lobbyN01_panel = document.getElementById("lobbyN01-panel");
    const lobbyN02_panel = document.getElementById("lobbyN02-panel");
    const lobbyN03_panel = document.getElementById("lobbyN03-panel");

    /* Nav tabs et ouverture des panneaux */
    lobbyN01_tab.addEventListener("click", () => {
        lobbyN01_panel.classList.add("--current-lobby");
        lobbyN01_tab.classList.add("--current-tab");
        // remove active ones
        lobbyN02_panel.classList.remove("--current-lobby");
        lobbyN02_tab.classList.remove("--current-tab");
        lobbyN03_panel.classList.remove("--current-lobby");
        lobbyN03_tab.classList.remove("--current-tab");
    });

    lobbyN02_tab.addEventListener("click", () => {
        lobbyN02_panel.classList.add("--current-lobby");
        lobbyN02_tab.classList.add("--current-tab");
        // remove active ones
        lobbyN01_panel.classList.remove("--current-lobby");
        lobbyN01_tab.classList.remove("--current-tab");
        lobbyN03_panel.classList.remove("--current-lobby");
        lobbyN03_tab.classList.remove("--current-tab");
    });

    lobbyN03_tab.addEventListener("click", () => {
        lobbyN03_panel.classList.add("--current-lobby");
        lobbyN03_tab.classList.add("--current-tab");
        // remove active ones
        lobbyN01_panel.classList.remove("--current-lobby");
        lobbyN01_tab.classList.remove("--current-tab");
        lobbyN02_panel.classList.remove("--current-lobby");
        lobbyN02_tab.classList.remove("--current-tab");
    });
}