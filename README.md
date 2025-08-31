Hello!

Scope of the project:
Project includes functional UI tests for https://www.jetbrains.com/idea/buy page
Stack: Playwright + TS

Test automation scope limitations:

1. API tests
According to the testing approach API tests definetly should be prioritized.
I created a folder for API tests but didn't implement them since I don't have API specifications.
NOTE: If you are interested I can share with you another my project with API tests so you can have an idea how I would do that

2. Language
I tested only for English language selected due of multiple reasons:
- To limit the scope since it's just a test assignment
- There is a huge problem related to reliable locators, in most of the places I was forced to rely on text
NOTE: In ideal world I would first fix the problem with locators and after consider different approach how to make test adaptive for different languages selected

3. E2E UI tests
E2E tests should include the full flow with product selection, payments, download.
Since it's a production I am limited with the actions I can do: I can't pay, I don't have test account, etc.
Thats why E2E tests are not implemented

Suggestion:
I would reccomend to think about adding automation ids for important elements on the pages.
The lack of reliable locators is huge. Sometimes it makes tests more complicated + tests could be flaky

UI Project structure:
- data --> keeps some constants
- e2eTests --> spec files for e2e flows
- fixtures --> PlayWright fixtures: currently only page set up
- functionalTests --> spec files for UI functional tests, could be used in regression/smoke scopes
- pom --> page objects with some inheritance example + objects for repeatable elements as a card for example

For functions used across multiple tests we can have a utils folder + config files for different envs

FINAL NOTE:
I have all of the created tests passed.
Let me know if you have any issues.
I run them in VS code on a Windows laptop