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

tabela.addEventListener('click', async (evento) => {
    // console.log(evento.target);
    let ehBotaoDeletar = evento.target.classList == 'botao-simples botao-simples--excluir';

    if (ehBotaoDeletar) {
        try {
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id;
    
            await clienteService.removeCliente(id)
    
            linhaCliente.remove();
        }
        catch (erro) {
            console.log(erro);
            window.location.href = '../telas/erro.html';
        }

    }

});

const render = async () => {
    try {
        const listaClientes = await clienteService.listaClientes()
    
        listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id));
        });
    }
    catch (erro) {
        console.log(erro);
        window.location.href = '../telas/erro.html';
    }
}

render();