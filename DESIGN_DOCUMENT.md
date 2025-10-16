# 📋 STUDY SPRINT MATCHER: DESIGN DOCUMENT

**Author:** Supriya Ashok Kumar Tiwari  
**Course:** CS 5610 Web Development (Fall 2025)  
**Date:** October 15, 2025

---

## 1. PROJECT DESCRIPTION

Study Sprint Matcher connects students for short, focused study sessions. Instead of coordinating complex study groups, students can create or join "sprints" in seconds.

### The Problem

It's 9 PM, you're stuck on a problem set, and you need someone to study with. Traditional study groups take too long to organize, and by the time everyone agrees on a time, the motivation is gone.

### Our Solution

• Create a study sprint in 30 seconds (subject, time, location)
• Browse what others are studying right now
• Join sessions that match your schedule (25 minutes to 2 hours)
• Study online or meet in person

### Why It Works

No scheduling. No long term commitment. Just find someone studying the same thing and get to work. Perfect for last minute exam prep or when you need accountability.

**Tech:** Node.js, Express, MongoDB, vanilla JavaScript

---

## 2. USER PERSONAS

### Sarah (20, CS Sophomore)

Sarah struggles with Calculus and learns better talking through problems. Big study groups become social hangouts instead of actual work.

**Needs:** Quick 45 minute sessions with people studying the same material.

**How we help:** Opens app at 8 PM, joins a Calc sprint for 30 minutes, gets homework done.

> "I don't need a study group. I just need someone for the next hour."

---

### Alex (24, Masters Student)

Alex hosts study sessions for his thesis group but hates coordinating schedules through endless group chats.

**Needs:** Easy way to organize recurring sprints and track who shows up.

**How we help:** Creates "Thesis Writing" sprints every Tuesday/Thursday. His group knows when to meet.

> "Organizing study sessions should be as easy as scheduling a Zoom."

---

### Carlos (28, Part Time Student)

Carlos works full time, takes evening classes, and commutes 30 minutes. He has exactly one hour after dinner to study.

**Needs:** Late night online study partners. Zero wasted time.

**How we help:** Finishes dinner at 8:30, finds an online Web Dev sprint from 8:45 to 9:30.

> "I've got one hour. I can't waste 20 minutes organizing."

---

## 3. USER STORIES

**Getting Started**

1. As a new student, I want to sign up with email and password so I can start in under a minute.
2. As a returning user, I want quick login so I'm not wasting study time.

**Creating Sprints** 3. As someone studying for an exam, I want to create a sprint with subject, duration (15 min to 2 hours), and location. 4. As someone who studies in person, I want to specify location like "Library Room 203." 5. As a night owl, I want to create late night sprints to find other night studiers.

**Finding Sprints** 6. As a Physics student, I want to search "Physics" so I'm not scrolling through other subjects. 7. As a commuter, I want to filter "online only" so I only see sprints I can attend. 8. As someone browsing, I want to see subject, creator, duration, and location instantly. 9. As a student who found a sprint, I want to click "Join" with no extra forms.

**Tracking** 10. As a motivated student, I want to see my weekly study hours. 11. As a sprint creator, I want to see all sprints I organized. 12. As a joiner, I want to see all sessions I committed to.

**Experience** 13. As a first visitor, I want to see active sprints immediately so I understand the app. 14. As a guest, I want login prompts when trying to join so I know accounts are required. 15. As a mobile user, I want the app to work on my phone.

---

## 4. DESIGN MOCKUPS & WIREFRAMES

### Homepage Wireframe

```
+----------------------------------------------------------+
|  [Home]  [Sprints]  [Login]  [Sign Up]      [Welcome X] |
+----------------------------------------------------------+
|                                                          |
|  +----------------+  +----------------+  +--------------+|
|  | Good Afternoon!|  |   Thursday     |  | CREATE       ||
|  |                |  |   Oct 13       |  | SPRINT       ||
|  | "Success is... |  |   2:30 PM      |  |              ||
|  |  the sum of... |  |                |  | Subject:     ||
|  |  small efforts"|  |                |  | [_________]  ||
|  |                |  |                |  | ○ Online     ||
|  +----------------+  +----------------+  | ○ Offline    ||
|                                          | Location:    ||
|                                          | [_________]  ||
|                                          | Hr Min Sec   ||
|                                          | [_][__][__]  ||
|                                          | [Start Sprint]|
|                                          +--------------+|
|                                                          |
|  MY SPRINTS                                              |
|  +-------------+  +-------------+  +-------------+       |
|  | Math        |  | Physics     |  | Web Dev     |       |
|  | 45 mins     |  | 30 mins     |  | 60 mins     |       |
|  | Online      |  | Library 101 |  | Online      |       |
|  | [Delete]    |  | [Delete]    |  |             |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
|  ACTIVE SPRINTS                                          |
|  +-------------+  +-------------+  +-------------+       |
|  | Calculus    |  | Biology     |  | History     |       |
|  | by Sarah    |  | by John     |  | by Maya     |       |
|  | 25 mins     |  | 45 mins     |  | 30 mins     |       |
|  | 🌐 Online   |  | 📍 Cafe     |  | 🌐 Online   |       |
|  | [Join]      |  | [Join]      |  | [Join]      |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
|  [View All Sprints →]                                    |
+----------------------------------------------------------+
```

