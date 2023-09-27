import { combineReducers } from 'redux';


// Define el estado inicial (initialState)
const initialState = {
    // Define las propiedades iniciales de tu estado aquí
    // Por ejemplo:
    counter: 0,
    user: null,
  };
// Define un reducer para una característica específica
const caracteristicaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCION_TIPO':
      // Realiza cambios en el estado según la acción
      return {
        ...state,
        // Actualiza propiedades según sea necesario
      };
    default:
      return state;
  }
};

// Si tienes varios reducers, combínalos en uno solo
const rootReducer = combineReducers({
  caracteristica: caracteristicaReducer,
  // Agrega otros reducers aquí
});

export default rootReducer;
