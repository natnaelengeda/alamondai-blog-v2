# Alamondai Blog

## Project Description

This is the official blog application for Alamondai, built using Next.js. It provides a platform for publishing and reading blog posts, user authentication, and profile management.

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd alamondai-blog
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

Key directories and their purposes:

-   `src/api`: API service definitions for interacting with backend endpoints.
-   `src/app`: Next.js App Router pages, layouts, and global styles.
-   `src/assets`: Static assets like images and icons.
-   `src/components`: Reusable UI components.
-   `src/core`: Core application utilities or configurations.
-   `src/lib`: Utility functions and Firebase configuration.
-   `src/meta`: Metadata for SEO and application configuration.
-   `src/state`: Zustand store definitions for global state management.
-   `src/styles`: Global CSS and module-specific styles.
-   `src/template`: Email templates.
-   `src/types`: TypeScript type definitions.
-   `src/utils`: Various utility functions.
-   `public`: Static files served directly by Next.js.

## Technologies and Tools Used

-   **Next.js**: React framework for building full-stack web applications.
-   **React**: JavaScript library for building user interfaces.
-   **TypeScript**: Superset of JavaScript that adds static typing.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **ESLint**: Pluggable linting utility for JavaScript and JSX.
-   **Firebase**: Backend services for authentication and database.
-   **Axios**: Promise-based HTTP client for the browser and Node.js.
-   **Zustand**: Small, fast, and scalable bearbones state-management solution.
-   **Quill**: Rich text editor (used in `src/app/blog/write/components/CustomQuill.tsx`).

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Author

-   [@natnaelengeda](https://natnaelengeda.tech)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.