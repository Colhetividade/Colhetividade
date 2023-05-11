import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardContent from '@mui/material/CardActions';
import { Grid, Typography, Button, } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import './Login.css'
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        tipoUsuario: "",
        token: ""
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    async function logar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            toast.success('Usuário logado com sucesso!', {
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
        catch (error) {
            toast.error('Dados do usuário estão inconsistentes', {
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

    return (
        <Grid container className='cardStyle'>
            <Box className='cardStyle'>
                <img className='logoLogin' src="/logo.png" alt="" />
                <Typography variant='h4' gutterBottom color="textPrimary" component='h4' align='center' style={{ fontWeight: 'bold' }}>Login</Typography>
                <Card className='curvaBordaLoginUser colorLogin card'>
                    <CardContent>
                        <form className='card2' onSubmit={logar}>
                            <TextField className='formTextLogin curvaBorda' value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='E-mail' variant='outlined' name='usuario' margin='normal' fullWidth></TextField>
                            <TextField className='formTextLogin curvaBorda' value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth></TextField>
                            <Box className='center'>
                                <CardActions>
                                    <Button className='botao' variant="contained" type='submit'>Login</Button>
                                </CardActions>
                            </Box>
                        </form>
                    </CardContent>
                </Card >
                <Box className='cadastreSe'>
                    <p className='pTextLogin'>Não tem uma conta?</p>
                    <Link to='/cadastro' className='textDecorationNone'>
                        <Button className='botao2Cadastro'>Cadastre-se</Button>
                    </Link>
                </Box>
            </Box>
        </Grid>
    )
}

export default Login;