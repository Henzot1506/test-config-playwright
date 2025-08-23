# Demo Web Shop Automation Tests

This project is a test automation framework for the [Demo Web Shop](https://demowebshop.tricentis.com/) using **Playwright** with **TypeScript** and **Cucumber** for Behavior-Driven Development (BDD). It includes test cases to verify core functionalities like page title, newsletter subscription, and featured products.

## Prerequisites

To run this project, ensure you have the following installed:
- **Node.js** (version 16 or higher): [Download Node.js](https://nodejs.org/)
- **Git** (optional, for cloning the repository): [Download Git](https://git-scm.com/)

## Project Structure

```
demowebshop-tests/
├── features/                    # Cucumber feature files and step definitions
│   ├── step_definitions/
│   │   └── steps.ts            # Step definitions for Gherkin scenarios
│   ├── feature_files/          # Gherkin feature file with test scenarios
│       └── demo_web_shop.feature   
├── tests/                      # Playwright test files (non-BDD)
│   └── example.spec.ts         # Example Playwright test cases
├── cucumber.js                 # Cucumber configuration file
├── playwright.config.ts        # Playwright configuration file
├── tsconfig.json               # TypeScript configuration
├── package.json                # Node.js dependencies and scripts
├── cucumber-report.html        # Generated Cucumber HTML report
└── node_modules/               # Node.js dependencies
```

## Setup Instructions

1. **Clone or Create the Project**
   - If cloning from a repository:
     ```bash
     git clone <repository-url>
     cd demowebshop-tests
     ```
   - Or create manually using the command:
     ```bash
     mkdir demowebshop-tests && cd demowebshop-tests && npm init -y && npm install --save-dev playwright @playwright/test typescript ts-node @types/node @cucumber/cucumber @cucumber/messages && npx tsc --init --target es2020 --module nodenext --rootDir ./ --outDir ./dist && mkdir tests features features/step_definitions && echo > tests/example.spec.ts && echo > features/demo_web_shop.feature && echo > features/step_definitions/steps.ts && echo > playwright.config.ts && echo > cucumber.js
     ```

2. **Install Dependencies**
   - Run the following command to install all required packages:
     ```bash
     npm install
     ```

3. **Verify Configuration**
   - Ensure `tsconfig.json`, `playwright.config.ts`, and `cucumber.js` are configured as per the project setup.
   - The `tsconfig.json` includes TypeScript settings for both Playwright and Cucumber.
   - The `playwright.config.ts` sets up Playwright to run tests on Chromium, Firefox, and WebKit.
   - The `cucumber.js` configures Cucumber to use TypeScript and generate HTML reports.

## Running Tests

### Running Playwright Tests
- **Run tests in headless mode**:
  ```bash
  npm run test
  ```
- **Run tests with browser UI (headed mode)**:
  ```bash
  npm run test:headed
  ```
- **View Playwright HTML report**:
  ```bash
  npm run test:report
  ```
  - Report is generated in the `playwright-report/` directory.

### Running Cucumber (BDD) Tests
- **Run Cucumber tests**:
  ```bash
  npm run bdd
  ```
- **Run Cucumber tests and view HTML report**:
  ```bash
  npm run bdd:report
  ```
  - Report is generated as `cucumber-report.html` in the project root.

### Test Cases
- **Playwright Tests** (`tests/example.spec.ts`):
  - Verify page title.
  - Subscribe to the newsletter.
  - Check visibility of featured products.
  - Navigate to a product page.
- **Cucumber Tests** (`features/demo_web_shop.feature`):
  - Same as above, but written in Gherkin syntax for BDD.
  - Scenarios include page title verification, newsletter subscription, featured products check, and product page navigation.

## Adding New Tests
1. **For Playwright Tests**:
   - Add new `.spec.ts` files in the `tests/` directory.
   - Use the `@playwright/test` module for assertions and browser interactions.
2. **For Cucumber Tests**:
   - Add new `.feature` files in the `features/` directory using Gherkin syntax.
   - Implement corresponding step definitions in `features/step_definitions/*.ts`.
   - Ensure steps use Playwright's `page` object for browser interactions.

## Troubleshooting
- **Node.js version issues**: Ensure Node.js is version 16 or higher (`node -v`).
- **TypeScript errors**: Verify `tsconfig.json` includes `"types": ["node", "@cucumber/cucumber"]` and correct `include` paths.
- **Cucumber errors**: Check `cucumber.js` for correct paths to step definitions.
- **Playwright browser issues**: Ensure browsers are installed (`npx playwright install`).
- **Test failures**: Check `cucumber-report.html` or Playwright's HTML report for detailed logs.

## Notes
- The project supports both Playwright and Cucumber tests, allowing you to choose between traditional test scripts or BDD.
- To run tests with visible browsers, set `headless: false` in `playwright.config.ts` or `steps.ts` for Cucumber.

For further assistance, contact the project maintainer or refer to the official documentation:
- [Playwright](https://playwright.dev/)
- [Cucumber](https://cucumber.io/docs/cucumber/)
