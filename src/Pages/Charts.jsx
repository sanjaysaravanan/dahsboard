/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Box, ButtonBase, CircularProgress } from '@mui/material';

import {
  loadReports, createChart, loadCharts, loadChart,
} from '../state/actions';
import CustomCard from '../Components/CustomCard';
import ChartStepper from '../Components/ChartStepper';
import LineChart from '../Components/Charts/CustomLineChart';
import { deleteChart } from '../api/api';

export default function Reports() {
  const dispatch = useDispatch();

  const chartsData = useSelector(({ charts }) => charts.charts);
  const { isLoading = false, selectedChart = null } = useSelector(({ charts }) => charts);
  const [open, setOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (payload, type) => {
    dispatch(createChart(payload, type));
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteChart(id));
  };

  const handleViewChart = (chartObj) => {
    setChartOpen(true);
    setChartData(chartObj);
    dispatch(loadChart(chartObj));
  };

  const handleCloseChart = () => {
    setChartOpen(false);
  };

  useEffect(() => {
    dispatch(loadReports());
    dispatch(loadCharts());
  }, []);

  // useEffect(() => {
  //   if(chartData) {

  //   }
  // }, )

  return (
    <>
      <Grid container spacing={4}>
        {chartsData.map((cardObj) => (
          <Grid item key={cardObj.name} xs={12} sm={6} md={4}>
            <CustomCard
              type="chart"
              cardName={cardObj.name}
              cardDesc={cardObj.desc}
              handleDelete={() => handleDelete(cardObj.id)}
              handleViewChart={handleViewChart}
              imgType={cardObj.type}
              cardData={cardObj}
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
      <Dialog
        open={chartOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" justifyContent="space-between">
            {chartData?.name}
            <ButtonBase onClick={handleCloseChart}>
              <CloseIcon />
            </ButtonBase>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth="500px"
            m={2}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box width="100%">
                {selectedChart && (
                  <LineChart />
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
