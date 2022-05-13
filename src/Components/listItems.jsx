/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <>
    <ListItem
      button
      component={Link}
      to="/dashboards"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/charts"
    >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Charts" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/reports"
    >
      <ListItemIcon>
        <TopicOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </>
);
