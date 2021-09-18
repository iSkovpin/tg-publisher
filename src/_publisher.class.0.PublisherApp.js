class PublisherApp {
    /**
     * @param {Config} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * @param {Date?} date
     */
    publishByDate(date) {
        if (date === undefined) {
            date = new Date();
        }

        let sheetInfo = this.getPublicationsSheetInfo();
        let row = sheetInfo.firstDataRow - 1;

        while (true) {
            row++;

            let record = new PublishRecord(row, sheetInfo);
            if (!record.isValid()) {
                break;
            }
            if (!isSameDay(date, record.getDate())) {
                continue;
            }

            if (record.getText()) {
                this.sendTelegramNotification(record.getText(), 'text');
            }

            if (record.getImage()) {
                this.sendTelegramNotification(record.getImage(), 'image');
            }
        }
    }

    /**
     * @param {string} msg
     * @param {string?} type
     */
    sendTelegramNotification(msg, type) {
        if (this.getConfig().get('telegramNotifications') === false) {
            return;
        }

        if (type === undefined) {
            type = 'text';
        }
        if (['text', 'image'].indexOf(type) === -1) {
            throw 'Unknown telegram message type';
        }

        if (type === 'text') {
            this.getTelegramBot().sendMessage(msg);
        } else if (type === 'image') {
            this.getTelegramBot().sendPhoto(msg);
        }
    }

    /**
     * @return {PublicationsSheetInfo}
     */
    getPublicationsSheetInfo() {
        if (this.publicationsSheetInfo === undefined) {
            this.publicationsSheetInfo = new PublicationsSheetInfo();
        }

        return this.publicationsSheetInfo;
    }

    /**
     * @return {TelegramBot}
     */
    getTelegramBot() {
        if (this.telegramBot === undefined) {
            this.telegramBot = new TelegramBot();
        }

        return this.telegramBot;
    }

    /**
     * @return {Config}
     */
    getConfig() {
        return this.config;
    }
}
