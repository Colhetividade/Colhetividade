import React, { useState, useEffect, useRef } from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid } from '@material-ui/core';
import './ListarCategoria.css';
import Categoria from '../../../models/Categoria';
import { busca } from '../../../services/Service';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
// Material UI
import { Container, Box } from "@mui/material";



// Fotos
import foto1 from '../../../assets/img/FotoCategoria.png';
import foto2 from '../../../assets/img/feijao.png';
import foto3 from '../../../assets/img/milho.png';
import foto4 from '../../../assets/img/png.png';


// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import ModalCategoria from '../modalCategoria/ModalCategoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify'

function ListarCategoria() {

  let navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([])
  
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

  async function getCategoria() {
    await busca("/categoria", setCategorias, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getCategoria()
  }, [categorias.length])

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    // progressCircle.current.style.setProperty('--progress', 1 - progress);
    // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Container maxWidth="lg" className='testes'>
        {/* CARD */}
        <Box className="card1" display="flex" flexDirection="row">
          <Box>
            <img className="img" src={foto1} alt="imagem de homem negro segurando um punhado de guaraná." />
          </Box>
          <Box className="box_description">
            <h1 className='titulo'> Categoria dos produtos</h1>
            <p className='descricao'>Veja aqui a categoria de produtos disponibilizada pela agricultura local</p>
            <Box className='modalBox' marginRight={1}>
              <ModalCategoria />
            </Box>
          </Box>
        </Box>
        {/* CARROSEL */}
        <Box>
          <Swiper className="swiper"
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}

          >
            <SwiperSlide className='mySwiper'>
              <Box display="flex" className="swiper1">
                <Box className="swiperItems">
                  <p className="promocao">Promoções do momento</p>
                  <p className="tipo">Milho orgânico <p>por R$17,99</p></p>
                  <Link to='/produtos'>
                  <button className="button-swiper">Comprar</button>
                  </Link>
                </Box>
                <Box className="swiper2">
                  <img className="img-swiper" src='https://mercadoorganico.com/8353-home_default/gritz-de-milho-organico-400g-ecobio.jpg' alt="foto de um saco de feijão" />
                </Box>
              </Box>
            </SwiperSlide>
            <SwiperSlide className='mySwiper' >
              <Box display="flex" className="swiper1">
                <Box className="swiperItems">
                  <p className="promocao">Promoções do momento</p>
                  <p className="tipo">Arroz Integral <p>por R$10,99</p></p>
                  <Link to='/produtos'>
                  <button className="button-swiper">Comprar</button>
                  </Link>
                </Box>
                <Box className="swiper2">
                  <img className="img-swiper" src='https://images.tcdn.com.br/img/img_prod/1012545/arroz_integral_organico_500g_1791_1_eac6ed1dfaf4a7b7a5e4298a0efa40a9.jpg' alt="foto de um saco de arroz" />
                </Box>
              </Box></SwiperSlide>
            <SwiperSlide className='mySwiper' >
              <Box display="flex" className="swiper1">
                <Box className="swiperItems">
                  <p className="promocao">Promoções do momento</p>
                  <p className="tipo">Feijão Fradinho <p>por R$11,80</p></p>
                  <Link to='/produtos'>
                  <button className="button-swiper">Comprar</button>
                  </Link>
                </Box>
                <Box className="swiper2">
                  <img className="img-swiper" src={foto2} alt="foto de um saco de feijão" />
                </Box>
              </Box>
            </SwiperSlide>
            <SwiperSlide className='mySwiper'>
              <Box display="flex" className="swiper1">
                <Box className="swiperItems">
                  <p className="promocao">Promoções do momento</p>
                  <p className="tipo">Açúcar Demerara <p>por R$6,90</p></p>
                  <Link to='/produtos'>
                  <button className="button-swiper">Comprar</button>
                  </Link>
                </Box>
                <Box className="swiper2">
                  <img className="img-swiper" src='https://images.tcdn.com.br/img/img_prod/909151/acucar_demerara_organico_1kg_native_263_1_bafe08635a9646d4415cf1a10b1cc67d.jpg' alt="foto de um saco de açúcar" />
                </Box>
              </Box>
            </SwiperSlide>

          </Swiper>
        </Box>
      </Container >
      <Grid container className="container_cards" spacing={2}>
        {
          categorias.map(categorias => (
            <Grid item xs={12} sm={6} md={4} key={categorias.id}>

              <Box display="flex" flexDirection="row-reverse" m={2}>
                <div className="card">
                  <Box display="flex" flexDirection="column" className="container_yuri">
                    <Typography className="titulo-card" noWrap variant="h3">{categorias.tipo}</Typography>
                    <Typography className="valor" noWrap variant="h4">{categorias.descricao}</Typography>

                    <Box className="buttons_style">
                      <Link to={`/formularioCategoria/${categorias.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft button_atualizar" size='small' color="primary" >
                            Atualizar
                          </Button>
                        </Box>
                      </Link>

                      <Link to={`/deletarCategoria/${categorias.id}`} className="text-decorator-none">
                        <Box mx={1}>
                          <Button className="button_delete" variant="contained" size='small' color="secondary">
                            Excluir
                          </Button>
                        </Box>
                      </Link>

                    </Box>
                  </Box>
                </div>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </>
  );
}

export default ListarCategoria;