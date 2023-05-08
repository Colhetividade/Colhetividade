import { useState, useEffect, ChangeEvent } from 'react'
import { Box } from "@mui/material"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardContent from '@mui/material/CardActions';
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { cadastro } from '../../services/Service';
import User from '../../models/User';
import './Cadastro.css'
import { toast } from 'react-toastify'

export default function Cadastro() {
    let history = useNavigate()

    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    const [user, setUser] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        tipoUsuario: ""
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        tipoUsuario: ""
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            history("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha == user.senha) {
            cadastro(`/usuarios/cadastrar`, user, setUserResult)
            toast.success('Usuário Cadastrado com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
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
        <Grid container className='cardStyleCadastro'>
            <Box className='cardStyleCadastro'>
                <img className='logoCadastroUser' src="/logo.png" alt="" />
                <Typography className='margin1' variant='h4' gutterBottom color="textPrimary" component='h4' align='center' style={{ fontWeight: 'bold' }}>Cadastre-se</Typography>
                <Card className='curvaBordaFormLogin colorCadastro card margin1'  >
                    <CardContent>
                        <form onSubmit={cadastrar}>
                            <TextField className='formText curvaBorda' value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' placeholder='Insira seu nome' required fullWidth></TextField>
                            <TextField className='formText curvaBorda' value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='E-mail' variant='outlined' name='usuario' margin='normal' placeholder='Insira um email válido' required fullWidth></TextField>
                            <TextField className='formText curvaBorda' value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password'required fullWidth></TextField>
                            <TextField className='formText curvaBorda' value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' placeholder='Insira novamente a senha' required fullWidth />
                            <TextField className='formText curvaBorda' value={user.tipoUsuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='tipoUsuario' label='Tipo do Usuario' variant='outlined' name='tipoUsuario' margin='normal' required fullWidth></TextField>
                            <TextField className='formText curvaBorda' value={user.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' label='Link da Foto' variant='outlined' name='foto' margin='normal' placeholder='Insira um link de foto' fullWidth></TextField>
                            <CardActions className='center'>
                                <Button className='botao' variant="contained" type='submit'>Cadastar</Button>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card >
                <Box className='logarSe'>
                    <p>Já tem uma Conta?</p>
                    <Link to='/login' className='textDecorationNone'>
                        <Typography className='botao2'>Login</Typography>
                    </Link>
                </Box>
            </Box>
        </Grid>
    )
}
