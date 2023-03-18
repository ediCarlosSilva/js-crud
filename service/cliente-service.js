// Utilizando fetch API
// Pede os dados e devolve uma resposta
const listaClientes = () => {
    return fetch('http://localhost:3000/profile')
        .then( resposta => {
            return resposta.json();
        })
}

const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then( resposta => {
        return resposta.body
    })
}

export const clienteService = {
    listaClientes,
    criaCliente
}


// Utilizando Promise e XMLHttpRequest (AJAX)
// const listaClientes = () => {
//     const promise = new Promise((resolve, reject) => {
//         const http = new XMLHttpRequest();

//         http.open('GET', 'http://localhost:3000/profile');

//         http.onload = () => {
//             if (http.status >= 400) {
//                 reject(JSON.parse(http.response));
//             } else {
//                 resolve(JSON.parse(http.response));
//             }

//         }

//         http.send();
//     })
//     // console.log(promise);
//     return promise;
// }



