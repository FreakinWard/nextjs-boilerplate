describe('health', () => {
  beforeEach(() => {
    cy.intercept('**/api/health').as('health');

    cy.visit('/health');

    cy.wait(['@health'])
      .its('response.statusCode')
      .should('contains', /200|304/g);
  });

  it('should render heath metrics', () => {
    // arrange
    const buildNumber = process.env.CI_BUILD_NUMBER ?? 'set-in-ci-pipeline';

    // act
    // assert
    expect(Cypress.env('CI_BUILD_NUMBER')).to.equal(buildNumber);
    cy.findByText('Health Check');
    cy.findByText(`BuildNumber: ${buildNumber}`);
  });
});
