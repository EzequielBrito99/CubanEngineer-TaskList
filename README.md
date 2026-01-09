# 🚀 React + Vite Professional Boilerplate

This project is a technical assessment for a **Mid-level Frontend Engineer** role. It is built with a focus on **scalability, maintainability, and performance**, implementing a full CI/CD pipeline and rigorous quality standards.

---

## 🛠️ Tech Stack

* **Core:** [React 19](https://reactjs.org/) + [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode).
* **Build Tool:** [Vite 7](https://vitejs.dev/) (Lightning CSS engine).
* **Package Manager:** [pnpm](https://pnpm.io/) (for efficiency and speed).
* **Styling & UI:** 
    * [Tailwind CSS v4](https://tailwindcss.com/) (Next-gen CSS-first engine).
    * [shadcn/ui](https://ui.shadcn.com/) (Accessible headless components via Radix UI).
    * [Lucide React](https://lucide.dev/) (Icon set).
* **Code Quality:** 
    * [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/) (Conventional Commits).
    * [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/).
* **Testing:**
    * **Unit Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
    * **E2E Testing:** [Playwright](https://playwright.dev/).
* **CI/CD:** [GitHub Actions](https://github.com/features/actions).
* **Performance:** [Lighthouse CI](https://github.com/treosh/lighthouse-ci-action).

---

## 🎨 Styling & UI System

The project leverages a **Utility-First** approach combined with highly accessible components to ensure a consistent, high-performance interface.

* **Tailwind CSS v4:** Implementation of the latest Tailwind engine utilizing **Lightning CSS** for ultra-fast processing and zero-runtime overhead.
    * Native integration via the `@tailwindcss/vite` plugin.
    * Modern configuration using `@import "tailwindcss";` in the main CSS entry point.
* **shadcn/ui:** Component system built on top of **Radix UI**, ensuring the application is 100% accessible and compliant with WAI-ARIA standards.
    * Components are "owned," allowing full source-code customization without the constraints of traditional external UI libraries.
* **Responsive Design:** Native *Mobile-First* strategy implemented through Tailwind's modern engine.

---

## ⚙️ Getting Started

To run the project locally, ensure you have **Node.js 20+** and **pnpm** installed.

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Install Playwright Browsers:**
    ```bash
    pnpm exec playwright install
    ```
3.  **Setup Git Hooks:**
    ```bash
    pnpm prepare
    ```
4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

---

## 🧪 Testing Strategy

The project follows the testing pyramid to ensure software stability:

* **Unit Tests:** Handled by Vitest, located in `tests/unit/`.
    ```bash
    pnpm run test:unit
    ```
* **E2E Tests:** Validating real-world user flows using Playwright in `tests/e2e/`.
    ```bash
    pnpm run test:e2e
    ```

---

## 🚀 CI/CD Pipeline

The continuous integration workflow defined in `.github/workflows/main.yml` ensures code quality on every `Push` or `Pull Request`:

1.  **Setup:** pnpm caching enabled for ultra-fast installations.
2.  **Linting & Type Checking:** Strict validation to ensure code integrity.
3.  **Test Execution:** Running both unit and E2E suites in a headless environment.
4.  **Production Build:** Generating optimized assets via Vite + Lightning CSS.
5.  **Lighthouse Audit:** The pipeline will **automatically fail** if the production build scores below **85%** in key metrics: Performance, Accessibility, Best Practices, and SEO.

---

## 📋 Commit Standards

To maintain a clean and readable history, **Commitlint** is enforced. Messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:
`<type>(scope?): description`

* `feat`: A new feature.
* `fix`: A bug fix.
* `docs`: Documentation only changes.
* `refactor`: A code change that neither fixes a bug nor adds a feature.
* `test`: Adding missing tests or correcting existing tests.

---

> **Note for the reviewer:** This setup prioritizes a modern, strict TypeScript configuration and automation tools to minimize technical debt and ensure a reliable continuous deployment cycle.