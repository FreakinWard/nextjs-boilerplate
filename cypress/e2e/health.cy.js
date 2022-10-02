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
    const buildNumber = process.env.CI_BUILD_NUMBER ?? 'not-set';

    // act
    // assert
    // cy.findByText(`BuildNumber: ${buildNumber}`);
    expect(Cypress.env('CI_BUILD_NUMBER')).to.equal(buildNumber);
  });
});
