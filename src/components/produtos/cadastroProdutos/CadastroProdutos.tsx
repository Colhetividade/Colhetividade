import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import useLocalStorage from "react-use-localstorage";
import { busca, buscaId, post, put } from "../../../services/Service";
import "./CadastroProdutos.css";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { Card, CardActions, CardContent } from "@mui/material";
import { Grid } from "@material-ui/core";
import fotoCadastroProduto from "../../assets/img/fotoFundoCadastroProduto.png";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function CadastroProduto() {
    let history = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
     );

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipo: "",
        descricao: "",
    });
    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nomeProduto: "",
        quantidade: 0,
        preco: 0,
        fotoProduto: "",
        doacaoTotal: 0,
        categoria: null,
        isDoacao: false
    });
    // Verificando a existência do token
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
          history("/login")
      
          }
        }, [token])


    // Buscando as categorias e listando
    useEffect(() => {
        getCategoria()
        if (id !== undefined) {
            findById(id);
        }
    }, [id]);

    // Atualização da categoria vinculada anteriormente
    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria
        })
    }, [categoria])

    async function getCategoria() {
        await busca("/categoria", setCategorias, {
            headers: {
                'Authorization': token
            }
        })
    }

    // Buscando produto pelo id
    async function findById(id: string) {
        await buscaId(`/produtos/${id}`, setProduto, {
            headers: {
                Authorization: token,
            },
        });
    }

    function updatedProduto(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        });
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (id !== undefined) {
            try {
                await put(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                toast.success("Produto atualizado com sucesso!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Erro ao Atualizar, Por favor verifique os campos", {
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
                console.log(produto)
                await post(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                // await history("/loading");
                toast.success("Produto cadastrado com Sucesso!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } catch (error) {
                toast.error("Erro ao Cadastrar, Por favor verifique os campos", {
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
        back();
    }

    function back() {
        history("/produtos");
    }

    function returned() {
        history("/loading");
    }

    return (
        <>
            <Grid container className="topoCadastroProdutos">
                <Grid className="alinhar2" item xs={6}>

                    <Box className="box formularioCadastroProduto" >


                        <Typography className="margin1 " variant="h4" align="center">
                            Formulário de Produtos
                        </Typography>

                        <Card className="card borda" sx={{ maxWidth: 500, minHeight: 530 }}>
                            <CardContent>
                                <form className="formAll" onSubmit={onSubmit} >

                                    <TextField value={produto.nomeProduto}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                                        id="nome"
                                        placeholder="Nome do Produto"
                                        variant="outlined"
                                        type="text"
                                        name="nomeProduto"
                                        margin="normal"
                                        fullWidth className="form-text borda" />

                                    <TextField value={produto.quantidade}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                                        id="quantidade"
                                        placeholder="Quantidade"
                                        variant="outlined"
                                        type="number"
                                        name="quantidade"
                                        margin="normal"
                                        fullWidth className="form-text borda" />

                                    <TextField value={produto.preco}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                                        id="preco"
                                        placeholder="Preço"
                                        variant="outlined"
                                        name="preco"
                                        type="number"
                                        margin="normal" className="form-text borda" fullWidth />

                                    <TextField value={produto.fotoProduto}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                                        id="foto"
                                        placeholder="Foto do Produto"
                                        variant="outlined"
                                        name="fotoProduto"
                                        margin="normal" className="form-text borda" fullWidth />

                                    <InputLabel id="demo-simple-select-helper-label" className='inputla'>Categoria: </InputLabel>
                                    <Select fullWidth
                                        className='selector'
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategoria, {
                                            headers: {
                                                'Authorization': token
                                            }
                                        })}>
                                        {
                                            categorias.map(categoria => (
                                                <MenuItem value={categoria.id}>{categoria.tipo}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>Escolha uma categoria para o produto</FormHelperText>
                                    <CardActions className="center">

                                        <Button className="botao margin1" type="submit" variant="contained">
                                            Enviar Formulário
                                        </Button>
                                        {/* <Button className="btn_cancel botao margin1"
                                            onClick={returned}
                                            variant="contained"
                                            color="primary">
                                            Cancelar
                                        </Button> */}
                                    </CardActions>

                                </form>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

                <Grid item xs={6} className="alinhar3" >

                </Grid>
            </Grid>


        </>
    );
}

export default CadastroProduto;
