# Owkin UI

## Overview

This project is a draft version of a React application built with Vite, Redux Toolkit, and TailwindCSS. The goal was to create a functional, responsive web application utilizing modern development tools and practices. The application allows users to upload files, add filters and view them in a grid. The application is not fully functional and is missing some features.

## Technology Stack

- **React**: For its component-based architecture.
- **Vite**: As a fast and efficient build tool.
- **Redux Toolkit**: For efficient state management.
- **TailwindCSS**: For its utility-first approach to styling.


## With More Time
- **Change "Loading" to percentage**: It's not difficult to implement (onUploadProgress in axios), but I encountered a CORS issue in the process. Simple solutions didn't help and I decided not to spend a lot of time on it.
- **Add more features**: For better mobile user experience need to add modal windows for full view. Also, need to add drag and drop functionality to make it easier to add files.
- **Accessibility Improvements**: Ensuring compliance with WCAG guidelines.


## Run frontend 

```bash
cd ui
npm install
npm run dev
```
## Run BE 
Instruction in README.md in server folder