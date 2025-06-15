import { useState, useEffect } from 'react'
import axios from 'axios';
import Table from './components/tables/table';
import './App.css'
import { normaliser } from './utils/normaliser';

type CarbonData = {
  from: string;
  to: string;
  intensity_forecast: number;
  intensity_actual: number;
  index: string;
  gas: number;
  coal: number;
  biomass: number;
  nuclear: number;
  hydro: number;
  imports: number;
  wind: number;
  solar: number;
  other: number;
  misc: number;
};

function App() {
  const [data, setData] = useState<CarbonData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const url = 'http://localhost:3001/api/intensity'

  const fetchInfo = () => {
    return axios.get(url)
      .then((response) => {
        const rawData = response.data
        if (rawData.length > 0) {
          const rawHeaders = Object.keys(rawData[0])
          const [normHeaders, normData] = normaliser(rawHeaders, rawData)
          setHeaders(normHeaders)
          setData(normData)
        }
      })
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  // console.log(data);

  return (
    <>
      <div>
        <h1>Carbon Intensity</h1>
        <Table headers={headers} data={data} />
      </div>
    </>
  )
}

export default App
