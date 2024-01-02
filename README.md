# Overview

ParaBank is a realistic online banking application designed to facilitate fund transactions for users. This document outlines the End-to-End (E2E) test automation framework developed using Cypress for the ParaBank application. The framework comprehensively covers both UI and API test scenarios.

The framework was developed under the Page Object Model Design Pattern, where Page Elements and Actions are organized under pages, aiming to enhance code reusability. Additionally, the following features have been optimized for better reusability and code readability:

- Custom Cypress commands, including login, searchTransactionsAPI, and generateUniqueUsername, were incorporated for enhanced reusability.
- Fixture data files were utilized to implement a data-driven framework.
- Cypress commands were employed for managing the baseURL as an environmental variable.
- MochaAwesome reporting was integrated, consolidating all reports into an HTML report at the end of the test.
- Scripts were added to the `package.json` file for seamless integration with CI/CD pipelines.

## Execution Instructions

To run the tests, follow these steps:

1. Run `npm install` to install the necessary packages.
2. Execute `npm run chromeTest` to run all tests in headless mode with the Chrome browser.
3. Alternatively, use `npm run cypress-test` to run all tests with MochaAwesome reports in headless mode with the Chrome browser.

## Note

During the development of the framework, the System Under Test (SUT) environment (https://parabank.parasoft.com/) was temporarily unavailable. As a workaround, a local instance at http://localhost:8080/parabank was used for testing purposes.


- **Application URL:** [Para Bank](https://parabank.parasoft.com/)

## UI Test Scenarios

### 1. Navigate to Para Bank Application:
- Ensure successful navigation to the Para bank application.

### 2. Create a New User:
- Generate a new user from the user registration page.
- Ensure the username is randomly generated and unique in every test execution.

### 3. Login to the Application:
- Log in to the application with the user created in step 2.

### 4. Verify Global Navigation Menu:
- Check if the global navigation menu on the home page is working as expected.

### 5. Create a Savings Account:
- Navigate to the "Open New Account Page."
- Capture the account number after creating a Savings account.

### 6. Validate Accounts Overview:
- Ensure the Accounts Overview page displays balance details as expected.

### 7. Transfer Funds:
- Transfer funds from the account created in step 5 to another account.

### 8. Pay the Bill:
- Pay the bill using the account created in step 5.

### 9. Assertions:
- Add necessary assertions at each test step as needed.

## API Test Scenarios

### 1. Search Transactions using "Find Transactions" API:
- Utilize the "Find transactions" API call by amount for the payment transactions made in Step 8.

### 2. Validate JSON Response:
- Validate the details displayed in the JSON response.

## CICD Integration (Optional)

Integrate the Cypress test automation framework into Jenkins from a local instance. Enable the test execution to be triggered from a pipeline.

### Jenkins Integration Steps

1. Install Jenkins on your local instance.
2. Configure a Jenkins pipeline job.
3. Include necessary build and test execution steps in the Jenkinsfile.

**Note:**

- Consider naming conventions, modularization, reusability, and readability of code with an appropriate project structure.
- Share the GitHub Project link.
- Reach out for any clarifications or assistance.

---
