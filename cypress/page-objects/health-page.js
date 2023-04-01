export default class HealthPage {
  navigateToHome() {
    cy.visit('/health');
  }

  validateHealthItem(itemName, expectedItemValue) {
    this.verifyTextExistence(`${itemName}: ${expectedItemValue}`);
  }

  verifyTextExistence(text, doesExist = true) {
    if (doesExist) {
      cy.contains(text).should('exist');
    } else {
      cy.contains(text).should('not.exist');
    }
  }
}
