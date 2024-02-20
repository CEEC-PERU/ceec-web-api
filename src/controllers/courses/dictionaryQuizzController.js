const { getDictionaryQuizzesByModule, createDictionary } = require("../../services/courses/customDictionaryQuizService");
const { createDictionaryQuiz } = require("../../services/courses/dictionaryService");

exports.getDictionaryQuizzesByModule = async (req, res) => {
    try {
        const module_id = req.params.id
        const dictionaryQuizzes = await getDictionaryQuizzesByModule(module_id);
        res.json(dictionaryQuizzes)
    } catch (error) {
        console.error('Error fetching dictionaryQuizzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.postDictionary = async (req, res) => {
    try {
        console.log(req.body)
        const diccionarioPromises = req.body.dictionary.map(async (value, index) => {
            try {
                const result = await createDictionaryQuiz(value);
                if(result.error) {
                    return { id: index, success: false, error: result.error };
                }
                return { id: index, success: true };
            } catch (error) {
                console.error(`Error al procesar el diccionario ${index}: ${error}`);
                return { id: index, success: false, error: error.message || 'Error desconocido' };
            }
        });

        const resultados = await Promise.all(diccionarioPromises);

        const errores = resultados.filter(result => !result.success);

        if (errores.length > 0) {
            res.json({
                message: 'Algunos diccionarios no se pudieron crear correctamente',
                errores: errores
            });
        } else {
            res.json({
                message: 'Todos los diccionarios fueron creados exitosamente',
            });
        }
    } catch (error) {
        console.error("Error en el controlador: ", error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message || 'Error desconocido'
        });
    }
};