/**
 * Information about expenses sheet.
 */
class PublicationsSheetInfo extends SheetInfo {
    constructor() {
        let sheetNameConfigVar = 'sheets.publications';
        super(sheetNameConfigVar);

        this.columnDate = this.config.columns.date;
        this.columnText = this.config.columns.text;
        this.columnImage = this.config.columns.image;
    }

    /**
     * @param {int} row
     * @return {boolean}
     */
    isDataRow(row) {
        return row >= this.firstDataRow;
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @return {boolean}
     */
    isDataCell(range) {
        return this.isCorrectSheetByRange(range) && this.isDataRow(range.getRow());
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @return {boolean}
     */
    isDateCell(range) {
        return this.isCorrectSheetByRange(range)
            && this.isDataCell(range)
            && range.getColumn() === this.columnDate;
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @return {boolean}
     */
    isTextCell(range) {
        return this.isDataCell(range)
            && range.getColumn() === this.columnText;
    }

    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @return {boolean}
     */
    isImageCell(range) {
        return this.isDataCell(range)
            && range.getColumn() === this.columnImage;
    }
}
