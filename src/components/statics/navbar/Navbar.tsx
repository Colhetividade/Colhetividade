import React from "react";
import { Box } from "@mui/material";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/img/logobranco.png';
import "./Navbar.css";
import useLocalStorage from "react-use-localstorage";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let navigate = useNavigate();
    
    const dispatch = useDispatch();
    const isLoggedIn = token !== '';

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate('/login')
    }

    return (
        <>
            <AppBar position="static" className="nav">
                <Toolbar variant="dense" className="toolbarStyle">
                    <Box display="flex" className="nav_links">

                        <Box className="cursor">
                            <img src={logo} alt="logo" />
                        </Box>
                        <Link to="/home" className="text-decorator-none">
                            <Box mx={1} className="cursor">
                                <Typography className="nameTypo" variant="h6" color="inherit">
                                    Home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/categoria" className="text-decorator-none">
                            <Box mx={1} className="cursor">
                                <Typography className="nameTypo" variant="h6" color="inherit">
                                    Categorias
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/produtos" className="text-decorator-none">
                            <Box mx={1} className="cursor">
                                <Typography className="nameTypo" variant="h6" color="inherit">
                                    Produtos
                                </Typography>
                            </Box>
                        </Link>
                        
                        <Link to="/plantareducacao" className="text-decorator-none">
                        <Box mx={1} className="cursor">
                            <Typography className="nameTypo" variant="h6" color="inherit">
                                Educa+
                            </Typography>
                        </Box>
                        </Link>
                    </Box>
                    
                    {isLoggedIn ? (
                        <Box mx={1} className='cursor' onClick={goLogout}>
                            <Typography variant="h6" color="inherit" className="logout">
                                Sair
                            </Typography>
                        </Box>
                    ) : 
                    <Link to='/login' className='cursor'>
                    <Typography variant="h6" color="inherit" className="logout">
                        Entrar
                    </Typography>
                </Link>}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;