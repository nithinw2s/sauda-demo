import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ActionAreaCardProps {
  data: CardData;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 345, height:300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data?.image}
          alt={data?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
