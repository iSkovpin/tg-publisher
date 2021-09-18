const configExample = {
    timezone: 'GMT+7',
    dateFormat: 'dd.MM.yyyy',
    telegramNotifications: true,
    telegramBot: {
        token: '<token>',
        channelId: -123456789,
        silentBuffer: 600, // seconds
        lastCallTimePropName: 'TG_BOT_LAST_CALL_TIME',
    },
    sheets: {
        publications: {
            name: 'Publications',
            columns: {
                date: 1,
                text: 2,
                image: 3,
            },
            rows: {
                firstData: 2,
            },
        },
    }
};
