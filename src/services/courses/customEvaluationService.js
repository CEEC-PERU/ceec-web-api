const Evaluation = require("../../models/evaluationModel");
const Module = require("../../models/moduleModel");
const Quizz = require("../../models/quizzModel");
const Option = require("../../models/optionModel")

exports.getEvaluationDataByModule = async (module_id) => {
    try {
        const evaluation = await Module.findByPk(module_id ,{
            include: {
                model: Evaluation,
                include: {
                    model: Quizz,
                    include: {
                        model: Option
                    }
                }
            }
        })
        return evaluation
    } catch (error) {
        console.error(error);
        throw error;
    }
}