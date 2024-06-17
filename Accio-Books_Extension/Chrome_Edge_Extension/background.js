const browser = (typeof chrome !== "undefined" ? chrome : browser);

// Create the context menu on installation
browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "searchAccioBooks",
        title: "Accio Books search: '%s'",
        contexts: ["selection"]
    });
    console.log("Context menu created");
});

// Handle the context menu click event
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchAccioBooks") {
        const query = info.selectionText;
        const searchUrl = `https://www.accio-books.com/search?q=${encodeURIComponent(query)}`;
        browser.tabs.create({
            url: searchUrl
        });
        console.log(`Context menu clicked, searching for: ${query}`);
    }
});

// Handle the keyboard shortcut command
browser.commands.onCommand.addListener((command) => {
    console.log(`Command received: ${command}`);
    if (command === "search-accio-books") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.log("No active tabs found");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => window.getSelection().toString()
            }).then((results) => {
                const query = results[0]?.result;
                if (query) {
                    const searchUrl = `https://www.accio-books.com/search?q=${encodeURIComponent(query)}`;
                    chrome.tabs.create({
                        url: searchUrl
                    });
                    console.log(`Keyboard shortcut used, searching for: ${query}`);
                } else {
                    console.log("No text selected");
                }
            }).catch((error) => {
                console.error("Script execution failed: ", error);
            });
        });
    }
});
