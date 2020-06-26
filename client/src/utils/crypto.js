import crypto from 'crypto';

export const createCrypto = (v) => {
    return crypto.createHash('sha1').update(v.trim()).digest('hex')
}