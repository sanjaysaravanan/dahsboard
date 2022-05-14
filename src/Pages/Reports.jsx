/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Autocomplete, InputLabel, Stack, TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { loadReports } from '../state/actions';

// const cards = [];

const types = [
  { label: 'Education', id: 1 },
  { label: 'Expense', id: 2 },
  { label: 'Sales', id: 3 },
  { label: 'Stock', id: 4 },
];

export default function Reports() {
  const dispatch = useDispatch();
  const reportsData = useSelector(({ reports }) => reports.reports);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(loadReports());
    // eslint-disable exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {reportsData.map(({ name, desc }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxHeight: '200px',
                }}
                image="https://source.unsplash.com/random"
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography>
                  {desc}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item key="add-card" xs={12} sm={6} md={4}>
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
                Add New Report
              </Typography>
              <Typography>
                New Report, which can be used to generate Dashboard with Graphs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          New Report
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText id="alert-dialog-description">
              New Report which can be used to generate graphs & dashboard
            </DialogContentText>
            <TextField
              type="text"
              name="report-name"
              size="small"
              label="Report Name"
              fullWidth
            />
            <div>
              <InputLabel>
                Choose Excel File
              </InputLabel>
              <TextField
                type="file"
                name="report-file"
                size="small"
                fullWidth
              />
            </div>
            <TextField
              type="text"
              name="report-desc"
              size="small"
              label="Report Description"
              multiline
              rows={2}
              fullWidth
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={types}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Report Type" size="small" />}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
