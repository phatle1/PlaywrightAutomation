import { test as baseTest, Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { statSync } from "fs";

const baseURL = "https://www.educator.eu/";

type MyFixtures = {
  loggedInPage: Page;
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = baseTest.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loggedInPage: async ({ page }, use) => {
    await page.goto(baseURL);
    // await loginPage.loginWithAccount('my-username', 'my-password');
    await use(page);
    await page.close();
  },
});

export { expect } from "@playwright/test";

export function step(stepName?: string): any {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: any, ...args: any) {
      const name =
        stepName || `${this.constructor.name}.${context.name as string}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
