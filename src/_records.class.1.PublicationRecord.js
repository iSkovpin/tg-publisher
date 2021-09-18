class PublishRecord extends DataRecord {
    /**
     * @param {number} row
     * @param {PublicationsSheetInfo} sheetInfo
     */
    constructor(row, sheetInfo) {
        super(row, sheetInfo);

        this.dateCell = this.getCell(this.sheetInfo.columnDate);
        this.textCell = this.getCell(this.sheetInfo.columnText);
        this.imageCell = this.getCell(this.sheetInfo.columnImage);
    }

    /**
     * @return {Date}
     */
    getDate() {
        return this.dateCell.getValue();
    }

    /**
     * @return {string}
     */
    getText() {
        return this.textCell.getValue();
    }

    /**
     * @return {string}
     */
    getImage() {
        return this.imageCell.getValue();
    }

    /**
     * @param {string} value
     * @return {PublishRecord}
     */
    setDate(value) {
        this.dateCell.setValue(value);
        return this;
    }
    /**
     * @param {string} value
     * @return {PublishRecord}
     */
    setText(value) {
        this.textCell.setValue(value);
        return this;
    }

    /**
     * @param {string} value
     * @return {PublishRecord}
     */
    setImage(value) {
        this.textCell.setValue(value);
        return this;
    }

    /**
     * @return {boolean}
     */
    isValid() {
        return Boolean(this.getDate());
    }
}
