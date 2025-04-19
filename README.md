# GitHub Insights Dashboard

A dashboard for visualizing GitHub repository insights and statistics.

<img width="1800" alt="Screenshot 2025-04-18 at 16 02 09" src="https://github.com/user-attachments/assets/4c163db1-a6aa-471f-997c-154aefb7b713" />


## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- React Query (optional) for data fetching

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Docker Deployment

You can also run this application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t gh-insights-dashboard .
   ```

2. Run the Docker container:
   ```bash
   # Run on port 3000 (default)
   docker run -p 3000:3000 gh-insights-dashboard
   
   # Or use a different port if 3000 is already in use
   docker run -p 3001:3000 gh-insights-dashboard
   ```

3. Access the application in your browser:
   - If using default port: [http://localhost:3000](http://localhost:3000)
   - If using alternative port: [http://localhost:3001](http://localhost:3001)

## Project Structure

```
frontend/
├── components/      # Reusable UI components
│   ├── Card.tsx     # Card component for displaying stats
│   └── Chart.tsx    # Chart component for data visualization
├── pages/           # Next.js pages
│   ├── _app.tsx     # Custom App component
│   └── index.tsx    # Homepage
├── styles/          # Global styles
│   └── globals.css  # Tailwind CSS imports
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Code Refactoring

The codebase has undergone significant refactoring to improve code quality, maintainability, and adherence to modern React patterns:

1. **API Client Refactoring**
   - Created a proper API client with consistent error handling
   - Added strongly typed responses and error classes
   - Reduced code duplication in API endpoints

2. **React Hooks & Component Structure**
   - Created custom hooks (useGitHubData) to separate data fetching logic from UI
   - Implemented proper TypeScript types and interfaces
   - Better state management with React context

3. **Component Architecture**
   - Extracted reusable components (Alert, Layout, RepoSearch)
   - Better component composition patterns
   - Improved prop typing with TypeScript

4. **Error Handling**
   - More consistent error handling throughout the application
   - Better user-facing error messages
   - Added proper error typing

5. **Theme System**
   - Centralized theme management via context
   - Components are properly integrated with the theme system
   - Improved dark/light mode transitions

These improvements enhance the maintainability, readability, and scalability of the codebase while maintaining all existing functionality. 
