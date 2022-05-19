/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';

import { loadReports } from '../state/actions';
import CustomCard from '../Components/CustomCard';
import BusinessImg from '../assets/images/Business.png';
import EducationImg from '../assets/images/Education.png';
import ExpenseImg from '../assets/images/Expense.png';
import SalesImg from '../assets/images/Sales.png';
import OthersImg from '../assets/images/Others.png';
import ChartStepper from '../Components/ChartStepper';

export default function Reports() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (payload) => {
    console.log(payload);

    // handleClose();
  };

  const handleDelete = (id) => {
    dispatch(loadReports(id));
  };

  const renderImg = (type) => {
    switch (type) {
      case 'Education':
        return EducationImg;
      case 'Expense':
        return ExpenseImg;
      case 'Sales':
        return SalesImg;
      case 'Business':
        return BusinessImg;
      case 'Others':
        return OthersImg;
      default:
        return OthersImg;
    }
  };

  useEffect(() => {
    dispatch(loadReports());
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {([]).map(({
          id, name, desc, type,
        }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <CustomCard
              type="report"
              cardName={name}
              cardDesc={desc}
              handleDelete={() => handleDelete(id)}
              imgSrc={renderImg(type)}
            />
          </Grid>
        ))}
        <Grid item key="add-card" xs={12} sm={6} md={4}>
          <CustomCard action="add" type="chart" handleClickOpen={handleClickOpen} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          New Chart
        </DialogTitle>
        <DialogContent>
          <ChartStepper
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
