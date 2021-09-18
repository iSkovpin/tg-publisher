/**
 * Common data record class. Only for extending.
 */
class DataRecord {
    /**
     * @param {number} row
     * @param {PublicationsSheetInfo} sheetInfo
     */
    constructor(row, sheetInfo) {
        this.row = row;
        this.sheetInfo = sheetInfo;
    }

    /**
     * @param {number} column
     * @return {string}
     */
    getCellValue(column) {
        return this.getCell(column).getValue();
    }

    /**
     * @param {number} column
     * @param {number?} row
     * @return {GoogleAppsScript.Spreadsheet.Range}
     */
    getCell(column, row) {
        if (row === undefined) {
            row = this.row;
        }
        return this.sheetInfo.getSheet().getRange(row, column);
    }
}
