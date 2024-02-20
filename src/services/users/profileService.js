const DocumentType = require('../../models/documentTypeModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');

async function createProfile(profileData) {
  return Profile.create(profileData);
}

async function getProfileById(profileId) {
  return Profile.findByPk(profileId);
}

async function updateProfile(user_id, profileData) {
  return Profile.update(profileData, { where: { user_id } });
}

async function deleteProfile(profileId) {
  return Profile.destroy({ where: { profile_id: profileId } });
}

async function getAllProfiles() {
  return Profile.findAll();
}

async function getDocumetTypes() {
  return DocumentType.findAll();
}

async function getAllUserProfileDataService(userId) {
  try {
    const user = await User.findOne({
      where: { user_id: userId },
      include: [{
        model: Profile,
        required: true,
        include: [{
          model: DocumentType,
          required: true
        }]
      }]
    });

    if (user) return user;

    return ({
      code: 404
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}



module.exports = {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllProfiles,
  getAllUserProfileDataService,
  getDocumetTypes
};