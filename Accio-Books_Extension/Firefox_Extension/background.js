// Universal version
const browser = (typeof chrome !== "undefined" ? chrome : browser);

browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "searchAccioBooks",
        title: "Accio Books search: '%s'",
        contexts: ["selection"]
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchAccioBooks") {
        const query = info.selectionText;
        const searchUrl = `https://www.accio-books.com/search?q=${encodeURIComponent(query)}`;
        browser.tabs.create({
            url: searchUrl
        });
    }
});
