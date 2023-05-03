import Categoria from './Categoria';
// import User from './User';
interface Produto {
    id: number;
    nomeProduto: string;
    quantidade: number;
    preco: number;
    fotoProduto: string;
    doacaoTotal: number;
    categoria?: Categoria | null
    // usuario?: User | null
    isDoacao: boolean;
}

export default Produto;