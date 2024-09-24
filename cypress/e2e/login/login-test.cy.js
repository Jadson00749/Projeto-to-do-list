describe('Teste de login com cypress', () => {
  it('Inserir dados do usúario e realizar Login', () => {
    cy.viewport(1920, 1500);
    cy.visit('http://localhost:8080/')

    let obj = {
      "id": 1,
      "email": "santosjadson797@hotmail.com",
      "name": "Jadson dos Santos Moura",
      "password": "Jadson760421!",
      "creationDate": "19/09/2024 17:30:03"
  }

    cy.window().then((win) => {
      win.localStorage.setItem('1', JSON.stringify(obj))
    })

    console.log(JSON.parse(localStorage.getItem('1')))

    cy.get('input[placeholder="Email"]').click().type('santosjadson797@hotmail.com')
    cy.get('input[placeholder="Password"]').click().type('Jadson760421!')

    cy.contains('button', 'Sign in').click()

  })
})