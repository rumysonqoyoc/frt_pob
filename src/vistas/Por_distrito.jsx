import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import './Vistas.css';


export const Por_distrito = () => {
  const url='http://192.168.1.2:3003/api/';
  const [provincias, setProvincias]=useState([]);
  const [cod_prv, setCod_prv]=useState([]);
  const [cod_dist, setCod_dist]=useState([]);
  const [pob_var, setPob_var]=useState([]);
  const [pob_muj, setPob_muj]=useState([]);
  const [grupos, setGrupos]=useState([]);
  const [edades_espec, setEdades_espec]=useState([]);
  const [distritos, setDistritos]=useState([]);
  const [nom_dist, setNom_dist]=useState([]);

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


  const get_provincias=async()=>{
    try{
      const res = await axios.get(url+'provincias');
      setProvincias(res.data);
    }catch(error){
      console.error(error);
    }
  }

  const get_distritos=async()=>{
    try{
      const res = await axios.get(url+'distritos'+'/'+cod_prv);
      setDistritos(res.data);
    }catch(error){
      console.error(error);
    }
  }


  const get_cod_prv=(event)=>{
    setCod_prv(event.target.value)
  }

  const get_cod_dist=(event)=>{
    setCod_dist(event.currentTarget.dataset.cod)
    setNom_dist(event.target.textContent)
    console.log('nom dist:',event.target.textContent);

  }


  const get_tot_distrito=async()=>{
    try{
      const res = await axios.get(url+'piram_tot_distrito'+'/'+cod_dist);
      const gru = res.data.map(red=>red.grupo);
      setGrupos(gru);
      const pob_masc = res.data.map(red=>red.masculino);
      setPob_var(pob_masc);
      const pob_fem = res.data.map(red=>red.femenino*-1);
      setPob_muj(pob_fem);
    }catch(error){
      console.error(error);
    }
  }


  const get_tot_micro_red=async()=>{
    try{
      const res = await axios.get(url+'piram_tot_micro_red'+'/'+cod_micro);
      const gru = res.data.map(red=>red.grupo);
      setGrupos(gru);
      const pob_masc = res.data.map(red=>red.masculino);
      setPob_var(pob_masc);
      const pob_fem = res.data.map(red=>red.femenino*-1);
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

  const get_edades_espec_distrito=async()=>{
    try{
      const res = await axios.get(url+'edades_espec_distrito'+'/'+cod_dist);
      setEdades_espec(res.data);
      console.log('res:',res);
    }catch(error){
      console.error(error);
    }
  }

  

  useEffect(()=>{
    get_provincias()
  },[])

  useEffect(()=>{
      get_distritos()
    },[cod_prv])
/*
  useEffect(()=>{
    get_tot_red()
    get_edades_espec_red()
  },[cod_red])

  */

  useEffect(()=>{
    get_tot_distrito()
    get_edades_espec_distrito()
  },[cod_dist])


  return (
    <>
    <div className='container-fluid'>

      <div className='row'>
        <div className='col-6 mb-3'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fw-bold bg-secondary text-light'>Provincias</span>
          <select name="cmb_red" id="cmb_red" className='form-select form-select-md' onChange={get_cod_prv}>
            <option value='-1'>Seleccione una provincia</option>
            {
              provincias.map(prv=>(
                <option key={prv.cod_prov} value={prv.cod_prov}>
                  {prv.nom_prov}
                </option>
              ))
            }
          </select>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-2 shadow-lg area_graf '>
          <p className='fs-4 fw-bold text-center rounded align-middle border shadow-md bg-primary text-white p-2'>Distritos</p>
          <ul name="lst_mic" id="lst_mic" className='micro_red'>
            {
              distritos.map(dst=>(
                <li key={dst.cod_dist} data-cod={dst.cod_dist} onClick={get_cod_dist} className='lista_micro'>
                  {dst.nom_dist}
                </li>
              ))
            }
          </ul>


        </div>
        <div className='col-7 shadow-lg area_graf'>
          <p className='fs-4 fw-bold text-center rounded align-middle border shadow-md'>Piramide poblacional distrito: {nom_dist}</p>
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
