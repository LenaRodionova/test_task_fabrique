describe('Payment management', () => {
    beforeEach(() => {
        cy.login();
    });
    const description = "Automated Test " + Cypress._.random(10000)
    it('adding payment', () => {
        cy.contains('Добавить').click()
        cy.contains('Расход').click()
        cy.get("div[data-field-name=description]").within(() => {
            cy.get("textarea").type(description)
        })
        cy.contains('Активен').click()
        cy.get("div[data-field-name=amount_fact]").within(() => {
            cy.get("input").type("123")
        })
        cy.get("button[type=submit]").contains("Добавить").scrollIntoView().click().wait(1000)
        cy.contains('успешно сохранен').should("be.visible")
    })
    // по-хорошему надо делать intercept а не wait :(
    it('removing payment', () => {
        cy.get("input[placeholder=Поиск]").type(description).wait(1000).type("{enter}").wait(1000)
        cy.get("tr").contains(description).click()
        cy.contains("Удалить").scrollIntoView().click().wait(1000)
        cy.get("div[role=dialog]").within(() => {
            cy.contains('Да').click()
        })
        cy.contains('успешно удалён').should("be.visible")
    })
})