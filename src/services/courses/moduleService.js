const Module = require('../../models/moduleModel');


exports.getAllModules = async () => {
  try {
    return await Module.findAll();
  } catch (error) {
    console.error(error);
  }
};

exports.getModuleById = async (moduleId) => {
  try {
    return await Module.findByPk(moduleId);
  } catch (error) {
    console.error(error);
  }
};

exports.createModule = async (moduleData) => {
  try {
    return await Module.create(moduleData);
  } catch (error) {
    console.error("Error service: ", error);
  }
};

exports.updateModule = async (moduleId, moduleData) => {
  try {
    const module = await Module.findByPk(moduleId);
    if (module) {
      await module.update(moduleData);
      return module;
    }
    return null;
  } catch (error) {
    console.error(error);
  }

};

exports.deleteModule = async (moduleId) => {
  try {
    const module = await Module.findByPk(moduleId);
    if (module) {
      await module.destroy();
      return module;
    }
    return null;
  } catch (error) {
    console.error(error);
  }

};
