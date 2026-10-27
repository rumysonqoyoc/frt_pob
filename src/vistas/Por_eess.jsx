import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import './Vistas.css';


export const Por_eess = () => {
  const url='http://192.168.1.2:3003/api/';
  const [redes, setRedes]=useState([]);
  const [eess, setEess]=useState([]);
  const [cod_red, setCod_red]=useState([]);
  const [cod_micro, setCod_micro]=useState([]);
  const [pob_var, setPob_var]=useState([]);
  const [pob_muj, setPob_muj]=useState([]);
  const [grupos, setGrupos]=useState([]);
  const [edades_espec, setEdades_espec]=useState([]);
  const [micro_redes, setMicro_redes]=useState([]);
  const [nom_micro, setNom_micro]=useState([]);
  const [cod_eess, setCod_eess]=useState([]);
  const [nom_eess, setNom_eess]=useState([]);

  const series = [
    {
      name: 'Hombres',
      data: pob_var
    },
    {
      name: 'Mujeres',
      data: pob_muj
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      //height: 450,
      stacked: true // Apila ambas barras en la misma fila
    },
    legend: {
        show: false,
      },
    colors: ['#008FFB', '#FF4560'], // Colores para Hombres y Mujeres
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '90%' // Grosor de las barras
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.abs(val); // Elimina el signo negativo al mostrar el número
      }
    },
    /*title: {
      text: 'Pirámide de Población (en miles)',
      align: 'center'
    },*/
    xaxis: {
      categories: grupos,
      title: {
        text: 'Población'
      },
      labels: {
        formatter: function (val) {
          return Math.abs(val); // Formato para el eje X
        }
      }
    },
    yaxis: {
      title: {
        text: 'Grupos de Edad'
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return Math.abs(val); // Muestra valor positivo en el tooltip
        }
      }
    }
  };


  const get_redes=async()=>{
    try{
      const res = await axios.get(url+'redes');
      setRedes(res.data);
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


  const get_eess=async()=>{
    try{
      const res = await axios.get(url+'eess'+'/'+cod_micro);
      setEess(res.data);
      console.log('url:',url+'eess'+'/'+cod_micro);
      console.log('eess:',res.data);
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

  const get_cod_eess=(event)=>{
    setCod_eess(event.currentTarget.dataset.cod)
    setNom_eess(event.target.textContent)
    console.log('cod estab:',event.currentTarget.dataset.cod);
    console.log('nom estab:',event.target.textContent);
  }

const get_tot_eess=async()=>{
    try{
      const res = await axios.get(url+'piram_tot_eess'+'/'+cod_eess);
      const gru = res.data.map(est=>est.grupo);
      setGrupos(gru);
      const pob_masc = res.data.map(est=>est.masculino);
      setPob_var(pob_masc);
      const pob_fem = res.data.map(est=>est.femenino*-1);
      setPob_muj(pob_fem);
    }catch(error){
      console.error(error);
    }
  }


  const get_edades_espec_red=async()=>{
    try{
      const res = await axios.get(url+'edades_espec_red'+'/'+cod_red);
      setEdades_espec(res.data);
      console.log('res:',res);
    }catch(error){
      console.error(error);
    }
  }

  const get_edades_espec_micro_red=async()=>{
    try{
      const res = await axios.get(url+'edades_espec_micro_red'+'/'+cod_micro);
      setEdades_espec(res.data);
      console.log('res:',res);
    }catch(error){
      console.error(error);
    }
  }

  const get_edades_espec_eess=async()=>{
    try{
      const res = await axios.get(url+'edades_espec_eess'+'/'+cod_eess);
      setEdades_espec(res.data);
      console.log('res:',res);
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
      get_eess()
    },[cod_micro])

  useEffect(()=>{
    get_tot_eess()
    get_edades_espec_eess()
  },[cod_eess])



  return (
    <>
    <div className='container-fluid'>

      <div className='row'>
        <div className='col-6 mb-3'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fw-bold bg-secondary text-light'>Redes</span>
          <select name="cmb_red" id="cmb_red" className='form-select form-select-md' onChange={get_cod_red}>
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
        </div>

        <div className='col-6 mb-3'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fw-bold bg-secondary text-light'>Micro Redes</span>
          <select name="cmb_mic" id="cmb_mic" className='form-select form-select-md' onChange={get_cod_micro}>
            <option value='-1'>Seleccione una Micro red</option>
            {
              micro_redes.map(mic=>(
                <option key={mic.cod_micro} value={mic.cod_micro}>
                  {mic.nom_micro}
                </option>
              ))
            }
          </select>
          </div>
        </div>


          

      </div>

      <div className='row'>
        <div className='col-2 shadow-lg area_graf '>
          <p className='fs-5 fw-bold text-center rounded align-middle border shadow-md bg-primary text-white p-2'>Establecimientos</p>
          <ul name="lst_mic" id="lst_mic" className='micro_red'>
            {
              eess.map(est=>(
                <li key={est.cod_eess} data-cod={est.cod_eess} onClick={get_cod_eess} className='lista_micro'>
                  {est.nom_eess}
                </li>
              ))
            }
          </ul>


        </div>
        <div className='col-7 shadow-lg area_graf'>
          <p className='fs-4 fw-bold text-center rounded align-middle border shadow-md'>Piramide poblacional - {nom_eess}</p>
            <div className='graf'>
            <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
          </div>
        </div>
        <div className='col-3 shadow-lg area_graf'>
          <div className='graf'>
            <table>
              <thead>
                <tr>
                  <th>Grupo de Edad</th>
                  <th>Población</th>
                </tr>
              </thead>
              <tbody>
                {edades_espec.map(eda=>(
                  <tr key={eda.desc_edad}>
                    <td>{eda.desc_edad}</td>
                    <td className='text-end'>{eda.pob}</td>
                  </tr> 
                ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
    </>
  )
}
