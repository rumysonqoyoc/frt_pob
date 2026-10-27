import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import './Vistas.css';

export const Inicio = () => {
  const url='http://192.168.1.2:3003/api/';

  const [redes, setProgramas]=useState([])
  const [micro_redes, setMicro_redes]=useState([])
  const [cod_red, setCod_red]=useState([])
  const [cod_micro, setCod_micro]=useState([])
  const [pob_micro, setPob_micro]=useState([])
  const [nom_micro, setNom_micro]=useState([])
  const [pob_eess, setPob_eess]=useState([])
  const [nom_eess, setNom_eess]=useState([])

  const options = {
    chart: {
      type: 'bar',
      width: '100%',
      height: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true, // Esto convierte el gráfico en horizontal
        borderRadius: 4
      }
    },
    xaxis: {
      categories: nom_micro
    }
  };


  const options_eess = {
    chart: {
      type: 'bar',
      width: '100%',
      height: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true, // Esto convierte el gráfico en horizontal
        borderRadius: 4
      }
    },
    xaxis: {
      categories: nom_eess
    }
  };

  const series = [{
    data: pob_micro
  }];

  const series_eess = [{
    data: pob_eess
  }];




  const get_redes=async()=>{
    try{
      const res = await axios.get(url+'redes');
      setProgramas(res.data);
    }catch(error){
      console.error(error);
    }
  }

  const get_micro_redes=async()=>{
    try{
      const res = await axios.get(url+'micro_redes'+'/'+cod_red);
      setMicro_redes(res.data);
    }catch(error){
      console.error(error);
    }
  }

  const get_cod_red=(event)=>{
    setCod_red(event.target.value)
  }

  const get_cod_micro=(event)=>{
    setCod_micro(event.target.value)
  }

  const get_pob_micro=async()=>{
    try{
      const res = await axios.get(url+'pob_tot_micro'+'/'+cod_red);
      const mr = res.data.map(mic=>mic.nom_micro);
      setNom_micro(mr);
      const pob = res.data.map(mic=>mic.pob);
      setPob_micro(pob);
    }catch(error){
      console.error(error);
    }
  }

  const get_pob_eess=async()=>{
    try{
      const res = await axios.get(url+'pob_tot_eess'+'/'+cod_micro);
      const est = res.data.map(est=>est.nom_eess);
      setNom_eess(est);
      const pob = res.data.map(est=>est.pob);
      setPob_eess(pob);
    }catch(error){
      console.error(error);
    }
  }

  

  useEffect(()=>{
    get_redes()
  },[])

  useEffect(()=>{
    get_micro_redes()
  },[cod_red])

  useEffect(()=>{
    get_pob_micro()
  },[cod_red])

  useEffect(()=>{
    get_pob_eess()
  },[cod_micro])
  

  return (
    <>
    <div className='container-fluid p-1'>

      <div className='row'>
        <div className='col-6 shadow-md area_graf'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fs-4 fw-bold bg-secondary text-light'>Redes</span>
          <select name="cmb_red" id="cmb_red" className='form-select form-szelect-md' onChange={get_cod_red}>
            <option value='-1'>Seleccione una red</option>
            {
              redes.map(red=>(
                <option key={red.cod_red} value={red.cod_red}>
                  {red.nom_red}
                </option>
              ))
            }
          </select>
          </div>
          <div className='graf'>
            <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
          </div>
        </div>

        <div className='col-6 shadow-md area_graf'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fs-4 fw-bold bg-secondary text-light'>Micro Redes</span>
          <select name="cmb_mic" id="cmb_mic" className='form-select form-szelect-md' onChange={get_cod_micro}>
            <option value='-1'>Seleccione una Micro Red</option>
            {
              micro_redes.map(mic=>(
                <option key={mic.cod_micro} value={mic.cod_micro}>
                  {mic.nom_micro}
                </option>
              ))
            }
          </select>
          </div>
          <div className='graf'>
            <Chart options={options_eess} series={series_eess} type="bar" width={'100%'} height={'100%'} />
          </div>
        </div>



      </div>

    </div>
    </>
  )
}
