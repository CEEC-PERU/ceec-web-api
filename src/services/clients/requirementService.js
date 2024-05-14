// services/requirementService.js
const Profile = require('../../models/profileModel');
const Requirement = require('../../models/requirementModel');
const User = require('../../models/userModel');
const Campaign = require('../../models/campaignModel');



// Função para criar um novo requirement no banco de dados
exports.create = async (data) => {
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