**Visual Design:**
• Background: Warm beige (#F5F1E8)
• Cards: White with subtle shadow, 8px rounded corners
• Text: Dark brown (#2C1810)
• Buttons: Brown (#6B5D52) with hover effect
• Accent: Muted gold (#8B6F47)

---

### Browse Sprints Page Wireframe

```
+----------------------------------------------------------+
|  [Home]  [Sprints]  [Login]  [Sign Up]      [Welcome X] |
+----------------------------------------------------------+
|                                                          |
|  Browse Study Sprints                                    |
|                                                          |
|  +----------------------------------------------------+  |
|  | Subject: [__________] Location: [All ▾] [Search]  |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +-------------+  +-------------+  +-------------+       |
|  | Web Dev     |  | Math        |  | Physics     |       |
|  | by Sarah    |  | by Alex     |  | by Maya     |       |
|  | 45 mins     |  | 30 mins     |  | 60 mins     |       |
|  | 🌐 Online   |  | 📍 Lib 101  |  | 🌐 Online   |       |
|  | [Join]      |  | [Join]      |  | [Join]      |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
|  +-------------+  +-------------+  +-------------+       |
|  | Chemistry   |  | Calculus    |  | Biology     |       |
|  | by John     |  | by Lisa     |  | by Tom      |       |
|  | 40 mins     |  | 25 mins     |  | 50 mins     |       |
|  | 📍 Library  |  | 🌐 Online   |  | 📍 Study Rm |       |
|  | [Join]      |  | [Join]      |  | [Join]      |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
+----------------------------------------------------------+
```

**Layout Notes:**
• Grid adjusts: 3 columns desktop, 2 tablet, 1 mobile
• Filter bar sticky on scroll
• Cards have consistent height for clean alignment

---

### Login Page Wireframe

```
+----------------------------------------------------------+
|                                                          |
|                  STUDY SPRINT MATCHER                    |
|                                                          |
|                                                          |
|              +---------------------------+               |
|              |                           |               |
|              |    Welcome Back           |               |
|              |    Login to continue      |               |
|              |                           |               |
|              |  Email                    |               |
|              |  [___________________]    |               |
|              |                           |               |
|              |  Password                 |               |
|              |  [___________________]    |               |
|              |                           |               |
|              |  [       Login       ]    |               |
|              |                           |               |
|              |  Don't have an account?   |               |
|              |  [Sign up]                |               |
|              |                           |               |
|              +---------------------------+               |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

---

### Signup Page Wireframe

```
+----------------------------------------------------------+
|                                                          |
|                  STUDY SPRINT MATCHER                    |
|                                                          |
|                                                          |
|              +---------------------------+               |
|              |                           |               |
|              |    Welcome                |               |
|              |    Create your account    |               |
|              |                           |               |
|              |  Full Name                |               |
|              |  [___________________]    |               |
|              |                           |               |
|              |  Email                    |               |
|              |  [___________________]    |               |
|              |                           |               |
|              |  Password                 |               |
|              |  [___________________]    |               |
|              |                           |               |
|              |  [      Sign Up      ]    |               |
|              |                           |               |
|              |  Already have an account? |               |
|              |  [Login]                  |               |
|              |                           |               |
|              +---------------------------+               |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

**Form Design:**
• Centered card with max width 400px
• Large input fields for easy tapping on mobile
• Clear labels above each field
• Primary button spans full card width
• Link to alternate page at bottom

---

## 5. USER FLOWS

**New User Creating Sprint:**
Homepage → Sign Up → Fill form → Homepage (logged in) → Fill create sprint form → Submit → See in "My Sprints"

**User Joining Sprint:**
Homepage → Login → View All Sprints → Search/Filter → Find sprint → Join → See in "My Sprints"

**Guest Discovering:**
Homepage → See sprints → Try to join → Login prompt → Login → Return → Join sprint

---

## 6. TECHNICAL ARCHITECTURE

**Frontend:**

```
index.html, sprints.html, login.html, signup.html
css/main.css
js/main.js, js/auth.js
```

**Backend:**

```
server.js (Express setup)
db.js (MongoDB connection)
seed.js (1000+ records)
routes/sprints.js, routes/auth.js
```

**Database:**
• Users: name, email, password (hashed), createdAt
• Sprints: username, userId, subject, location, locationDetails, duration, participants[], createdAt

**API Endpoints:**
• POST /api/auth/signup, /api/auth/login
• GET /api/sprints, /api/sprints/my/:userId
• POST /api/sprints, /api/sprints/:id/join
• DELETE /api/sprints/:id

---

## 7. KEY FEATURES

✅ Create sprint in under 30 seconds
✅ Browse 1000+ sprints with search/filter
✅ Online or in person options
✅ Track study hours and history
✅ Minimalist design (no distractions)

**Different from competitors:** Focuses on immediate needs ("who's studying Physics right now?") instead of long term planning.

---

## 8. SUCCESS METRICS

• Students create multiple sprints per week
• 60%+ of sprints get joined
• Users return 3+ times per week
• Create sprint under 45 seconds
• Find and join sprint under 90 seconds

---

## 9. FUTURE ENHANCEMENTS

**Phase 2:** In sprint chat, calendar sync, study streaks, join notifications

**Phase 3:** Video integration, analytics dashboard, AI matching, course integration

---

## 10. ACCESSIBILITY

• Semantic HTML (header, nav, main, section)
• Full keyboard navigation
• WCAG AA color contrast
• Label on every input
• Responsive (mobile to desktop)
• Clear error messages

---

## 11. CONCLUSION

Study Sprint Matcher solves one problem really well: finding someone to study with right now. No complex scheduling, no semester commitments. Just quick, focused sessions when you need them.

Built on Node.js, Express, and MongoDB with clean UI. Designed for speed: 30 seconds to create, 90 seconds to find and join. The 1000+ seeded records make it feel active from day one.

Simple. Fast. Actually useful.
