const campaignUserService = require('../../services/campaign/campaignUserService');

exports.getCampaignUserWithCourses  = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await campaignUserService.getCampaignUserWithCourses(user_id);
    if (!result) {
      return res.status(404).json({ message: 'User not found or not associated with any campaign' });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCampaignByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await campaignUserService.getCampaignByUserId(user_id);
    if (!result) {
      return res.status(404).json({ message: 'User not found or not associated with any campaign' });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createCampaignUser = async (req, res) => {
  try {
    const campaignUser = await campaignUserService.createCampaignUser(req.body);
    res.status(201).json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



exports.postCampaignsStudents = async (req, res) => {
  try {
    console.log(req.body);
    const { course_student_list } = req.body;
    if (!Array.isArray(course_student_list)) throw new Error('Invalid request');
    const courseStudents = await Promise.all(course_student_list.map(async (course_student) => {
      await campaignUserService.saveCampaignStudent(course_student);
    }));

    if (courseStudents) {
      res.status(200).json({ message: 'Estudiantes agregados satisfactoriamente' });
    } else {
      throw new Error('Los estudiantes no fueron agregados');
    };
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

exports.getCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.getCampaignUser(id);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.updateCampaignUser(id, req.body);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCampaignUser = async (req, res) => {
  try {
    const id = req.params.id;
    const campaignUser = await campaignUserService.deleteCampaignUser(id);
    res.json(campaignUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};