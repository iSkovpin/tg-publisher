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

        let data = {
            'chat_id': this.channelId,
            'text': msg,
            'disable_notification': this.getTimeAfterLastCall() < this.silentBuffer,
            'parse_mode': 'HTML'
        };

        let options = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(data)
        };

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
