const fs = require("fs");
const path = require("path");
const _crypt_ext = [".html", ".css", ".js"];
const filehandle = {
    findCryptFiles: (dir) => {
        var fileList = [];
        var list = fs.readdirSync(dir);
        list.forEach(function (file) {
            fileList.push(path.join(dir, file));
        });
        // sub dir
        list.filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        }).forEach(function (file) {
            var subDir = path.join(dir, file);
            var subFileList = filehandle.findCryptFiles(subDir);
            fileList = fileList.concat(subFileList);
        });

        return fileList;
    },
    isCryptFile: (file) => {
        file = file;
        var ext = path.extname(file)
        if (_crypt_ext.includes(ext) == true) return true;
        else return false;
    }
}

exports.filehandle = filehandle;