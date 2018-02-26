require("../index");

const MiniServer = require("bcore/lib/mini-server-center");

let psw = "12345678";

class HASHPSW {
  constructor() {}

  getPropert() {
    return this.msrv;
  }

  async test() {
    let hashedPassword = await this.msrv.hashpsw.encrypt(psw);

    let isMatch = await this.msrv.hashpsw.compare(psw, hashedPassword);

    return isMatch;
  }
}

let obj = new HASHPSW();

require("should");

describe("bcore.hashpsw", () => {
  before(done => {
    MiniServer.load("testApp", "hashpsw", {
      aesKey: "buns.li"
    }).then(() => {
      MiniServer.injection("testApp", obj);
      done();
    });
  });

  it("should have property `hashpsw`", () => {
    let properties = obj.getPropert();
    properties.should.have.property("hashpsw");
  });

  it("should return true", () => {
    obj.test().then(data => {
      data.should.be.ok();
    });
  });
});
