# Viridian Blue

Welcome to the repository for my personal portfolio website, live at [viridianblue.com](https://www.viridianblue.com/). This project was just me having fun.

---

## 🛠️ Tech Stack

This project was built from the ground up using a modern web development stack:

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [SCSS/Sass](https://sass-lang.com/)
- **Backend (Contact Form)**: [Nodemailer](https://nodemailer.com/) running in a serverless function.
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation & Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/sebastian-ederer/viridianblue-website.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd viridianblue-website
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  To run the contact form locally, you'll need to set up your own email credentials. Create a `.env` file in the root of the project and add your variables:
    ```.env
    EMAIL_USER="your-email@example.com"
    EMAIL_PASS="your-email-app-password"
    ```

### Development

Start the development server. By default, it runs on `http://localhost:5177`.

```bash
npm run dev
```
