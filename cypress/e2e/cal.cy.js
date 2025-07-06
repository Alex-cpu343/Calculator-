function del() {
  cy.get('[data-test="glowInp"]').then(($input) => {
    const val = $input.val()

    if( val !== ''){
  cy.get('[data-test="btnDel"]').click()  
  del();
    }
  })
}
describe('Calcualt', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it ('Calculator',()=>{
    cy.get('[data-test="calculator"]').should('be.visible')
     cy.get('[data-test="calculator"]').click()
      cy.visit('http://localhost:5173/')
  })
  it('Calculator Math',()=>{
    cy.get('[data-test="glowInp"]').type('2+2')
    cy.get('[data-test="btnCal"]').click()
    cy.get('[data-test="Res"]').should('be.visible')
    cy.get('[data-test="btnDel"]').should('be.visible')
    del()
    cy.get('[data-test="glowInp"]').should('have.value','')

  })
  
})
describe('KeyBoard',()=>{
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('Standart',()=>{
cy.get('[data-test="str"]').click()
cy.get('[data-test="StrKey"]').should('be.visible')
cy.get('[data-test="firstPage"]').click()
cy.get('[data-test="pageTwo"]').should('be.visible')
cy.get('[data-test="secondPage"]').click()
cy.get('[data-test="pageOne"]').should('be.visible')
cy.get('[data-test="sci"]').click()
cy.get('[data-test="SciKey"]').should('be.visible')
  })
})
