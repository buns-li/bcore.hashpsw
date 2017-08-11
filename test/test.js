require('../index')

const MiniServer = require('bcore/lib/mini-server-center')

class HASHPSW {
    constructor() {}

    async test() {

        let psw = '12345678'

        let hashedPassword = await this.msrv.hashpsw.encrypt(psw)

        console.log('hashedPassword:', hashedPassword)

        let isMatch = await this.msrv.hashpsw.compare(psw, hashedPassword)

        console.log('isMatch:', isMatch)

    }
}

let obj = new HASHPSW()

MiniServer
    .load('testApp', 'hashpsw', {
        aesKey: 'buns.li'
    })
    .then(() => {

        MiniServer.injection('testApp', obj)

        obj.test()
    })
