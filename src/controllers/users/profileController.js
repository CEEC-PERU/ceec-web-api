const profileService = require('../../services/users/profileService');
const { getUserById } = require('../../services/users/userService');

async function createProfile(req, res) {
  try {
    const { user_id } = req.params;
    const profile = await profileService.createProfile({ ...req.body, user_id: parseInt(user_id) });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Error creating profile', details: error.message });
  }
}

async function getProfileById(req, res) {
  const { profileId } = req.params;
  try {
    const profile = await profileService.getProfileById(profileId);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
}

async function updateProfile(req, res) {
  const { user_id } = req.params;
  try {
    const updated = await profileService.updateProfile(user_id, req.body);
    if (updated[0] === 1) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
}

async function deleteProfile(req, res) {
  const { profileId } = req.params;
  try {
    const deleted = await profileService.deleteProfile(profileId);
    if (deleted === 1) {
      res.json({ message: 'Profile deleted successfully' });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting profile' });
  }
}

async function getAllProfiles(req, res) {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
}

async function getAllUserProfileData(req, res) {
  try {
    const { userId } = req.params;
    const userProfile = await profileService.getAllUserProfileDataService(userId);
    if (userProfile.code === 404) {
      const user = await getUserById(userId);
      res.json(user);
    } else {
      res.json(userProfile);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
}

async function getDocumentTypes(req, res) {
  try {
    const documentTypes = await profileService.getDocumetTypes();
    res.json(documentTypes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
}

module.exports = {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  getAllUserProfileData,
  getDocumentTypes
};
