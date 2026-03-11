# MindBridge: Mental Health Navigator

MindBridge is a comprehensive AI-powered mental health platform designed to provide accessible, personalized support and resources. It combines modern web technologies with advanced AI to guide users through their mental wellness journey.

## 🏗️ Architecture

The project is built with a decoupled architecture, separating the concerns of the user interface and the core business logic/data management.

-   **Frontend**: A high-performance, interactive web application built with [Next.js](https://nextjs.org/).
-   **Backend**: A robust REST API built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/), managing authentication, AI integrations, and data persistence.
-   **Database**: Managed through [Prisima ORM](https://www.prisma.io/), providing type-safe database access and migrations.

## 🚀 Key Technologies

### Frontend
-   **Framework**: Next.js 15+ (App Router)
-   **Library**: React 19
-   **Styling**: Tailwind CSS 4
-   **Animations**: Framer Motion & Three.js (for immersive 3D elements)
-   **Components**: Radix UI & Lucide Icons
-   **Authentication**: Next-Auth & Google OAuth
-   **State/Data**: Firebase Integration

### Backend
-   **Environment**: Node.js & TypeScript
-   **Web Framework**: Express.js
-   **Database ORM**: Prisma
-   **Authentication**: JWT (JSON Web Tokens) & Bcryptjs
-   **AI Integration**: Google Generative AI (Gemini Pro)
-   **Utilities**: Nodemailer (emails), Multer (file uploads)

---

## 🛠️ Getting Started

### Prerequisites
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A database instance (PostgreSQL/MySQL recommended for Prisma)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd MindBridge-Mental-Health-Navigator-Project
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory and the `server` directory based on the provided examples (if available) or existing configurations.

3.  **Unified Development (Recommended)**:
    ```bash
    # Install all dependencies (root and server)
    npm install
    cd server && npm install && cd ..
    
    # Run both frontend and backend concurrently
    npm run dev:all
    ```
    The frontend will be at `http://localhost:3000` and backend API at `http://localhost:5000`.

4.  **Individual Setup (Manual)**:
    - **Frontend**: `npm run dev`
    - **Backend**: `cd server && npm run dev`

---

## 📂 Project Structure

```text
.
├── src/                # Frontend source code (Next.js)
│   ├── app/            # App Router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Shared utilities and configurations
├── server/             # Backend source code (Express.js)
│   ├── src/            # TypeScript source files
│   │   ├── controllers/# Request handlers
│   │   ├── routes/     # API route definitions
│   │   ├── middleware/ # Custom Express middleware
│   │   └── lib/        # Backend-specific utilities
│   └── prisma/         # Database schema and migrations
├── public/             # Static assets
└── prisma/             # Root-level prisma config (if applicable)
```
