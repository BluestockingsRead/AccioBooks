chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "searchAccioBooks",
		title: "Search Accio-Books for '%s'",
		contexts: ["selection"]
	});
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "searchAccioBooks") {
		const query = info.selectionText;
		const searchUrl = `https://www.accio-books.com/search?q=${encodeURIComponent(query)}`;
		chrome.tabs.create({
			url: searchUrl
		});
	}
});