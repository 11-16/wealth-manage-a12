import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MetroCard(props) {
  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: '0',
      gridColumn: `${props.gridCol}`,
      gridRow: `${props.gridRow}`,
      backgroundColor: 'green'
    }} onClick={props.handleclick}>
      <CardActionArea
        sx={{
          width: '100%',
          height: '100%'
        }}>
        <CardContent>
          {props.icon}
          <Typography variant="body2" color="#cecece">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
