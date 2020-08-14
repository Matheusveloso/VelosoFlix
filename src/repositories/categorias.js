import config from '../config';

const URL_CATEGORIES = `${config.URL_BACKEND_TOP}/categorias`;


function create(objetoDaCategoria){
    return fetch(`${URL_CATEGORIES}?_embed=videos`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(objetoDaCategoria),
    })
       .then(async (respostaDoServidor) =>{
          if(respostaDoServidor.ok){
              const resposta = await respostaDoServidor.json();
              return resposta; 
          }

          throw new Error('Não foi Possível Cadastrar os Dados');
       });

}


function getAll(){
    return fetch(`${URL_CATEGORIES}`)
       .then(async (respostaDoServidor) =>{
          if(respostaDoServidor.ok){
              const resposta = await respostaDoServidor.json();
              return resposta; 
          }

          throw new Error('Não foi Possível pegar os Dados');
       });

}


function getAllWithVideos(){
    return fetch(`${URL_CATEGORIES}?_embed=videos`)
       .then(async (respostaDoServidor) =>{
          if(respostaDoServidor.ok){
              const resposta = await respostaDoServidor.json();
              return resposta; 
          }

          throw new Error('Não foi Possível pegar os Dados');
       });

}

export default{
    getAllWithVideos,
    getAll,
    create,
};