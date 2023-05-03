import { useEffect, useState, ChangeEvent } from 'react'
import { Box, Grid } from '@mui/material'
import { Button, Card, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokens/tokensReducer'

import Produto from '../../models/Produto'
import { buscaId } from '../../services/Service'

import './Carrinho.css'
import { toast } from 'react-toastify'

function Carrinho() {

    let history = useNavigate()

    // Assim como no FormularioPostagem, pegamos o Id do Produto pela URL
    const { id } = useParams<{ id: string }>()

    // Substituir para o uso com Redux
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    // State para guardar a quantidade escolhida pela P. Usuaria 
    const [quantidadeFinal, setQuantidadeFinal] = useState(0)

    // State para guardar as informações do Produto retornadas pelo Back
    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nomeProduto: '',
        quantidade: 0,
        preco: 0,
        fotoProduto: '',
        doacaoTotal: 0,
        isDoacao: false,
    })

    /* useEffect(() => {
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
          history("/login")
          }
        }, [token]) */


    // Vai disparar a função findByIdProduto sempre que o ID for diferente que Undefined
    useEffect(() => {
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    // Esse Código irá pegar o ID do Produto, e acessar a service que busca as informações por ID 
    async function findByIdProduto(id: string) {
        await buscaId(`produtos/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
        })
    }

    // Função que vai pegar a quantidade escolhida do Produto
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let valor = +e.target.value
        setQuantidadeFinal(valor);
    }

    // Função que mostra o valor total entre a quantidade e o valor unitário do item. Ex.: 2 * R$2 = 4
    function valorTotal() {
        return quantidadeFinal * produto.preco
    }

    // Função que simula a compra Efetuada com sucesso
    function confirmSales() {
        toast.success("Compra/Doação Confirmada! Verifique o seu email!", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        history("/produtos")
    }

    return (
        <>
            <Grid container className='containerWrap'>

                <Box className='display'>
                    <Card variant="outlined" className='cardContainer'>

                        <div className='cardProduct'>
                            <img src={produto.fotoProduto} alt="Img" />

                            <div className='cardProductInfo'>

                                <Typography variant="h5" component="h2" className='nameProduct'>
                                    {produto.nomeProduto}
                                </Typography>

                                <Typography variant="body2" component="p" className='top'>
                                    R$ {produto.preco},00
                                </Typography>

                                <Typography variant="body2" component="p">
                                    Quantidade Máx: {produto.quantidade}
                                </Typography>

                                <Typography className='inputquantitywrap'>Quantidade:</Typography>
                                <TextField
                                    value={quantidadeFinal}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}

                                    // Propriedade que define o limite minimo e máximo de itens que podem ser comprados
                                    InputProps={{ inputProps: { min: 1, max: produto.quantidade } }}

                                    id="quantidade" type="number" variant="outlined"
                                    name="quantidade" margin="normal" fullWidth className='inputquantity'

                                />

                                <div className='wrapdonation'>
                                    <Typography>Este produto é doação?</Typography>
                                    <input type='checkbox'></input>
                                </div>

                                <span className='total'>
                                    R$ {valorTotal()},00
                                </span>
                            </div>
                        </div>
                    </Card>
                </Box>

                <Box className='display boxbutton' mb={1.5}>

                    <Box className="cardProductButton">
                        <Box mx={1}>
                            <Button onClick={confirmSales} variant="contained" size='small' className='btnconfirm'>
                                Confimar Compra
                            </Button>
                        </Box>
                    </Box>

                    <Link to="/produtos" className="cardProductButton">
                        <Box mx={1}>
                            <Button variant="contained" size='small' className='btncancel'>
                                Cancelar
                            </Button>
                        </Box>
                    </Link>

                </Box>

            </Grid>
        </>
    )
}

export default Carrinho