import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { buscaId, deleteId } from '../../../services/Service';
import './DeletarProdutos.css'
import Produto from '../../../models/Produto';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarProduto() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nomeProduto: '',
    quantidade: 0,
    preco: 0,
    fotoProduto: '',
    doacaoTotal: 0,
    isDoacao: false
  })

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login")

    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      findById(id)
    }
  }, [id])

  async function findById(id: string) {
    buscaId(`/produtos/${id}`, setProduto, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim() {
    navigate('/produtos')
    deleteId(`/produtos/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success('Produto excluído com Sucesso!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function nao() {
    navigate('/produtos')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" className='myContent'>
          <CardContent>
            <Box justifyContent="center">
              <Typography className="ConfirmingText" color="textSecondary" gutterBottom>
                Deseja excluir o seguinte Produto?
              </Typography>
              <Box className="typeSearched">
                <Typography color="textSecondary" className="typo_decor">
                  Nome: {produto.nomeProduto}
                </Typography>
                <Typography color="textSecondary" className="typo_decor">
                  Quantidade: {produto.quantidade}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="button_confirm" size='large' color="primary">
                  Sim, desejo excluir
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} variant="contained" className="button_back" size='large' color="secondary">
                  Cancelar
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default DeletarProduto;