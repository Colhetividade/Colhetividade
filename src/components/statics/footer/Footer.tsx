import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import blog from '../../../assets/blog.png';
import logo from '../../../assets/img/logobranco.png';
import './Footer.css'

function Footer() {
    return (
        <>
            <Grid container>
                <Grid className='containerAll' item xs={12}>
                    <Box className="boxAll">
                        <Box>
                            <img src={logo} alt="" className='logoImg'/>
                        </Box>
                        <Box className="Items">
                 
                        <Box className="boxWrap">
                            <Box paddingTop={1}>
                                <Typography variant="subtitle2" className="typoName" align="center" gutterBottom style={{ color: "white" }} >2023 | Todos direitos reservados </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" className="typoName" align="center" gutterBottom style={{ color: "white" }} >©Colhetividade</Typography>
                            </Box>
                            {/*   <Box>
                                <a target="_blank" href="https://brasil.generation.org">
                                    <Typography variant="subtitle2" gutterBottom style={{ color: "white" }} align="center">brasil.generation.org</Typography>
                                </a>
                            </Box> */}
                        </Box>

                        <Box className="networks">
                            <a href="https://www.facebook.com/generationbrasil" target="_blank">
                                <FacebookIcon style={{color: "white" }} className="icon_net" />
                            </a>
                            <a href="https://www.instagram.com/generationbrasil/" target="_blank">
                                <InstagramIcon style={{color: "white" }} className="icon_net" />
                            </a>
                            <a href="https://www.linkedin.com/school/generationbrasil/" target="_blank">
                                <LinkedInIcon style={{color: "white" }} className="icon_net" />
                            </a>
                        </Box>     
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}


export default Footer;