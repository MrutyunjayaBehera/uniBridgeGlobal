# UniBridge Global

**Connect ambitious students with world-class universities.**

UniBridge Global is a modern platform that bridges the gap between international students and educational institutions. Students can explore and apply to partner universities, while universities can onboard themselves, manage programs, and track applicants—all in one unified ecosystem.

## Features

### For Students
- 🌍 **Explore Universities**: Browse global partner institutions with detailed information about programs, tuition, and acceptance rates
- 🔍 **Smart Search & Filter**: Find universities by country, program, or keyword
- 📱 **Student Dashboard**: Track applications and view personalized recommendations
- 🔐 **Google OAuth Sign-In**: Quick and secure authentication with Google

### For Universities
- 📝 **Self-Onboarding**: Register institutions, add programs, and set admission requirements
- 💼 **Partner Management**: Manage academic programs, tuition, scholarships, and contact information
- 📊 **Applicant Dashboard**: View and manage student applications in real-time
- 🔑 **Email/Password Authentication**: Secure university account management

### Technical Highlights
- ⚡ **Vite + React**: Fast, modern frontend with hot module reloading
- 🗄️ **Supabase**: PostgreSQL database with real-time capabilities and Row-Level Security
- 🎨 **Tailwind CSS**: Responsive, utility-first styling
- 🔐 **Secure Auth**: Supabase Auth with OAuth2 (Google) and email/password flows
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

---

## Local Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- A **Supabase account** - [Sign up for free](https://supabase.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/MrutyunjayaBehera/uniBridgeGlobal.git
cd uniBridgeOriginal
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including React, Vite, Supabase client, and styling libraries.

### Step 3: Set Up Supabase Project

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com) and sign in
   - Click "New Project"
   - Enter a project name, password, and region
   - Wait for the project to be created (~2 minutes)

2. **Get Your Credentials**
   - Go to **Settings → API** (in the left sidebar)
   - Copy your `Project URL` (VITE_SUPABASE_URL)
   - Copy your `anon public` key (VITE_SUPABASE_ANON_KEY)

3. **Set Up Database Tables**
   - Go to the **SQL Editor** in your Supabase project
   - Create the required tables by running the SQL migrations:


### Step 4: Configure Environment Variables

1. **Create a `.env` file** in the root directory:

```bash
touch .env
```

2. **Add your Supabase credentials:**

```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-url` and `your-anon-key-here` with the values you copied from Supabase.

### Step 5: Configure Google OAuth (Optional but Recommended)

To enable Google sign-in for students, follow these detailed steps:

#### 5.1: Create a Google OAuth Client ID

