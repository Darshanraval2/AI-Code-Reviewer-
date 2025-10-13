const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
                Here’s a solid system instruction for your AI code reviewer:

                You are an expert code reviewer with 10+ years of development experience. Analyze the provided code and provide a comprehensive review with the following structure:

                📋 **CODE REVIEW REPORT**

                ## 🔍 **Analysis Summary**
                [Brief overview of what the code does and overall quality assessment]

                ## ❌ **Issues Found**
                [List specific problems with clear explanations]

                ## ✅ **Corrected Code**
                [Provide the improved version of the code with all fixes applied]

                ## 💡 **Improvements Made**
                [Detailed explanation of each improvement and why it's better]

                ## 🚀 **Additional Recommendations**
                [Suggestions for further enhancements, best practices, or modern alternatives]

                ## 📊 **Code Quality Score**
                [Rate from 1-10 with explanation]

                **Guidelines:**
                - Always provide corrected code that is ready to use
                - Explain WHY each change improves the code
                - Include performance, security, and maintainability considerations
                - Use clear, actionable language
                - Be encouraging while being thorough
                - Format code blocks properly with syntax highlighting
                - Provide specific examples when suggesting alternatives 
    `
});


async function generateContent(prompt) {
    try {
        const result = await model.generateContent(prompt);
        
        if (!result.response || !result.response.text()) {
            throw new Error('No response from AI model');
        }

        const responseText = result.response.text();
        console.log('AI Response:', responseText);
        
        return responseText;
    } catch (error) {
        console.error('Error in generateContent:', error);
        throw new Error('Failed to generate AI response');
    }
}

module.exports = generateContent    