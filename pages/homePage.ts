import { expect, Locator, Page, test } from "@playwright/test";
import { step } from "../fixtures/POMFixtures";

// import { navigateTo, fill, click } from '../src/utils/actionUtils'

let timeOut: number = 1000;
export class HomePage {
  public url = "https://www.educator.eu/";
  readonly page: Page;
  readonly homePage: Locator;
  readonly seachIcon: Locator;
  readonly searchTxt: Locator;
  static searchWithText: any;

  constructor(page: Page) {
    this.page = page;
    this.homePage = this.page.getByRole("link", {
      name: "Educator",
      exact: true,
    });
    this.seachIcon = this.page.locator(
      "xpath=//ul[@id='menu-home-1']//a[@aria-label='Search Icon Link']"
    );
    this.searchTxt = this.page.locator(
      "xpath=(//*[contains(@id,'is-search-input')])[2]"
    );
  }

  public async goToHomePage() {
    await test.step(`Actions: navigate to ${this.url}`, async () => {
      await this.page.goto(this.url);
    });
  }

  @step()
  public async searchWithText() {
    await test.step(`Actions: navigate to ${this.url}`, async () => {
      await this.seachIcon.click();
      await this.searchTxt.fill("Educator");
    });
  }

  @step()
  public async isReady() {
    await test.step(`Expect: ${this.url} should be shown`, async () => {
      expect(this.page).toHaveTitle(/.*checkout/);
      expect(this.homePage).toBeVisible();
    });
  }
}
