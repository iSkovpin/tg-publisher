class TelegramBot {
    constructor() {
        let conf = config.get('telegramBot');
        this.token = conf.token;
        this.channelId = conf.channelId;
        this.silentBuffer = conf.silentBuffer;
        this.lastCallTimePropName = conf.lastCallTimePropName;
    }

    /**
     * @param {string} msg
     */
    sendMessage(msg) {
        let url = this.getSendMessageUrl();
        let data = this.getDefaultRequestArgs();
        let options = this.getDefaultRequestOptions();

        data.text = msg;
        options.payload = JSON.stringify(data);

        UrlFetchApp.fetch(url, options);
        this.setLastCallTime();
    }

    /**
     * @param {string} photoUrl
     */
    sendPhoto(photoUrl) {
        let url = this.getSendPhotoUrl();
        let data = this.getDefaultRequestArgs();
        let options = this.getDefaultRequestOptions();

        data.photo = photoUrl;
        options.payload = JSON.stringify(data);

        UrlFetchApp.fetch(url, options);
        this.setLastCallTime();
    }

    /**
     * @return {string}
     */
    getBaseUrl() {
        return 'https://api.telegram.org/bot' + this.token;
    }

    /**
     * @return {string}
     */
    getSendMessageUrl() {
        return this.getBaseUrl() + '/sendMessage';
    }

    /**
     * @returns {string}
     */
    getSendPhotoUrl() {
        return this.getBaseUrl() + '/sendPhoto';
    }

    /**
     * @returns {Object}
     */
    getDefaultRequestArgs() {
        return {
            'chat_id': this.channelId,
            'disable_notification': this.getTimeAfterLastCall() < this.silentBuffer,
            'parse_mode': 'HTML'
        };
    }

    /**
     * @returns {Object}
     */
    getDefaultRequestOptions() {
        return {
            'method': 'post',
            'contentType': 'application/json',
        };
    }

    /**
     * @return {number}
     */
    getLastCallTime() {
        let scriptProperties = PropertiesService.getScriptProperties();
        let timestamp = scriptProperties.getProperty(this.lastCallTimePropName);

        if (timestamp === undefined) {
            return 0;
        }

        return parseInt(timestamp);
    }

    /**
     * @return {number}
     */
    getTimeAfterLastCall() {
        return Date.now() / 1000 - this.getLastCallTime();
    }

    /**
     * @param {number?} timestamp (unix time)
     */
    setLastCallTime(timestamp) {
        if (timestamp === undefined) {
            timestamp = Date.now() / 1000;
        }

        let scriptProperties = PropertiesService.getScriptProperties();
        scriptProperties.setProperty(this.lastCallTimePropName, timestamp.toString());
    }
}
