// services/requirementService.js
const Profile = require('../../models/profileModel');
const Requirement = require('../../models/requirementModel');
const User = require('../../models/userModel');
const Campaign = require('../../models/campaignModel');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dk2red18f',
  api_key: '647789177635785',
  api_secret: 'xa2vaybRQMfxna7Gd2oqrQg8eUg',
  secure: true,
});



exports.uploadImages = async (images) => {
  try {
    const urls = [];
    if (!Array.isArray(images)) {
      // Si `images` no es un array, se asume que solo hay una imagen y se convierte en un array
      images = [images];
    }
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
      urls.push(result.secure_url);
    }
    return urls;
  } catch (error) {
    throw error;
  }
};


// Função para criar um novo requirement no banco de dados
exports.createRequirement = async (data) => {
  try {
    const requirement = await Requirement.create(data);
    return requirement;
  } catch (error) {
    throw error;
  }
};

exports.getAllRequirements = async () => {
    try {
        const requirements = await Requirement.findAll({
            include: [
                {
                    model: Campaign,
                    attributes: ['campaign_id','name'], 
                },
                {
                    model: User,
                    attributes: ['user_id','email'], 
                    include: [{
                        model: Profile,
                        attributes: ['first_name', 'last_name', 'phone','profile_picture'] 
                    }],
                }
            ],
        });
        return requirements;
    } catch (error) {
        throw error;
    }
};