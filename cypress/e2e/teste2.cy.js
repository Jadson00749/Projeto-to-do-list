describe('Meu primeiro teste com Cypress, acessando minha page localhost', ()=>{
  it('Apenas acesse minha pagina to-do localhost!', ()=>{
    cy.viewport(1920, 911);
    cy.visit('http://localhost:8080/')

    cy.contains('Meu Dia').click();

    for(let i = 0;i <= 9;i++){
      const tarefa = `Tarefa ${i}`
      cy.get('input[placeholder="Adicionar uma tarefa"]').type(tarefa)
  
      cy.get('button').contains('Adicionar').click();
  
      // cy.contains('Tarefa 1').should('exist', { timeout: 10000 })
    }

    for (let i = 0; i <= 9; i++) {
      const tarefa = `Tarefa ${i}`;
      cy.contains(tarefa).rightclick();
      cy.get('button').contains('Excluír tarefa').click();
      cy.get('button').contains('Excluír tarefa').click();

    }

  })
})


// describe('Meu teste com Cypress', () => {
//   it('Deve visitar a página e verificar o título', () => {
//     // Visitar uma página
//     cy.visit('http://localhost:8080');

//     // Verificar o título da página
//     cy.title().should('equal', 'Minha Página'); // Suponha que o título esperado seja 'Minha Página'

//     // Exemplo de console.log para verificar a URL atual
//     cy.url().then(url => {
//       console.log('URL atual:', url);
//     });

//     // Outro exemplo de console.log para verificar o texto de um elemento
//     cy.get('h1').invoke('text').then(texto => {
//       console.log('Texto do título:', texto);
//     });
//   });
// });