import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Container, Typography, TextField, Button } from "@material-ui/core"
import useLocalStorage from 'react-use-localstorage';
import Categoria from '../../../models/Categoria';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroCategoria.css';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CadastroCategoria(){
    let history = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipo:'',
        descricao:'',
    })

    useEffect(() => {
        if (token == '') {
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
            history('/login')
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

    function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name] : e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await put(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Categoria Atualizada com Sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error('Erro ao Atualizar, Por favor verifique os campos', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } else {
            try {
                await post(`/categoria`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Categoria Cadastrada com Sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                await history('/loading')
            } catch (error) {
                toast.error('Erro ao Cadastrar, Por favor verifique os campos', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
        back()
    }

    function back(){
        history('/categoria')
    }

    function returned(){
        history('/loading')
    }
    
    return (
       <>
        <Container maxWidth="sm" className="topoCadastroCategoria">
            <form className='formAllCategory' onSubmit={onSubmit}>
                <Typography className="typo_size" variant="h3" color="textSecondary" component="h1" align="center" >Formulário Categoria</Typography>
                <TextField value={categoria.tipo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="tipo" label="Nome da Categoria" variant="outlined" name="tipo" margin="normal" fullWidth />
                <TextField value={categoria.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="descricao" label="Descrição da Categoria" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Box className="buttons">
                <Button className="btn_send" type="submit" variant="contained" color="primary">
                    Enviar Formulário
                </Button>
                <Button className="btn_cancel" onClick={returned} variant="contained" color="primary">
                  Cancelar
                </Button>
                </Box>
            </form>
        </Container>
       </>
    )
}

export default CadastroCategoria;