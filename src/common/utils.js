const BLOCK_PATTERNS = [
    RegExp(/^chrome.*/),
    RegExp(/^\s*$/)
];
const RESULT = {
  BAD_URL: -1,
  OVER_LIMIT: -2
};
const DEFAULT_FOLDER_CAPACITY = 20;

// Save information about URL, title and icon on the tab
function saveTabInfo(url, tittle, iconUrl, id) {
    iconUrl = chrome.runtime.getURL("images/multiple.png");  // use default icon to avoid icon request
    chrome.storage.sync.get(['tabs', 'capacity'], function (result) {
        // skip block urls
        if (url == null) {
            alert(chrome.i18n.getMessage('hintInvalidTab'));
            return RESULT.BAD_URL;
        }
        for (let i in BLOCK_PATTERNS) {
            if (BLOCK_PATTERNS[i].test(url)) {
                alert(chrome.i18n.getMessage('hintInvalidTab'));
                return RESULT.BAD_URL;
            }
        }

        let curTitle = tittle == null ? url : tittle;
        let tabs = [{
            'url': url,
            'title': curTitle,
            'iconUrl': iconUrl,
            'createTimeUnix': new Date().getTime()
        }];
        if (result.tabs != null) {
            let capacity = result.capacity == null ? DEFAULT_FOLDER_CAPACITY : result.capacity;
            if (result.tabs.length >= capacity) {
                alert(chrome.i18n.getMessage('hintOverLimit'));
                return RESULT.OVER_LIMIT;
            }
            // Deduplication
            for (let i in result.tabs) {
                if (result.tabs[i].url === url) {
                    result.tabs.splice(i, 1);
                    break;
                }
            }
            // sort result by create time
            tabs = tabs.concat(result.tabs).sort((x, y) => {
                return y.createTimeUnix - x.createTimeUnix;
            });
            updateBadge(tabs.length);
        }
        chrome.storage.sync.set({
            'tabs': tabs
        }, () => {
            console.debug("Save label success.", url, tittle, iconUrl, unixTime2String(new Date().getTime()));
        });
        if (id != null) {
            chrome.tabs.remove(id);
        }
    });
}

function updateBadge(total) {
    chrome.browserAction.setBadgeText({text: total + ''});
    chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
}

function unixTime2String(uTime, fmt="yyyy-MM-dd hh:mm:ss") {
    return new Date(uTime).Format(fmt);
}

function getDefaultCapacity() {
    return DEFAULT_FOLDER_CAPACITY;
}

Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor(this.getMonth() / 3) + 1, // quarter
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
