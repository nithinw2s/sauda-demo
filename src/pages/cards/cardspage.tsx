'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ActionAreaCard from './cards';
import { CardItem, cardsData } from '@/utils/carddata';
import Grid from '@mui/material/Grid';


const CardsPage: React.FC = () => {
    const [cards, setCards] = useState<CardItem[]>([]);
    


    useEffect(() => {
    fetch("/api/carddata")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={2}>
                {cards.map((item) => {
                    return (
                        <Grid component="div" key={item.id} sx={{ width: 300, height: 300 }}>
                            <ActionAreaCard data={item} />
                        </Grid>

                    )
                })}
            </Grid>
        </Box>
    );
};

export default CardsPage;
