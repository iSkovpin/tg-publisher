/**
 * Global config storage
 */
class Config {
    /**
     * @param {Object} source
     */
    constructor(source) {
        this.source = source;
    }

    /**
     * @param {string} name - dot separated
     * @return {any}
     */
    get(name) {
        let parts = name.split('.');
        let result = this.source[parts[0]];

        for (let i = 1; i < parts.length; i++) {
            if (result === undefined) {
                break;
            }
            result = result[parts[i]];
        }

        if (result === undefined) {
            throw 'Config variable "' + name + '" is not defined';
        }

        return result;
    }
}
