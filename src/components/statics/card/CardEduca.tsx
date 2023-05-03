import React from 'react'
import { CardMedia, Typography, CardContent } from '@mui/material';


//linha 7 cria uma tipagem para os dados do card

interface CardProps {
    imagemInfo: {
        url: string;
        alt: string;
    };
    tituloCard: string;
    cardConteudo: string;
}

export function Cards({ imagemInfo, tituloCard, cardConteudo }: CardProps) {

    return (
        <>
            <CardMedia
                sx={{ height: 160 }}
                image={imagemInfo.url}
                title={imagemInfo.alt}
                
            />
            <CardContent sx={{height: 150}} >
                <Typography gutterBottom variant="h5" component="div" color="white">
                    {tituloCard}
                </Typography>
                <Typography variant="body2" color="white">
                    {cardConteudo}
                </Typography>
            </CardContent>
        </>
    )
}

