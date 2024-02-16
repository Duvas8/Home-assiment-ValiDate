const User = require('../models/userModel');

const { OpenAI } = require("openai");

const  API_KEY = ""

const registerNewUser = async (obj, res) => { // Accept 'res' as a parameter
    const idealPartnerDepiction = await generateIdealPartnerDepiction(obj);
    const usersDB = await User.find();
    const { email, selfDepiction } = obj;  
    if (!email) return res.status(400).json("Missing email");
    const duplicate = usersDB.find(per => per.email === email);
    if (duplicate) return res.status(409).json("Email Already Taken");
    try {
        const newUser = { email, selfDepiction, idealPartnerDepiction };
        const registerUser = new User(newUser);
        await registerUser.save();
        return 'New User Registered!'; // Send success response
    } catch (err) {
        return res.status(500).json({ "message": err.message }); // Send error response
    }
}


const openai = new OpenAI({
    apiKey: API_KEY,// Use OPENAI_API_KEY directly from @env
});



const generateIdealPartnerDepiction = async (obj) => {
    const { selfDepiction } = obj;
    try {
        const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages: [{ role: "user", content: `Generate an ideal partner depiction, Try to focus and check if there are hobbies, residential area, occupation and age (spacify age ranges)
            and create the ideal partner depiction based on this data from the self-depiction: "${selfDepiction}", keep your answer short, in your answer return only the generated ideal partner depiction, nothing else` }],
           // prompt: `Generate an ideal partner depiction based on the self-depiction: "${selfDepiction}"`,
            max_tokens: 100,
            temperature: 0.7,
        });

        const apiResp = response.choices[0].message.content;
        console.log(apiResp);
        return apiResp;
    } catch (error) {
        console.error('Error generating ideal partner depiction:', error);
        throw new Error('Failed to generate ideal partner depiction.');
    }
};


module.exports = { registerNewUser, generateIdealPartnerDepiction };