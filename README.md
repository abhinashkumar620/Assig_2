# TikTok Ads Creative Flow (Frontend Assignment)

This is a frontend-only React application that simulates a TikTok Ads OAuth flow and allows users to create ad creatives after authentication.

---

## 🚀 Live Flow Overview

1. User lands on Home page
2. Clicks **Connect TikTok Ads Account**
3. OAuth flow is simulated (mocked)
4. Access token is stored in `localStorage`
5. User is redirected to Create Ad form
6. Protected route prevents unauthenticated access
7. User can logout anytime

---

## 🔐 OAuth Implementation (Mocked)

- TikTok OAuth is **simulated on the frontend**
- On successful authentication:
  - A mock access token is generated
  - Token is stored in `localStorage`
- Redirects user to protected route `/create-ad`

> ⚠️ Note:  
> In real production apps, OAuth token exchange should be handled on the backend to protect client secrets.  
> This assignment uses a mocked OAuth flow due to frontend-only constraints.

---

## 🛡️ Protected Routes

- The **Create Ad page** (`/create-ad`) is protected
- If no token is found in `localStorage`:
  - User is redirected to Home
  - Error toast is shown

---

## 🧾 Create Ad Form Features

- Company Name
- Campaign Objective (Traffic / Conversions)
- Ad Text (max 100 characters)
- Call To Action
- Music Selection:
  - Existing Music ID
  - Upload Music
  - No Music (restricted for conversions)
- Form validation with error messages
- Dynamic Ad Preview
- Submitted data shown as JSON response

---

## 🔔 User Feedback (UX)

- Toast notifications are used for:
  - OAuth redirect
  - Successful login
  - Form validation errors
  - Ad creation success
  - Logout action
  - Unauthorized access

---

## 🗂️ Folder Structure

src/
│
├── components/
│ ├── Home.jsx # Landing page & OAuth start
│ ├── Auth.jsx # Mock OAuth callback & token storage
│ └── ContectForm.jsx # Protected ad creation form
│
├── img/
│ └── image.jpeg # Demo product image
│
├── App.jsx # App routing
├── main.jsx # React entry point
└── index.css # Global styles

---

## 🧰 Tech Stack

- React
- React Router DOM
- Tailwind CSS
- React Toastify
- Ant Design
- React Icons

---

## 💾 Session Handling

- OAuth token is stored in browser `localStorage`
- Logout clears token and redirects to Home
- Works correctly on Vercel or any static hosting

---

## ✅ Deployment

- Fully frontend-based
- No backend dependency
- Safe to deploy on Vercel

---

## 📌 Summary

This project demonstrates:

- OAuth flow understanding
- Route protection
- State management
- Form validation
- Clean UI & UX feedback
- Frontend architecture best practices
