before(() => {
    cy.getCookies().then((cookies) => {        
        cookies.forEach(cookie => {
            cy.clearCookie(cookie.name)
        });
      });
    cy.getCookies().should('be.empty');  // Valida que todos os cookies foram removidos
  });
describe('Desafio QA AdSet', () => {
    context('Dado que estou na página de login', () => {
        beforeEach(() => {
            cy.visit('https://www.adset.com.br/integrador')
        })
        it('Então eu verifico se a URL está correta', () => {
            cy.url().should('include', '/integrador')
        })
    })

    context('Quando insiro as credenciais de acesso corretas', () => {
        beforeEach(() => {
            cy.get('#Email').type('qa@adset.com.br').should('have.value', 'qa@adset.com.br')
            cy.get('#Senha').type('9PK6#E8m').should('have.value', '9PK6#E8m')
        })

        it('Então os campos devem estar preenchidos corretamente', () => {
            cy.get('#Email').should('have.value', 'qa@adset.com.br')
            cy.get('#Senha').should('have.value', '9PK6#E8m')
        })
    })

    context('E quando eu clico no botão "Entrar"', () => {
        beforeEach(() => {
            cy.contains('#loginBtn', 'Entrar').click()
            cy.getCookies('.ASPXAUTH').should('exist')

            Cypress.Cookies.defaults({
                preserve: (cookie) => true
              });
        })

        it('Então devo ser redirecionada a página de integração de anúncios automotivos ', () => {
            cy.title().should('be.equal', 'AdSet ## Integração de anúncios automotivos ##')
        })
    })

    context('Dado que quando eu passo o mouse por cima, aparece um menu Dropdown "Veículos"', () =>{    
        it('E eu clico na opção "Incluir"', () => {
            cy.get('.icomoon-icon-car').click()
            cy.contains('Incluir').should('be.visible')
            cy.get('.sub > :nth-child(1) > a').click()
        })

        it('Então devo ser redirecionada a página de cadastro de veículos', () => {
            cy.get('h3').should('be.visible', 'Incluir')
        })
    })
})