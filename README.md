# CV Builder

A modern, fast, and intuitive CV builder application with AI-powered content refinement. Built with Next.js 14, Firebase, and Google Gemini AI.

## Features

- 🚀 **Fast & Intuitive** - Form-based editor for quick CV creation
- 🤖 **AI-Powered Refinement** - Use Google Gemini AI to improve your CV content
- 📄 **Multiple Export Formats** - Download as PDF or Word document (DOCX)
- 🎨 **Professional Templates** - Clean, ATS-friendly CV templates
- 🔐 **Secure Authentication** - Email/password and Google OAuth sign-in
- ☁️ **Cloud Storage** - Save and access your CVs from anywhere
- 💾 **Auto-save** - Never lose your work with automatic saving

## Tech Stack

- **Framework:** Next.js 14 (React, TypeScript)
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **UI:** Tailwind CSS, Radix UI
- **Forms:** React Hook Form, Zod
- **Document Generation:** @react-pdf/renderer, docx
- **AI:** Google Generative AI (Gemini)

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Firebase project ([Create one here](https://console.firebase.google.com/))
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd cv-builder
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google (optional)

4. Enable **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose a location

5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the firebaseConfig object

6. Get Firebase Admin SDK credentials:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - You'll need: `project_id`, `client_email`, and `private_key`

### 3. Set Up Firestore Security Rules

Go to Firestore > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own CVs
    match /users/{userId}/cvs/{cvId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Templates are readable by all authenticated users
    match /templates/{templateId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 4. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (from service account JSON)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour\\nPrivate\\nKey\\nHere\\n-----END PRIVATE KEY-----\\n"

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** For `FIREBASE_ADMIN_PRIVATE_KEY`, keep the quotes and use `\\n` for line breaks.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
cv-builder/
├── app/
│   ├── api/           # API routes
│   │   ├── generate-pdf/
│   │   ├── generate-docx/
│   │   └── refine-content/
│   ├── auth/          # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/     # User dashboard
│   └── editor/[id]/   # CV editor
├── components/
│   ├── auth/          # Auth components
│   ├── editor/        # Form components
│   └── templates/     # CV templates
├── lib/
│   ├── firebase/      # Firebase configuration
│   └── utils.ts       # Utility functions
├── types/             # TypeScript types
└── hooks/             # Custom React hooks
```

## Usage

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Create CV**: Click "Create New CV" from dashboard
3. **Edit Content**: Fill in your personal info, experience, education, and skills
4. **AI Refinement**: Use the API at `/api/refine-content` to improve your content
5. **Export**: Download as PDF or Word document

## Features in Detail

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes with middleware
- Persistent user sessions

### CV Editor
- Auto-save functionality (1-second debounce)
- Form-based editing for all sections
- Live preview of your CV
- Add/remove/reorder entries

### Export Formats
- **PDF**: High-quality PDF with professional formatting
- **DOCX**: Microsoft Word compatible document
- **Naming**: Files automatically named with your full name

### AI Refinement
- Refine professional summaries
- Improve job descriptions
- Optimize skills lists
- Get tailored suggestions for target roles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add all environment variables in project settings
4. Deploy!

### Firebase Costs

Firebase offers a generous free tier:
- **Authentication**: Unlimited users
- **Firestore**: 1GB storage, 50K reads/day, 20K writes/day
- **Storage**: 5GB

Monitor usage in the Firebase Console.

## Troubleshooting

### Firebase Admin Error
- Ensure `FIREBASE_ADMIN_PRIVATE_KEY` has proper line breaks (`\\n`)
- Check that service account has proper permissions

### Gemini API Error
- Verify API key is correct
- Check API quota in Google AI Studio
- Ensure you're using `gemini-pro` model

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, Firebase, and Google Gemini AI
