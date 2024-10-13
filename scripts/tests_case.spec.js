/// <reference types="cypress" />

before(() => {
    cy.getCookies().then((cookies) => {        
        cookies.forEach(cookie => {
            cy.clearCookie(cookie.name)
        });
      });
    cy.getCookies().should('be.empty');  // Valida que todos os cookies foram removidos
  });

describe('Cases Tests - QA Desafio AdSet', () => {
     before(() => {
        cy.login()
        cy.acessoCadastro()
     })

// CASOS DE TESTE 
     context('CT1 - Realizar cadastro de veículo preenchendo todos os campos obrigatórios e enviar', () => {
        it('Dado que estou na página de cadastro de veículos', () => {})

        it('Então o “Você está aqui” deve ser visível', () => {
            cy.get('.breadcrumb > :nth-child(1)').click().should('be.visible', 'Você está aqui:')
        });

        it('E preencho as informações de maneira correta', () => {
            cy.get('.marca').click().type('FORD{enter}').should('be.visible', 'FORD')
            cy.get('.modelo').click().type('RANGER{enter}').should('be.visible', 'RANGER')
            cy.wait(3000)
            cy.get(':nth-child(1) > :nth-child(3) > .row-fluid > .select2-container > .select2-choice').click()
                .type('2008{enter}').should('be.visible', '2008')
                cy.wait(3000)
            cy.get('.versao').click().type('limited 16{enter}').should('be.visible', '3.0 LIMITED 16V 4X4 CD DIESEL 4P MANUAL')
            cy.get('.cor').click().type('Prata{enter}').should('be.visible', 'Prata')
            cy.get('#Placa').type('ANX-9I98').should('have.value', 'ANX-9I98')
            cy.get('#Valor').type('2354245').should('have.value', '23.542,45')
        });
        it('E clico em “Confirmar” ', () => {
            cy.get('.buttons-form > .btn-warning').click()
        });
        it('Então devo ser cadastrado com sucesso', () => {});
     })

    context('CT2 - Verificar se após o salvamento, o usuário é direcionado para uma página de confirmação ou para uma lista de veículos cadastrados', () => {
        before(() => {cy.acessoCadastro()})
        it('Dado que realizei o envio com todas as informações corretas', () => {
            cy.get('.marca').click().type('nissan{enter}').should('be.visible', 'NISSAN')
            cy.get('.modelo').click().type('kicks{enter}').should('be.visible', 'KICKS')
            cy.wait(3000)
            cy.get(':nth-child(1) > :nth-child(3) > .row-fluid > .select2-container > .select2-choice').click()
                .type('2021{enter}').should('be.visible', '2021')
                cy.wait(3000)
            cy.get('.versao').click().type('manual{enter}').should('be.visible', '1.6 16V FLEXSTART S 4P MANUAL')
            cy.get('.cor').click().type('Vermelho{enter}').should('be.visible', 'Vermelho')
            cy.get('#Placa').type('ZPO-9I23').should('have.value', 'ZPO-9I23')
            cy.get('#Valor').type('4354245').should('have.value', '43.542,45')
        });
        
        it('E clico em “Confirmar” ', () => {
            cy.get('.buttons-form > .btn-warning').click()
        });

        it('Então devo ser redirecionada para a página de estoque', () => {
            cy.get('.icone-totais').should('be.visible')
        });
    })

    context('CT3 - Verificar se os campos numéricos aceitam apenas caracteres numéricos', () => {
        before(() => {cy.acessoCadastro()})
        it('Dado que tenho um campo numérico', () => {
            cy.get('#Valor').should('be.visible')
        });
        it('E tento inserir caracteres alfabéticos ', () => {
            cy.get('#Valor').type('abcdefg')
        });

        it('Então o resultado deve ser negativo', () => {
            cy.get('#Valor').should('not.have.value')
        });
    })

    context('CT4 - Verificar se existe limite de caracteres para o campo de observação e se ele é respeitado', () => {
        
        it('Dado que existe um campo de observação', () => {
            cy.get('#Informacoes').should('be.visible')
        });
        it('E o limite de caracteres é 1500', () => {});
        
        it('Quando insiro um texto com mais de 1500 caracteres', () => {
            const longText = Cypress._.repeat('teste', 1800)
            cy.get('#Informacoes').invoke('val', longText)
        });
        it('Então deve ser exibido um alerta', () => {
            cy.get('#Informacoes').type('12343')
            cy.get('#limiterBox').should('be.visible')
        });
    })

    context('CT5 - Testar a importação de imagem', () => {
        it('Dado que existe uma importação de imagens', () => {
            cy.get('#drag-and-drop-zone').should('not.have.value')
        });

        it('E insiro imagens com a função drag and drop ', () => {
            cy.get('#drag-and-drop-zone').selectFile('./cypress/fixtures/foto_teste.jpg', {action: 'drag-drop'})
        });

        it('Então a imagem deve ficar salva no cadastro do veículo', () => {})
        });
    context('CT6 - Verificar se o sistema exibe mensagem de erro ao tentar enviar o formulário de cadastro com um ou mais campos obrigatórios em branco', () => {
    it('Dado que estou na página de cadastro de veículos', () => {})
    it('Então o “Você está aqui” deve ser visível', () => {
        cy.get('.breadcrumb > :nth-child(1)').click().should('be.visible', 'Você está aqui:')
    });
    it('E preencho os campos obrigatórios, exceto o Preço do veículo', () => {
        cy.get('.marca').click().type('Jeep{enter}').should('be.visible', 'JEEP')
        cy.get('.modelo').click().type('compass{enter}').should('be.visible', 'COMPASS')
        cy.wait(3000)
        cy.get(':nth-child(1) > :nth-child(3) > .row-fluid > .select2-container > .select2-choice').click()
            .type('2015{enter}').should('be.visible', '2015')
            cy.wait(3000)
        cy.get('.versao').click().type('gasolina{enter}').should('be.visible', '2.0 SPORT 4X2 16V GASOLINA 4P AUTOMÁTICO')
        cy.get('.cor').click().type('Prata{enter}').should('be.visible', 'Prata')
        cy.get('#Placa').type('ALX-9I98').should('have.value', 'ALX-9I98')
    });
    it('E clico em “Confirmar” ', () => {
        cy.get('.buttons-form > .btn-warning').click()
    });

    it('Então um alerta deve ser exibido', () => {
        cy.get('.alert').should('be.visible')
    });

    })
})