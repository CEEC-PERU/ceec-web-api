const Module = require('../../models/moduleModel');

const moduleService = require('../../services/courses/moduleService');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await moduleService.getAllModules();
    res.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getModuleById = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const module = await moduleService.getModuleById(moduleId);
    if (module) {
      res.json(module);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createModule = async (req, res) => {
  const { course_id, name, ppt_url } = req.body;
  try {
    const newModule = await moduleService.createModule({ course_id, name, ppt_url });
    res.json({
      message: 'Módulo creado exitosamente',
      newModule
    });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateModule = async (req, res) => {
  const moduleId = req.params.id;
  const { course_id, name, ppt_url, is_finish, is_active } = req.body;
  try {
    const updatedModule = await moduleService.updateModule(moduleId, { course_id, name, ppt_url, is_finish, is_active });
    if (updatedModule) {
      res.json(updatedModule);
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const deletedModule = await moduleService.deleteModule(moduleId);
    if (deletedModule) {
      res.json({ message: 'Module deleted successfully' });
    } else {
      res.status(404).json({ error: 'Module not found' });
    }
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
