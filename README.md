# AI Code Reviewer

A modern web application that provides AI-powered code reviews using Google's Gemini AI. Built with React frontend and Node.js/Express backend.

## 🚀 Features

- **AI-Powered Code Review**: Get instant feedback on your code using Google Gemini AI
- **Modern UI**: Clean, responsive interface with beautiful gradient design
- **Code Analysis**: Comprehensive code review including:
  - Code quality assessment
  - Best practices suggestions
  - Performance optimizations
  - Security recommendations
  - Bug detection
  - Readability improvements

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite (Fast build tool and dev server)
- Modern CSS with gradients and animations
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js
- Express.js
- Google Generative AI (Gemini)
- CORS enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google AI API key

## 🚀 Quick Start

### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:

```env
PORT=3000
GOOGLE_API_KEY=your_google_api_key_here
```

**To get a Google API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste it in your `.env` file

### 3. Start Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3000`

### 4. Setup Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 5. Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:3001` (Vite will automatically open your browser)

## 🎯 Usage

1. Open your browser and go to `http://localhost:3001`
2. Paste your code in the text area
3. Click "Review Code" button
4. Get AI-powered feedback and suggestions

## 📁 Project Structure

```
AI Code Review/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── controller/
│   │   │   └── ai.controller.js # AI review controller
│   │   ├── routes/
│   │   │   └── ai.routes.js    # API routes
│   │   └── service/
│   │       └── ai.service.js   # Google AI service
│   ├── server.js               # Server entry point
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── CodeReviewer.js # Main React component
    │   ├── services/
    │   │   └── api.js          # API service
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🔧 API Endpoints

- `GET /` - Health check
- `POST /api/ai/review-code` - Submit code for AI review

### Request Format

```json
{
  "code": "function example() {\n  return 'Hello World';\n}"
}
```

## 🎨 Features Overview

### Frontend Features
- ✨ Beautiful gradient UI design
- 📱 Fully responsive layout
- 🔄 Real-time loading states
- 📋 Copy code and reviews to clipboard
- 💾 Download code and reviews as files
- 🎯 Form validation and error handling
- 🌟 Smooth animations and transitions

### Backend Features
- 🤖 Integration with Google Gemini AI
- 🔒 Environment variable configuration
- 🌐 CORS enabled for frontend communication
- 📝 Comprehensive AI system instructions
- ⚡ Fast response times

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Preview the build locally: `npm run preview`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check that your Google API key is correctly set
2. Ensure both backend and frontend servers are running
3. Verify the backend is accessible at `http://localhost:3000`
4. Check browser console for any errors

## 🎉 Enjoy Coding!

Happy coding and may your code reviews be insightful! 🚀
