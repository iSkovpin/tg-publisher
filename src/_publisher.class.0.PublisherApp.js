class PublisherApp {
    /**
     * @param {Config} config
     */
    constructor(config) {
        this.config = config;
    }

    publishByDate(date) {
        if (date === undefined) {
            date = Utilities.formatDate(new Date(), this.getConfig().get('timezone'), this.getConfig().get('dateFormat'));
        }

        let sheetInfo = this.getPublicationsSheetInfo();
        // let sheet = sheetInfo.getSheet();

        let row = 1;

        while (true) {
            row++;

            let record = new PublishRecord(row, sheetInfo);
            if (!record.isValid()) {
                break;
            }
            if (record.getDate() !== date) {
                continue;
            }

            this.sendTelegramNotification(record.getText());
        }


    }

    sendTelegramNotification(msg) {
        if (this.getConfig().get('telegramNotifications') === false) {
            return;
        }

        this.getTelegramBot().sendMessage(msg);
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
