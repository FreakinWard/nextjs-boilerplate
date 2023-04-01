import { Then, When } from 'cypress-cucumber-preprocessor/steps';

import HealthPage from '../../page-objects/health-page';

const healthPage = new HealthPage();

Given('I navigate to the health page', () => {
  healthPage.navigateToHome();
});

When('The title {string} is shown', title => {
  healthPage.verifyTextExistence(title);
});

Then('health item {string} is {string}', (itemName, expectedItemValue) => {
  healthPage.validateHealthItem(itemName, expectedItemValue);
});
