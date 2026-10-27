import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-apexcharts';
import './Vistas.css';


export const Por_provincia = () => {
  const url='http://192.168.1.2:3003/api/';
  const [provincias, setProvincias]=useState([]);
  const [cod_prv, setCod_prv]=useState([]);
  const [pob_var, setPob_var]=useState([]);
  const [pob_muj, setPob_muj]=useState([]);
  const [grupos, setGrupos]=useState([]);
  const [edades_espec, setEdades_espec]=useState([]);

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

  const get_cod_provincia=(event)=>{
    setCod_prv(event.target.value)
  }


  const get_tot_provincia=async()=>{
    try{
      const res = await axios.get(url+'piram_tot_provincia'+'/'+cod_prv);
      console.log('graf_prov:',res.data);
      const gru = res.data.map(prv=>prv.grupo);
      setGrupos(gru);
      const pob_masc = res.data.map(prv=>prv.masculino);
      setPob_var(pob_masc);
      const pob_fem = res.data.map(prv=>prv.femenino*-1);
      setPob_muj(pob_fem);
    }catch(error){
      console.error(error);
    }
  }

  const get_edades_espec_provincia=async()=>{
    try{
      const res = await axios.get(url+'edades_espec_provincia'+'/'+cod_prv);
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
    get_tot_provincia()
    get_edades_espec_provincia()
  },[cod_prv])
  return (
    <>
    <div className='container-fluid'>

      <div className='row'>
        <div className='col-8 shadow-md area_graf'>
          <div className='input-group shadow-lg'>
          <span className='input-group-text fs-6 fw-bold bg-secondary text-light'>Provincias</span>
          <select name="cmb_red" id="cmb_red" className='form-select form-szelect-md' onChange={get_cod_provincia}>
            <option value='-1'>Seleccione una Provincia</option>
            {
              provincias.map(prv=>(
                <option key={prv.cod_prov} value={prv.cod_prov}>
                  {prv.nom_prov}
                </option>
              ))
            }
          </select>
          </div>
          <div className='graf'>
            <Chart options={options} series={series} type="bar" width={'100%'} height={'100%'} />
          </div>
        </div>


        <div className='col-4 shadow-lg area_graf'>
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
