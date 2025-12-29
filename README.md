# Control Room - Frontend

## 📖 Project Overview
Control Room is the client-side interface for the Mini User Management System built for the Purple Merit Technologies assessment. It provides a responsive interface for users to manage their profiles and for administrators to manage user access via a centralized dashboard.

**Live Deployment:** [Insert Vercel/Netlify Link Here]
**Walkthrough Video:** [Insert Video Link Here]

## 🚀 Tech Stack
* **Framework:** React.js (Hooks)
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling:** CSS Modules / Tailwind CSS
* **Deployment:** Vercel / Netlify

## ✨ Features
* **Authentication:**
    * Login & Signup forms with client-side validation (Email format, Password strength).
    * Redirects based on authentication status.
* **Admin Dashboard:**
    * Tabular view of all users with columns: Email, Full Name, Role, Status, Actions.
    * **Pagination:** Displays 10 users per page.
    * **User Management:** Activate/Deactivate users with confirmation dialogs.
* **User Profile:**
    * View and edit Full Name and Email.
    * Change Password functionality.
* **Role-Based Access Control (RBAC):**
    * Protected routes ensuring only Admins can access the dashboard.
    * User-specific navigation.

## 🛠️ Setup Instructions

### 1. Prerequisites
* Node.js (v18+)
* npm

### 2. Installation
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### 3. Environment Variables
Create a `.env` file in the `frontend` root. **Do not include actual values in the repository.**

```env
VITE_API_BASE_URL=  # URL of the deployed backend (e.g., [https://your-backend.onrender.com/api/v1](https://your-backend.onrender.com/api/v1))
