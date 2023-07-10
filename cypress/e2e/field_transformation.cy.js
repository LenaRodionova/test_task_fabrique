describe('Field transformation', () => {
    beforeEach(() => {
        cy.login()
        cy.contains('Добавить').click().wait(1000)
    })
    it('Default field set', () => {
        containsField({
            operation: "Тип операции",
            description: "Описание",
            statuses: "Статус",
            amount_plan: "Сумма план",
            amount_fact: "Сумма факт",
            status: "Статус оплаты",
            date_plan: "Дата план",
            date_fact: "Дата факт",
            source: "Источник",
            source_additional_id: "Источник, уточнение",
            source_status: "Статус документов",
            company_own: "Юридическое лицо",
            company_client: "Контрагент",
            account_sender: "Счет отправителя",
            account_recipient: "Счет получателя",
            tags: "Тэги",
            external_source_id: "ID в банке"
        })

    })

    it('Уменьшаемый план field set', () => {
        cy.contains("Расход").click()
        cy.get("div[data-field-name=category]").within(() => {
            cy.get(".multiselect__tags").click().type("Уменьшаемый план").type("{enter}")
        })
        containsField({
            operation: "Тип операции",
            description: "Описание",
            statuses: "Статус",
            amount_plan: "Статья расходов",
            status: "Статья расходов, уточнение",
            category: "Сумма план",
            category_additional_id: "Статус оплаты",
            company_own: "Юридическое лицо",
            company_client: "Контрагент",
            tags: "Тэги",
            external_source_id: "ID в банке"
        })
        cy.get("div[data-field-name=related_payments]").should("exist")
    })

    it('Перевод средств field set', () => {
        cy.contains("Перевод средств").click()
        containsField({
            operation: "Тип операции",
            description: "Описание",
            statuses: "Статус",
            amount_plan: "Сумма план",
            amount_fact: "Сумма факт",
            commission: "Статус оплаты",
            status: "Комиссия",
            date_plan: "Дата план",
            date_fact: "Дата факт",
            account_sender: "Счет отправителя",
            account_recipient: "Счет получателя",
            tags: "Тэги",
            external_source_id: "ID в банке"
        })
    })
})

function containsField(names) {
    for (const tag_value in names) {
        cy.get(`div[data-field-name=${tag_value}]`).get('span[class=""]').should("contain.text", names[tag_value])
    }

}
