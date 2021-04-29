const { encdec } = require("./lib/_encdec");

const { filehandle } = require("./lib/_filehandle");

const path = require("path");

const fs = require("fs");

const _defaultDecryptFolder = path.join(__dirname, "decrypt");
const _key = "k6qBTDf7HVWSWdThFVkgYiTEdZFIRSAd";
const _iv = "MCvyRMdSJW15wfBb";
const decryptFolder = async (folder, decryptFolder) => {
    decryptFolder ? console.log("Decrypt folder not set. Using default....") : decryptFolder = _defaultDecryptFolder;
    if (folder) {
        var files = filehandle.findCryptFiles(folder);
        files.forEach(async file => {
            var isCrypt = await filehandle.isCryptFile(file);
            if (fs.statSync(file).isFile() && isCrypt) {
                /*                       key  ,iv  ,input */
                filed = fs.readFileSync(file, 'utf-8');
                var decryptedFile = new encdec(_key, _iv, filed).decrypt();
                decryptedFile = await decryptedFile;
                console.log(file);
                fs.writeFileSync(file, decryptedFile, "utf-8");
            }
        })
    }
}

decryptFolder("C:\\Users\\decodde\\Documents\\Gtb")