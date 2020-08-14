import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';
function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const history = useHistory();
  const {handleChange, values, clearForm} = useForm(valoresIniciais);
 // const categoryTitles = categorias.map(({ titulo }) => titulo);
  const [categorias, setCategorias] = useState([]);
    

  useEffect(() => {
    if(window.location.href.includes('localhost')) {
      const URL = 'http://localhost:8080/categorias'; 
      fetch(URL)
       .then(async (respostaDoServer) =>{
        if(respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          setCategorias(resposta);
          return; 
        }
        throw new Error('Não foi possível pegar os dados');
       })
    }    
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,  
        ],
        
        categoriasRepository.create({
          titulo: values.nome,
          descricao: values.descricao,
          cor: values.cor,

        })
          .then(() => {
            console.log('Cadastrou com Sucesso!');
            alert('Categoria Cadastrado Com Sucesso!!');
            history.push('/');
          }),
        
        );

        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          {/* Cargando... */}
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.nome}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link><br/><br/>
    </PageDefault>
  );
}

export default CadastroCategoria;
