const crypto = require('crypto')

const bcore = require('bcore')

const bcrypt = require('bcrypt')

bcore.on('hashpsw', {
    saltRounds: 10,
    saltHandler: function () {},
    aesKey: 'bcore.hash_psw'
}, function () {

    //密码加密算法

    this.__init = function (options) {

        this.saltRounds = options.saltRounds || 10
        this.aesKey = options.aesKey
    }

    /**
     * 加密明文密码
     *      refer : Dropbox的密码加密方式
     * @param {String} password 明文密码
     * @return {String} 密文
     */
    this.encrypt = async function (password) {
        //sha512
        let sha512Str = crypto.createHash('sha512').update(password).digest('hex')

        //bcrypt
        let bcryptedStr = await new Promise((resolve, reject) => {

            bcrypt.genSalt(this.saltRounds, (err, salt) => {

                if (err) return reject(err)

                bcrypt.hash(sha512Str, salt, (err2, hash) => {

                    if (err2) return reject(err2)

                    resolve(hash)
                })

            })
        })

        //aes-256-cbc
        return encrypt(bcryptedStr, this.aesKey)
    }

    this.compare = async function (password, cryptedPassword) {

        //sha512
        let sha512Str = crypto.createHash('sha512').update(password).digest('hex')

        //aes-256-cbc 解密

        let bcryptedPassword = decrypt(cryptedPassword, this.aesKey)

        let isMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(sha512Str, bcryptedPassword, (err, res) => err ? reject(err) : resolve(res))
        })

        return isMatch
    }

    function encrypt(password, key) {

        let cipher = crypto.createCipher('aes-256-cbc', key)

        return cipher.update(password, 'utf8', 'hex') + cipher.final('hex')

    }

    function decrypt(encryptedPsw, key) {

        let decipher = crypto.createDecipher('aes-256-cbc', key)

        return decipher.update(encryptedPsw, 'hex', 'utf8') + decipher.final('utf8')
    }

})
