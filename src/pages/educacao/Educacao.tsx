import React, { useEffect } from 'react';
import { Card, Grid } from '@mui/material';
import imgCard1 from '../../assets/img/image 14.png'
import "./Educacao.css"
import { Cards } from '../../components/statics/card/CardEduca';
import BasicModal from '../../components/statics/modalCard/ModalCard';
import { cardProps } from '../../utils/payloadEduca';
import fotoEducacao from '../../assets/img/educacao.png'
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function Educacao() {
    let navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
    );
  
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
        navigate("/login")
      }
    }, [token])

    return (
        <>

            <Grid container direction="row" justifyContent="center" alignItems="center" className='fundo'>
                <Grid item xs={12} direction='row' justifyContent="center" display="flex">
                    <div className='textoEdu'>
                        <h1>Educa+</h1>
                        <p className='texto3'> Um espaço de aprendizagem para você descobrir mais sobre agricultura familiar</p>
                    </div>
                    <div>
                        <img src={fotoEducacao} alt="pessoa segurando uma cesta com alimentos" height="311px" width='400px' />
                    </div>

                </Grid>
                {cardProps.map(card => {
                    return (
                        <Grid item xs={4} justifyContent="center" display="flex">
                            <Card sx={{ maxWidth: 420 }} className='cardEduca'>
                                <Cards
                                    cardConteudo={card.cardConteudo}
                                    imagemInfo={card.imagemInfo}
                                    tituloCard={card.tituloCard}

                                />

                                <div className='diveducawrap'>

                                <BasicModal
                                    videoModal={card.modalProps.videoModal}
                                    txtModal={card.modalProps.txtModal}
                                    />
                                    </div>
                            </Card>
                        </Grid>
                    )
                })}


            </Grid>

        </>
    )
}


export default Educacao;
