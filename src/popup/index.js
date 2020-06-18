new Vue({
    el: '#app',
    data: {
        tabs: [{
            'url': 'http://www.baidu.com',
            'title': '百度',
            'iconUrl': chrome.runtime.getURL("images/multiple.png"),
            'createTimeUnix': 1592318558
        }],
        messages: {
            "extName": "",
            "popUpTitle": ""
        }
    },
    created: () => {
        console.debug("created");
        chrome.storage.sync.get(['tabs'], function (result) {
            console.debug(result.value);
            console.debug(this.tabs);
            if (result.value != null) {
                this.tabs = result.value;
            }
        });
        // init locale messages
        for (let key in this.messages) {
            this.messages[key] = chrome.i18n.getMessage(key);
            console.debug(this.messages[key]);
        }
    }
});