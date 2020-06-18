// Save information about URL, title and icon on the tab
function saveTabInfo(url, tittle, iconUrl) {
    if (iconUrl == null) {
        iconUrl = chrome.runtime.getURL("images/multiple.png");
    }
    chrome.storage.sync.get(['tabs'], function (result) {
        console.debug(result);
    });
    console.debug(url, tittle, iconUrl, new Date().getTime(), unixTime2String(new Date().getTime()));
}

function unixTime2String(uTime, fmt="yyyy-MM-dd hh:mm:ss") {
    return new Date(uTime).Format(fmt);
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
