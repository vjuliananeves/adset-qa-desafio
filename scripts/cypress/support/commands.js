/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    cy.visit('https://www.adset.com.br/integrador')
    cy.url().should('include', '/integrador')
    cy.get('#Email').type('qa@adset.com.br').should('have.value', 'qa@adset.com.br')
    cy.get('#Senha').type('9PK6#E8m').should('have.value', '9PK6#E8m')
    cy.contains('#loginBtn', 'Entrar').click()
    cy.getCookies('.ASPXAUTH').should('exist')
    Cypress.Cookies.defaults({
        preserve: (cookie) => true
      });
  });

Cypress.Commands.add('acessoCadastro', () => {
    cy.get('.icomoon-icon-car').click()
    cy.contains('Incluir').should('be.visible')
    cy.get('.sub > :nth-child(1) > a').click()
    cy.get('.icomoon-icon-car').trigger('mouseout')
});
