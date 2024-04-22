const { Translator } = require("deepl-node");
const fs = require("fs");
const xmlFormat = require("xml-formatter");

function fixXML(filePath, version) {
    const textContent = fs.readFileSync(filePath, "utf-8");
    // Replace <xliff version="XXX" to <xliff version="2.1"
    const updatedContent = textContent.replace(/<xliff version="[0-9.]+"/, `<xliff version="${version}"`);
    const formattedXml = xmlFormat(updatedContent);
    fs.writeFileSync(filePath, formattedXml);
}

(async () => {
    const apiKey = fs.readFileSync("secret/deepl", "utf-8").trim();
    const translator = new Translator(apiKey);

    const sourcePath = "src/locale/messages.xlf";
    const targetPath = "src/locale/messages.ru.xlf";

    const usage = await translator.getUsage();
    if (usage.anyLimitReached()) {
        console.log("Translation limit exceeded.");
    }
    if (usage.character) {
        console.log(`Characters: ${usage.character.count} of ${usage.character.limit}`);
    }
    if (usage.document) {
        console.log(`Documents: ${usage.document.count} of ${usage.document.limit}`);
    }

    // const sourcePath = "src/locale/messages.json";
    // const targetPath = "src/locale/messages.ru.json";

    fixXML(sourcePath, "2.1");
    fs.rmSync(targetPath, { force: true });

    // await translator.translateDocument(sourcePath, targetPath, "en", "ru");

    // fixXML(sourcePath, "2.0");
    // fixXML(targetPath, "2.0");

    // console.log("Translation done");
})();
