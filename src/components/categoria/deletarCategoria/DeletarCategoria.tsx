import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Categoria from '../../../models/Categoria';
import { buscaId, deleteId } from '../../../services/Service';
import './DeletarCategoria.css'
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

function DeletarCategoria() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categoria, setCategoria] = useState<Categoria>()
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
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
    buscaId(`/categoria/${id}`, setCategoria, {
      headers: {
        'Authorization': token
      }
    })
  }

  async function sim() {

    deleteId(`/categoria/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    toast.success('Categoria excluída com sucesso!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
    navigate('/categoria')
  }

  function nao() {
    navigate('/categoria')
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" className='myContent'>
          <CardContent>
            <Box justifyContent="center">
              <Typography className="ConfirmingText" color="textSecondary" gutterBottom>
                Deseja excluir a seguinte Categoria?
              </Typography>
              <Box className="typeSearched">
                <Typography color="textSecondary" className="typo_decor">
                  Nome: {categoria?.tipo}
                </Typography>
                <Typography color="textSecondary" className="typo_decor">
                  Descrição: {categoria?.descricao}
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

export default DeletarCategoria;