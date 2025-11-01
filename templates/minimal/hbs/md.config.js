const repoDescriptions = require("./structure-descriptions");
const structureDescriptions = repoDescriptions();
module.exports = {
    transformDefaults: {
        STRUCTURE: {
            descriptions: structureDescriptions
        }
    },
    transforms: {
        INSTALL: require("markdown-magic-install-extended"),
        STRUCTURE: require("markdown-magic-transform-treefile-extended"),
    }
}