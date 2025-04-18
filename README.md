# GitHub Insights Dashboard

A dashboard for visualizing GitHub repository insights and statistics.

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