const index = require('./index.js')

function UpdateFunction(){
    index.check();
  // console.log("check");
}

setInterval(UpdateFunction, 30000);  //30000