const customEvaluationService = require("../../services/courses/customEvaluationService")
const { createEvaluation } = require("../../services/courses/evaluationService")
const { createQuizz } = require("../../services/courses/quizzService")

exports.getEvaluationByModule = async (req, res) => {
    try {
        const module_id = req.params.id
        const evaluation = await customEvaluationService.getEvaluationDataByModule(module_id)
        res.json(evaluation)
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.postEvaluationWithQuestions = async (req, res) => {
    try {
        const { evaluation, questions } = req.body;
        const response = await createEvaluation(evaluation);
        if (!response.error) {
            await Promise.all(questions.map(async question => {
                await createQuizz({
                    ...question,
                    evaluation_id: response.dataValues.evaluation_id,
                    points: parseFloat(question.points)
                });
            }));
            return res.status(201).json({
                message: "Evaluación creada satisfactoriamente 😊"
            });
        } else {
            return res.json({
                error: "Failed to create evaluation", details: response.error
            });
        }
    } catch (error) {
        console.error("Error creating evaluation with questions:", error);
        return res.json({ error: "Internal server error" });
    }
}
