/**
 * @return {boolean}
 */
function isDev() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    return sheet.getName().indexOf('dev') !== -1;
}

/**
 * @param {Object} object
 * @return {number|undefined}
 */
function getObjectMaxRecursive (object) {
    let max;
    for (let key in object) {
        let elemMax;
        if (typeof object[key] === 'object') {
            elemMax = getObjectMaxRecursive(object[key]);
        } else if (typeof object[key] === 'number') {
            elemMax = object[key];
        }

        if (elemMax !== undefined && (max === undefined || elemMax > max)) {
            max = elemMax;
        }
    }

    return max;
}

/**
 * @param {Object} object
 * @return {number|undefined}
 */
function getObjectMinRecursive (object) {
    let min;
    for (let key in object) {
        let elemMin;
        if (typeof object[key] === 'object') {
            elemMin = getObjectMinRecursive(object[key]);
        } else if (typeof object[key] === 'number') {
            elemMin = object[key];
        }

        if (elemMin !== undefined && (min === undefined || elemMin < min)) {
            min = elemMin;
        }
    }

    return min;
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @return {string}
 */
function getCellUrl(range) {
    return range.getSheet().getParent().getUrl() + '#gid=' + range.getSheet().getSheetId() + "&range=" + range.getA1Notation();
}

/**
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}

/**
 * @param {Date} someDate
 * @returns {boolean}
 */
function isToday(someDate) {
    const today = new Date();
    return isSameDay(someDate, today);
}

/**
 * @return {string}
 */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * @return {string}
 */
String.prototype.stripTags = function () {
    return this.replace(/<\/?[^>]+(>|$)/g, "");
}
