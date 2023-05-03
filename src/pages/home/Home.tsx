import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css'
import description from '../../assets/img/description_home.png'
import education from '../../assets/img/Education_home.png'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <Grid container>

                <Grid alignItems="center" item className='banner_home' >
                    <Box >
                        <Typography variant="h1" gutterBottom color="textPrimary" component="h1" align="center" className='nameBanner' id="Inria">Colhetividade</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='WhiteText' id="Roboto">Apoie a agricultura local, valorize quem planta.</Typography>
                    </Box>
                </Grid>

                <Grid container md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                    <Grid item xs={12} md={6} className='imgDescriptionGrid'>
                        <img src={description} alt="" />
                    </Grid>

                    <Grid className='description_text' item xs={12} md={6} style={{ width: '80%' }} >
                        <Box className='boxTextDescription'>
                            <Typography id="typodesc">A Colhetividade é um e-commerce que visa fomentar a agricultura local com a venda de produtos originados diretamente das colheitas das terras brasileiras, dando valor e oportunidades para agricultores locais de participarem ativamente da economia local de suas vizinhanças</Typography>
                        </Box>
                    </Grid>

                </Grid>

                <Grid alignItems="center" className='acess_section'>
                    <Typography className="text_acess">Descubra uma vasta diversidade de produtos!</Typography>
                    <Link to='/produtos' className='text-decoration-none'>
                    <Button className='btn-acess'>Acessar</Button>
                    </Link>
                </Grid>

                <Grid className='video_section'>
                    <Typography className="text_video">Conheça mais sobre a ODS-2!</Typography>
                    <iframe className='video' src="https://www.youtube.com/embed/rvET4ADE8JQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </Grid>

                <Grid item xs={6} className='more_section'>
                    <span>Gostou? Então clique aqui e acesse <br /> mais conteúdos no Educa+</span>
                    <Link to='/plantareducacao' className='text-decoration-none'>
                    <Button style={{ fontSize: '3px' }}>Saiba mais</Button>
                    </Link>
                </Grid>

                <Grid item xs={6}>
                    <img className='img_more' src={education} alt="" />
                </Grid>
            </Grid>

        </>
    )
}

export default Home;