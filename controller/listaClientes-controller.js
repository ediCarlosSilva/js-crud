import { clienteService } from '../service/cliente-service.js';

// gerando o template
const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr');

    const conteudo = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
            </ul>
        </td>
                    `

    linhaNovoCliente.innerHTML = conteudo;
    linhaNovoCliente.dataset.id = id;
    // console.log(linhaNovoCliente);
    return linhaNovoCliente;
}

// Percorrendo o DOM
const tabela = document.querySelector('[data-tabela]');

tabela.addEventListener('click', (evento) => {
    // console.log(evento.target);
    let ehBotaoDeletar = evento.target.classList == 'botao-simples botao-simples--excluir';

    if(ehBotaoDeletar) {
        const linhaCliente = evento.target.closest('[data-id]');
        let id = linhaCliente.dataset.id;
        
        clienteService.removeCliente(id)
        .then(() => {
            linhaCliente.remove();
        })
    }

});

// fazendo junção com listaClientes que é uma promise
clienteService.listaClientes()
    .then(data => {
        // console.log(data);
        // const data = JSON.parse(http.response);

        data.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id));
        });
    })