# Google Forms Lite Clone

This project is a simplified clone of Google Forms, built as a monorepo using `pnpm` workspaces. It features a React-based front-end and a Node.js/GraphQL back-end.

## Features

- **Form Creation:** Create new forms with various question types (Text, Multiple Choice, Checkboxes, Date).
- **Form Filling:** View and submit responses to existing forms.
- **Responses View:** View all submitted responses for a specific form.
- **Data Persistence:** In-memory data store through a simple GraphQL server.

## Technologies Used

### Front-End (`client`)

- [React](https://react.dev/) (via [React Router v7](https://reactrouter.com/))
- TypeScript
- [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query for state management and data fetching
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- GraphQL Codegen for fully typed API hooks
- [Vite](https://vitejs.dev/)

### Back-End (`server`)

- Node.js
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- GraphQL
- In-memory JS array and maps data storage

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v20+ recommended)
- **pnpm** (v9+ recommended)

> Note: The project specifies `pnpm` for managing workspace dependencies. If you don't have it installed, you can enable it via corepack: `corepack enable pnpm` or install it globally `npm install -g pnpm`.

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd tenthousand-task
    ```

2. **Install all dependencies:**
   From the root of the project, run:
    ```bash
    pnpm install
    ```
    This will install dependencies for both the `client` and `server` packages simultaneously.

### Running the Project Locally

The project is pre-configured to run both the client and server concurrently using a single command from the root directory.

1. **Start the development servers:**

    ```bash
    pnpm run dev
    ```

2. **Access the applications:**
    - **Front-End (Client):** Open your browser and navigate to [http://localhost:5173](http://localhost:5173)
    - **GraphQL API (Server/Playground):** Available at [http://localhost:4000/](http://localhost:4000/)

### Running in Production

To build the application for a production environment and preview the optimized build locally, follow these steps:

1. **Build the project:**
   Compile both the client and server code by running:

    ```bash
    pnpm run build
    ```

2. **Start the servers:**
   Open two terminal windows (or use a background manager):
    - **Terminal 1 (Server):**
        ```bash
        pnpm run start:server
        ```
    - **Terminal 2 (Client Preview):**
        ```bash
        pnpm run start:client
        ```

    The client preview will usually be available at [http://localhost:4173](http://localhost:4173), and the server will be running normally at [http://localhost:4000](http://localhost:4000).

### Generating GraphQL Types (Optional)

If you modify the GraphQL schema (`server/src/graphql/schema.graphql`) or client operations (`.graphql` files), you will need to re-generate the TypeScript types and RTK hooks.

To run codegen for both packages:

```bash
pnpm --filter client run codegen
pnpm --filter server run codegen
```
