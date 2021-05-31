const {WyslijSeClient} = require("../dist/index");

let WSC = new WyslijSeClient("token")

WSC.listFiles().then(r => {console.log(r)})