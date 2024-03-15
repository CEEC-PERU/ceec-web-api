const DictionaryQuizModel = require("../../models/dictionaryQuizModel");

exports.getDictionaryQuizzesByModule = async (module_id) => {
    try {
        const dictionaryquizzes = await DictionaryQuizModel.findAll({
            where: { module_id },
        })
        return dictionaryquizzes
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.createDictionary = async (dictionary) => {
    try {
        const result = await DictionaryQuizModel.create(dictionary);
        return { result };
    } catch (error) {
        console.error("error at dictionary service", error.original.toString().split(' at')[0]);
        return { error: error.original.toString().split(' at')[0] }
    }
}
