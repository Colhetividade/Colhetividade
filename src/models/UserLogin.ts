interface UserLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    tipoUsuario: string;
    token?: string| null;
}
export default UserLogin;