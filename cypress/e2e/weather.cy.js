describe('Weather App Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/weather-app')
  })

  it('should open the weather app', () => {
    cy.url().should('include', '/weather-app')
    
  })
  it('should show the search input', () => {
    cy.get('[data-cy="search-input"]').should('be.visible')
  })
  it('should show the search button', () => {
        cy.get('[data-cy="search-btn"]').should('be.visible')
  })
  it('should display default city Tempe on load', () => {
    cy.get('[data-cy="location"]', { timeout: 10000 }).should('contain.text', 'Tempe')
  })
  it('should display temperature for default city',() =>{
    cy.get('[data-cy="temperature"]', { timeout: 10000 }).should('not.be.empty')
  })
  it ('should show results for london',()=>{
    cy.get('[data-cy="search-input"]').clear().type('London')
    cy.get('[data-cy="search-btn"]').click()
    cy.get('[data-cy="location"]', { timeout: 10000 }).should('contain.text', 'London')
    cy.get('[data-cy="temperature"]', { timeout: 10000 }).should('not.be.empty')
  })
    it ('should show results for Jodhpur',()=>{
    cy.get('[data-cy="search-input"]').clear().type('Jodhpur')
    cy.get('[data-cy="search-btn"]').click()
    cy.get('[data-cy="location"]', { timeout: 10000 }).should('contain.text', 'Jodhpur')
    cy.get('[data-cy="temperature"]', { timeout: 10000 }).should('not.be.empty')
  })
  it('should show alert when searching with empty input', () => {
  cy.get('[data-cy="search-input"]').clear()
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Please enter a city name.')
  })
  cy.get('[data-cy="search-btn"]').click()
})
})
