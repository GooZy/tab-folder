// Create context menus
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "1",
        title: chrome.i18n.getMessage("contextMenu1"),
        type: 'normal',
        contexts: ['page']
    });
    chrome.contextMenus.create({
        id: "2",
        title: chrome.i18n.getMessage("contextMenu2"),
        type: 'normal',
        contexts: ['link']
    });
});

// Command listener
chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        if (command === 'save_tab') {
            let tab = tabs[0];
            chrome.tabs.remove(tab.id);
            saveTabInfo(tab.url, tab.title, tab.favIconUrl);
        }
    });
});

// Context menu listener
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.linkUrl == null) {
        chrome.tabs.remove(tab.id);
        saveTabInfo(tab.url, tab.title, tab.favIconUrl);
    } else {
        saveTabInfo(info.linkUrl, info.selectionText);
    }
});
