// const axios = require('axios');
// const { Buffer } = require('buffer');
import axios from 'axios';
import { Buffer } from 'buffer';

export const getDeviceStatus = async (req, res) => {
  const apiUrl = 'https://api.netpie.io/v2/device/status';
  const clientID = "98681b12-4bd9-47e2-b248-95c76fde1038";
  const token = "G9jXkZiRJNbFbDmK2LWQKNNgMLZZL1xt";
  try {
    const authHeader = `Basic ${Buffer.from(`${clientID}:${token}`).toString('base64')}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authHeader,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'fetch error krub, so sad' });
  }
};

export const getDeviceStatusShadow = async (req, res) => {
  const apiUrl = 'https://api.netpie.io/v2/device/shadow/data';
  const clientID = "98681b12-4bd9-47e2-b248-95c76fde1038";
  const token = "G9jXkZiRJNbFbDmK2LWQKNNgMLZZL1xt";
  try {
    const authHeader = `Basic ${Buffer.from(`${clientID}:${token}`).toString('base64')}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authHeader,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'fetch error krub, so sad' });
  }
};