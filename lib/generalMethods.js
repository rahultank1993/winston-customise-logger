/**
 * Created by rahul on 29/9/15.
 */
var path = require("path")
    , fs = require('fs');

var general = function(){
    this.getPath = function(p){
        return path.join(__dirname,'../../../',p);
    };
    this.createDir = function (path) {
        try {
            fs.mkdirSync(path, 0777);
        } catch (e) {
            if (e.code != 'EEXIST') throw e;
        }
    };
};
module.exports = new general();
