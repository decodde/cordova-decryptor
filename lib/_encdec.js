const crypto = require("crypto");

class encdec {
    constructor(key, iv, input) {
        this.key = key;
        this.iv = iv;
        this.input = input;
    }
    async encrypt() {
        var cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        var encrypted = cipher.update(this.input, 'utf8', 'base64') + cipher.final('base64');

        return encrypted;
    }
    async decrypt() {
        var decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
        var decrypted = decipher.update(this.input, 'base64', 'utf8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
exports.encdec = encdec;