1. **Go to Google Cloud Console**
   - Open [console.cloud.google.com](https://console.cloud.google.com)
   - Sign in with your Google account

2. **Create a New Project**
   - Click the **Project** dropdown at the top
   - Click **NEW PROJECT**
   - Enter project name (e.g., "UniBridge Global")
   - Click **CREATE**
   - Wait for the project to be created

3. **Enable Google+ API**
   - Go to **APIs & Services → Library** (left sidebar)
   - Search for **Google+ API**
   - Click on it and press **ENABLE**

4. **Create OAuth 2.0 Credentials**
   - Go to **APIs & Services → Credentials** (left sidebar)
   - Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
   - If prompted to create an OAuth consent screen first:
     - Click **CONFIGURE CONSENT SCREEN**
     - Choose **External** (for personal use)
     - Click **CREATE**
     - Fill in:
       - **App name**: UniBridge Global
       - **User support email**: your-email@gmail.com
       - **Developer contact**: your-email@gmail.com
     - Click **SAVE AND CONTINUE** through all screens
     - Skip optional scopes, click through to finish

5. **Get Your OAuth 2.0 Client ID**
   - Go back to **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
   - Select **Web application**
   - Under **Authorized redirect URIs**, add:
     ```
     http://localhost:3000/auth/callback
     http://localhost:3001/auth/callback
     https://your-project.supabase.co/auth/v1/callback
     ```
     (Replace `your-project` with your Supabase project name from the URL)
   - Click **CREATE**
   - A dialog appears with your **Client ID** and **Client Secret**
   - Copy both values somewhere safe (you'll need them in Step 5.2)

#### 5.2: Add Google OAuth to Supabase

1. **In your Supabase Project Dashboard:**
   - Go to **Authentication → Providers** (left sidebar)
   - Find **Google** in the provider list
   - Click on **Google** to expand it

2. **Enable Google Provider**
   - Toggle **Enable Sign-in with Google** to ON
   - Paste your **Google Client ID** in the "Client ID" field
   - Paste your **Google Client Secret** in the "Client Secret" field
   - Click **SAVE**

3. **Add Callback URLs to Supabase**
   - Still in **Authentication**, click **URL Configuration** (left sidebar)
   - Under **Redirect URLs**, add these URLs:
     ```
     http://localhost:3000
     http://localhost:3001
     https://your-app.vercel.app
     ```
   - Click **Save** (each URL needs to be added individually)

#### 5.3: Add Google Callback URLs to Google Cloud Console

1. **Go back to Google Cloud Console**
   - Navigate to **APIs & Services → Credentials**
   - Find your OAuth 2.0 Client ID (Web application)
   - Click the **pencil icon** (Edit)

2. **Add Supabase Callback URLs**
   - Under **Authorized redirect URIs**, add:
     ```
     https://your-project.supabase.co/auth/v1/callback
     ```
     (Replace `your-project` with your actual Supabase project name)
   - You can remove the `localhost` URIs if you only want production access, or keep them for local testing
   - Click **SAVE**

#### 5.4: Test Google OAuth Locally

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to the app** at `http://localhost:3000`

3. **Click "Sign in with Google"**
   - You should see the Google login popup
   - After signing in, you should be redirected back to the app

If you get a redirect loop or error, check:
- Your Supabase callback URL includes `/auth/v1/callback`
- Your Google Client ID and Secret are correct in Supabase
- Your redirect URIs in Google Cloud match those in Supabase

### Step 6: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v6.x.x ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

Open your browser and navigate to **http://localhost:3000**

### Step 7: Test the Application

#### As a Student:
1. Click **"Sign in with Google"** on the Home page
2. Go to **Explore** to browse universities
3. Visit **StudentDashboard** after signing in

#### As a University:
1. Click **"Sign up as University"** on the Login page
2. Register with an email and password
3. Go to **Partner Onboarding** to register your institution
4. Access the **UniversityDashboard** to view applicants

---

## Project Structure

```
unibridgeOriginal/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # React Context (Auth, global state)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components (routes)
│   ├── services/            # Supabase client setup
│   ├── styles/              # CSS files
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app component
│   ├── index.jsx            # React entry point
│   └── constants.js         # App constants (mock data)
├── .env                     # Environment variables (not committed)
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

---

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module reloading on `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory

### Preview Production Build Locally
```bash
npm run preview
```
Serves the production build locally to test before deploying

---

## Troubleshooting

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution:** Run `npm install` to ensure all dependencies are installed

### Issue: "VITE_SUPABASE_URL is undefined"
**Solution:** 
- Check that your `.env` file exists in the root directory
- Ensure the environment variables are correctly set
- Restart the development server after adding/updating `.env`

### Issue: OAuth redirect goes to localhost instead of production
**Solution:**
- Add your production domain to Supabase **Authentication → URL Configuration**
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly on Vercel

### Issue: "Row-level security (RLS) denied this operation"
**Solution:**
- Check that RLS policies allow anonymous users to read public data
- Or disable RLS for public tables during development

### Port 3000 Already in Use
**Solution:** The dev server will automatically use port 3001, or kill the process using port 3000:
```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and select this repository
   - Vercel will auto-detect Vite configuration

3. **Add Environment Variables:**
   - In Vercel project settings, go to **Environment Variables**
   - Add:
     ```
     VITE_SUPABASE_URL=https://your-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```

4. **Update Supabase Redirect URLs:**
   - Go to Supabase → Authentication → URL Configuration
   - Add your Vercel production domain (e.g., `https://unibridge.vercel.app`)

5. **Deploy:**
   - Click "Deploy" in Vercel and wait for build to complete

---

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **Supabase** | Backend, database, auth |
| **Tailwind CSS** | Styling |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |

---

## API & Database Schema

### Main Tables

1. **institutions** - University/institution information
2. **programs** - Academic programs offered by institutions
3. **admissions** - Admission requirements per program
4. **financials** - Tuition and scholarship information
5. **contacts** - Contact verification for institutions
6. **profiles** - User role management (student/university)

For detailed schema, see the SQL migrations in Step 3 of setup.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/MrutyunjayaBehera/uniBridgeGlobal/issues)
- Contact the maintainer: [MrutyunjayaBehera](https://github.com/MrutyunjayaBehera)

---

## Acknowledgments

- **Supabase** - Backend and authentication infrastructure
- **Vercel** - Hosting and deployment
- **React Community** - Amazing tools and libraries
- **Open Source Contributors** - Making development easier for everyone

---

**Happy coding! 🚀**

Last updated: November 26, 2025
