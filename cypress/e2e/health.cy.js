describe('health', () => {
  beforeEach(() => {
    cy.visit('/health');
  });

  it('should render', () => {
    // arrange
    // act
    // assert
    cy.findByText('Health Check');
  });

  it('should show expected build number', () => {
    // arrange
    // const buildNumber = process.env.ciBuildNumber;
    const buildNumber = Cypress.env('ciBuildNumber');

    // act
    // assert
    cy.findByText(`BuildNumber: ${buildNumber}`);
  });
});
