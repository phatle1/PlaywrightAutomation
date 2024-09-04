import { test, expect } from '../fixtures/POMFixtures';
import { HomePage } from '../pages/homePage';

test('has title', async ({ loggedInPage,homePage }) => {
  await homePage.goToHomePage();
  await homePage.searchWithText();
  await homePage.isReady();
});
