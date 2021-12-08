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
});
