import axios from 'axios';

const BASE = "http://127.0.0.1:5000/api";

export const checkHealth = () =>
  axios.get(`${BASE}/health`);

export const getTaxInfo = () =>
  axios.get(`${BASE}/tax-info`);

export const calcSalaryTax = (data) =>
  axios.post(`${BASE}/salary-tax`, data);

export const calcPrepayment = (data) =>
  axios.post(`${BASE}/prepayment-tax`, data);

export const calcPenalty = (data) =>
  axios.post(`${BASE}/penalty`, data);

export const calcPatentTax = (data) =>
  axios.post(`${BASE}/patent-tax`, data);