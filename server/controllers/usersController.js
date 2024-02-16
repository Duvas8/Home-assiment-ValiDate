const User = require('../models/userModel');
const { OpenAI } = require("openai");

const API_KEY = ""


const getAllUsers = async() => {
    const users = await User.find();
    return users
}

const fetchFilteredUsers = async (loggedInUserId) => {
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
        throw new Error("User not found.");
    }

    const compatibleUsers = [];
    const users = await User.find();

    const processedUserIds = new Set(); // Set to store processed user IDs

    let i = 0;
    const startTime = Date.now(); // Get the current time

    while (compatibleUsers.length < 5 && i < users.length) {
        const user = users[i];
        i++;
    
        if (user._id.toString() === loggedInUserId || processedUserIds.has(user._id.toString())) {
            continue; // Skip the logged in user and already processed users
        }
    
        const compatibility = await calculateCompatibility(loggedInUser.idealPartnerDepiction, user.idealPartnerDepiction);
        if (compatibility >= 0.7) {
            compatibleUsers.push({ user, compatibility });
        }
        
        processedUserIds.add(user._id.toString()); // Add user ID to processed set

        // Check if one second has elapsed
        if (Date.now() - startTime >= 2000) {
            break; // Exit the loop if one second has passed
        }
    }
    
    // If compatibleUsers array is not full, consider users with compatibility >= 0.5
    if (compatibleUsers.length < 5) {
        i = 0; // Reset the index
        while (compatibleUsers.length < 5 && i < users.length) {
            const user = users[i];
            i++;
    
            if (user._id.toString() === loggedInUserId || processedUserIds.has(user._id.toString())) {
                continue; // Skip the logged in user and already processed users
            }
    
            const compatibility = await calculateCompatibility(loggedInUser.idealPartnerDepiction, user.idealPartnerDepiction);
            if (compatibility >= 0.5) { // Adjusted condition to include compatibility above 0.5
                compatibleUsers.push({ user, compatibility });
            }
            
            processedUserIds.add(user._id.toString()); // Add user ID to processed set

            // Check if one second has elapsed
            if (Date.now() - startTime >= 2000) {
                break; // Exit the loop if one second has passed
            }
        }
    }
    
    return compatibleUsers;
};





    const openai = new OpenAI({
        apiKey: API_KEY,
    });

    const calculateCompatibility = async (idealPartnerDepiction1, idealPartnerDepiction2) => {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "user", content: `Compare ideal partner depictions: "${idealPartnerDepiction1}" vs "${idealPartnerDepiction2}" return how much they are compatible with each other,  give a precise estimate in percent. olye return the precent you find and nothing else!` }
                ],
                max_tokens: 100,
                temperature: 0.7,
            });

            const compatibility = response.choices[0].message.content;
            console.log(`Compatibility: ${compatibility}`);
            return parseFloat(compatibility);
        } catch (error) {
            console.error('Error calculating compatibility:', error);
            throw new Error('Failed to calculate compatibility.');
        }
    };

    module.exports = { getAllUsers, fetchFilteredUsers };


// const User = require('../models/userModel')



// module.exports = {
//     getAllUsers,
// }