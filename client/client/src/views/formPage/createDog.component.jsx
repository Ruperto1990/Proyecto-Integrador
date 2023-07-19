import './createDog.styles.css';
import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/navigationBar/navigationBar.component';
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, postNewBreed } from '../../redux/actions.js';
import dogGC from '../../assets/ce8b1e76965389.5c7945b0cffef.gif';


function CreateDog() {
  const dispatch = useDispatch();
  const { temperaments } = useSelector(state => state);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const [input, setInputState] = useState({
    imagen: "",
    nombre: "",
    alturaMax: "",
    alturaMin: "",
    peso: "",
    anios_de_vida: "",
  });

  const [errorData, setErrorData] = useState({
    imagen: "",
    nombre: "",
    alturaMax: "",
    alturaMin: "",
    peso: "",
    anios_de_vida: "",
  });

  function validate(input) {
    const errors = {};
    if (!/^[a-zA-Z ]+$/.test(input.nombre)) {
      errors.nombre = "Nombre inválido";
    }
    const alturaMax = parseInt(input.alturaMax);
    const alturaMin = parseInt(input.alturaMin);
    if (isNaN(alturaMax) || isNaN(alturaMin) || alturaMax <= alturaMin) {
      errors.alturaMax = "Altura máxima debe ser mayor que altura mínima";
      errors.alturaMin = "Altura mínima debe ser menor que altura máxima";
    }
    if (!/^\d+(\.\d+)?$/.test(input.peso)) {
      errors.peso = "Peso inválido";
    }
    if (!/^\d+(\.\d+)?$/.test(input.anios_de_vida)) {
      errors.anios_de_vida = "Años inválidos";
    }
    setErrorData(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (validate(input)) {
      const altura = `${input.alturaMin} - ${input.alturaMax}`;
      const firsTemperament = selectedTemperaments[0];
      const secondTemperament = selectedTemperaments[1];

      const submitData = {
        imagen: "",
        nombre: input.nombre,
        altura: altura,
        peso: input.peso,
        anios_de_vida: input.anios_de_vida,
        temperamentos: [firsTemperament, secondTemperament]
      };

      dispatch(postNewBreed(submitData));
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setInputState({
      ...input,
      [event.target.name]: event.target.value
    });

    validate({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  function handledTemperaments(event) {
    event.preventDefault();
    const selection = event.target.value;
    if (selectedTemperaments.length < 2) {
      setSelectedTemperaments([...selectedTemperaments, selection]);
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className='formContainer'>
      <img src={dogGC} alt="dog" className="dogGift" />
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label'>Nombre: </label>
            <input className='input' name='nombre' value={input.nombre} onChange={handleChange} placeholder='Raza' />
            <span className='span'>{errorData.nombre}</span>
          </div>
          <div>
            <label className='label'>Altura máxima: </label>
            <input className='input' name='alturaMax' value={input.alturaMax} placeholder='max' onChange={handleChange} />
            <span className='span'>{errorData.alturaMax}</span>
          </div>
          <div>
            <label className='label'>Altura mínima: </label>
            <input className='input' name='alturaMin' value={input.alturaMin} placeholder='min' onChange={handleChange} />
            <span className='span'>{errorData.alturaMin}</span>
          </div>
          <div>
            <label className='label'>Peso: </label>
            <input className='input' name='peso' value={input.peso} placeholder='Peso' onChange={handleChange} />
            <span className='span'>{errorData.peso}</span>
          </div>
          <div>
            <label className='label'>Años de vida: </label>
            <input className='input' name='anios_de_vida' value={input.anios_de_vida} placeholder='Años de vida' onChange={handleChange} />
            <span className='span'>{errorData.anios_de_vida}</span>
          </div>
          <div>
            <label className='label'>Seleccionar temperamentos: </label>
            <select className='input' name='temperamentoOne' value={selectedTemperaments[0]} onChange={handledTemperaments} disabled={selectedTemperaments.length >= 2}>
              <option value=''>Seleccione temperamento</option>
              {temperaments.map((temperament, index) => (
                <option key={index} value={temperament}>{temperament}</option>
              ))}
            </select>
            <select className='input' name='temperamentoTwo' value={selectedTemperaments[1]} onChange={handledTemperaments} disabled={selectedTemperaments.length >= 2}>
              <option value=''>Seleccione temperamento</option>
              {temperaments.map((temperament, index) => (
                <option key={index} value={temperament}>{temperament}</option>
              ))}
            </select>
            {selectedTemperaments.length >= 1 ? <span className='span'> Has seleccionado: {`${selectedTemperaments[0]} - ${selectedTemperaments[1]}`}</span> : <span className='span'> Selecciona dos temperamentos</span>}
          </div>
          {errorData.anios_de_vida ? null : <button className='submit' type='submit'>Crear raza</button>}
        </form>
      </div>
    </div>
  );
}

export default CreateDog;
