const crypto = require('crypto');
const cipher = require('../Keys/keys').cipher;

function encode(data) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cipher.password, cipher.iv_password),
        buffer = Buffer.concat([
            encipher.update(data),
            encipher.final()
        ]);
    return buffer.toString('base64');
}

function decode(data) {
    try {
        var decipher = crypto.createDecipheriv('aes-256-cbc', cipher.password, cipher.iv_password),
            buffer = Buffer.concat([
                decipher.update(Buffer.from(data, 'base64')),
                decipher.final()
            ]);
        return buffer.toString();
    } catch (e) {
        return data;
    }
}

module.exports = { encode, decode };