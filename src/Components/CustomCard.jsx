import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export default function CustomCard({
  cardName,
  cardDesc,
  type,
  action = 'display',
  handleClickOpen,
  handleDelete,
  imgSrc,
}) {
  if (action === 'add') {
    return (
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="button"
          sx={{
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ fontSize: '128px' }} />
        </CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Add New
            {' '}
            {type === 'report' ? 'Report' : 'Chart'}
          </Typography>
          {type === 'report' ? (
            <Typography>
              New Report, which can be used to generate Dashboard with Charts
            </Typography>
          ) : (
            <Typography>
              New Chart, which can be used to create Dashboard
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        sx={{
          maxHeight: '200px',
        }}
        image={imgSrc}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {cardName}
        </Typography>
        {cardDesc && (
          <Typography>
            {cardDesc}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}
