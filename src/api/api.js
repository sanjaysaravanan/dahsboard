/* eslint-disable import/prefer-default-export */
import { dashboardInstance } from '../axios.config';

export const getReports = () => dashboardInstance.get('/reports');

export const postReport = (payload, config) => dashboardInstance.post('/reports', payload, config);
