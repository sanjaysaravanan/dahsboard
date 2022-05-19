/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import {
  Autocomplete, InputLabel, Stack, TextField, Typography, useTheme, Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DeleteOutline } from '@mui/icons-material';

const steps = [
  'Choose a Report',
  'Choose a Chart',
  'Chart Details',
];

const chartsObjs = [
  { label: 'Pie', id: 'pie' },
  { label: 'Line', id: 'line' },
  { label: 'Bar', id: 'bar' },
];

const accumulators = [
  { label: 'Average', id: 'avg' },
  { label: 'Sum', id: 'sum' },
];

function LineAdd({ dataOptions, handleAddLine }) {
  const theme = useTheme();
  const [lineData, setLineData] = useState(null);
  const [color, setColor] = useState('#ff0000');
  // eslint-disable-next-line no-unused-vars
  const [accumulator, setAccumulator] = useState(accumulators[0]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        padding: 2,
      }}
      spacing={2}
    >
      <Autocomplete
        disablePortal
        id="line-data"
        options={dataOptions}
        sx={{ width: 250 }}
        value={lineData}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a data"
            size="small"
          />
        )}
        onChange={(_, dataObj) => setLineData(dataObj)}
      />
      <TextField
        name="chart-desc"
        size="small"
        label="Line Color"
        sx={{ width: 150 }}
        defaultValue="#ff0000"
        value={color}
        InputProps={{
          endAdornment: <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />,
        }}
        onChange={(e) => setColor(e.target.value)}
      />
      <Autocomplete
        disablePortal
        id="accumulator"
        value={accumulator}
        options={accumulators}
        sx={{ width: 250 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Group as"
            size="small"
          />
        )}
        onChange={(_, accuData) => setAccumulator(accuData)}
      />
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          handleAddLine({
            dataField: lineData.id,
            color,
            accumulator: accumulator.label,
          });
          setLineData(null);
          setColor('#ff0000');
          setAccumulator(accumulators[0]);
        }}
        size="small"
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
}

function LineDetail({
  id, dataField, color, accumulator, handleDelete,
}) {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.spacing(1),
        padding: 1,
        my: 1,
      }}
      spacing={2}
    >
      <TextField label="Data" value={dataField} size="small" disabled />
      <TextField
        label="Color"
        value={color}
        size="small"
        sx={{ width: 200 }}
        InputProps={{
          endAdornment: <Box
            bgcolor={color}
            height={theme.spacing(3)}
            width={theme.spacing(5)}
          />,
        }}
        disabled
      />
      <TextField label="Group as" value={accumulator} size="small" disabled />
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          handleDelete(id);
        }}
        size="small"
      >
        <DeleteOutline />
      </Fab>
    </Stack>
  );
}

export default function ChartStepper({ handleSubmit, handleClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [chartReport, setReport] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [dataOptions, setDataOptions] = useState([]);
  const [axisOptions, setAxisOptions] = useState([]);
  const [lines, setLines] = useState([]);

  const reportsData = useSelector(({ reports }) => reports.reports);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddLine = (obj) => {
    const lineData = {
      ...obj,
      id: (lines.length + 1).toString(),
    };
    const newLines = [...lines, lineData];
    setLines(newLines);
  };

  const handleDeleteLine = (lineId) => {
    setLines(lines.filter(({ id }) => id !== lineId));
  };

  useEffect(
    () => () => {
      setReport(null);
      setChartType(null);
    },
    [],
  );

  return (
    <Box sx={{ width: '100%', minWidth: '1000px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box m={3} minHeight="250px">
        {activeStep === 0 && (
          <Autocomplete
            disablePortal
            id="chart-report"
            options={reportsData}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Choose a report for the chart" size="small" />}
            onChange={(_, reportObj) => {
              setReport(reportObj);
              const options = reportObj.dataFields.map((ele) => ({ label: ele, id: ele }));
              setDataOptions(options);
              setAxisOptions(reportObj.fields.map((ele) => ({ label: ele, id: ele })));
            }}
            getOptionLabel={(option) => option.name}
          />
        )}
        {activeStep === 1 && (
          <Autocomplete
            disablePortal
            id="chart-type"
            options={chartsObjs}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Choose a chart" size="small" />}
            onChange={(_, reportObj) => setChartType(reportObj.id)}
          />
        )}
        {activeStep === 2 && (
          <>
            {chartType === 'line' && (
              <Stack spacing={2}>
                <TextField
                  type="text"
                  name="chart-name"
                  size="small"
                  label="Chart Name"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  type="text"
                  name="chart-desc"
                  size="small"
                  label="Chart Description"
                  multiline
                  rows={2}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Autocomplete
                  disablePortal
                  id="x-axis"
                  options={axisOptions}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Horizontal Axis"
                      size="small"
                    />
                  )}
                  onChange={(_, axisObj) => setXAxis(axisObj.id)}
                />
                <div>
                  <InputLabel>
                    Lines for the Chart
                  </InputLabel>
                  {lines.map((lineObj) => (
                    <LineDetail
                      {...lineObj}
                      handleDelete={handleDeleteLine}
                    />
                  ))}
                  <Typography variant="h6" marginY={1}>Add New Line</Typography>
                  <LineAdd dataOptions={dataOptions} handleAddLine={handleAddLine} />
                </div>
              </Stack>
            )}
            <Box />
          </>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>
        {activeStep === steps.length - 1
          ? (
            <Button
              onClick={() => handleSubmit({
                name,
                reportId: chartReport.id,
                description,
                type: chartType,
                xaxis: xAxis,
                lines,
              })}
            >
              Generate Chart
            </Button>
          )
          : <Button onClick={handleNext}>Next</Button>}
      </Box>
    </Box>
  );
}
