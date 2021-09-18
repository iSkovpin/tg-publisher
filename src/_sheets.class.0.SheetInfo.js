/**
 * Information about some sheet.
 */
class SheetInfo {
    /**
     * @param {string} sheetConfigVar
     */
    constructor(sheetConfigVar) {
        this.sheetNameConfigVar = sheetConfigVar;
        if (this.sheetNameConfigVar === undefined) {
            throw 'sheetConfigVar is not defined';
        }

        this.config = config.get(sheetConfigVar);
    }

    /**
     * @return {GoogleAppsScript.Spreadsheet.Sheet}
     */
    getSheet() {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.config.name);
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
     * @return {boolean}
     */
    isCorrectSheet(sheet) {
        return sheet.getName() === this.config.name;
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @return {boolean}
     */
    isCorrectSheetByRange(range) {
        return this.isCorrectSheet(range.getSheet());
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @param {number[]} columns
     * @return {boolean}
     */
    isCellColumnIn(range, columns) {
        return columns.indexOf(range.getColumn()) !== -1
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @param {number[]} rows
     * @return {boolean}
     */
    isCellRowIn(range, rows) {
        return rows.indexOf(range.getRow()) !== -1
    }

    /**
     * @return {number|undefined}
     */
    getFirstConfigurableColumn() {
        return getObjectMinRecursive(this.config.columns);
    }

    /**
     * @return {number|undefined}
     */
    getLastConfigurableColumn() {
        return getObjectMaxRecursive(this.config.columns);
    }

    /**
     * @return {number|undefined}
     */
    getFirstConfigurableRow() {
        return getObjectMinRecursive(this.config.rows);
    }

    /**
     * @return {number|undefined}
     */
    getLastConfigurableRow() {
        return getObjectMaxRecursive(this.config.rows);
    }
}
