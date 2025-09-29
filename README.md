💻 Bow Course Registration System - Phase 1: Frontend Development
Project Overview
This repository contains the Frontend component (Assignment 1) of the Bow Course Registration Full-Stack Web Application.

The goal of this phase was to design and build a fully functional, React-based user interface using best practices for modern web architecture, UI/UX, and component-based design.

Note: This is a purely visual and interactive frontend. All application data (users, programs, and courses) are stored locally within the application's state/mock data structures, as per the assignment requirements. The actual backend integration (Node.js/Database) is addressed in subsequent project phases.

✨ Key Features & User Flows
This frontend is capable of handling the following core interactions, demonstrating comprehensive state management:

Public Access (Non-User)
Program & Course Browsing: Visitors can view all available academic programs (Diploma, Post-Diploma, Certificate) and courses offered across all terms (Spring, Summer, Fall, Winter).

Sign-Up Form: A complete sign-up workflow for creating new student accounts (data is stored in the mock state).

Student Features
Dashboard & Profile View: Displays mock student information and enrollment status.

Interactive Registration: Students can select a term and then use the interface to register for 2-5 courses without registering for the same course twice in the same term.

Dynamic Search: Search for courses by name or course code.

Contact Form: Submission component for sending mock messages to an administrator.

🛠️ Technology Stack
Component

Technology

Description

Frontend

React.js

Built using functional components and Hooks for efficient state management.

Used to create a clean, responsive, and professional user interface.

Data Source

JavaScript Arrays/Objects

All student, course, and program data is hosted in local mock data structures.

🚀 Getting Started (Run Locally)
Follow these steps to set up and run the frontend on your local machine.

Prerequisites
Node.js (which includes npm)

Install Dependencies:

npm install

Start the Application:

npm start

The application will launch in your default web browser, usually at http://localhost:3000.

🎨 Design & Structure
The project follows a standard React directory structure. Key areas include:

src/components: Reusable UI elements (e.g., buttons, cards, navigation).

src/pages: Top-level components representing distinct application views (e.g., SignupPage.js, Dashboard.js).

src/data: Contains the mock data files for courses, programs, and initial student records.

Next Steps: This project is designed to be fully integrated with a Node.js/Database backend in the subsequent project phases.
