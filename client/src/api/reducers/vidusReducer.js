import _ from 'lodash'; // --> ver como reemplazar por las dudas!!!
import { 
    CREATE_VIDUS,
    FETCH_VIDUSS,
    FETCH_VIDUS,
    DELETE_VIDUS,
    EDIT_VIDUS,
} from "../actions/types"; 

let estadoInicial={
    currentUser:1
}

let vidusReducer = (estado = estadoInicial, action) => {
    switch (action.type) {
        case FETCH_VIDUSS:
            return { ...estado,..._.mapKeys(action.payload, 'id') }
        case FETCH_VIDUS:
        case CREATE_VIDUS:
        case EDIT_VIDUS:
            return { ...estado, [action.payload.id]: action.payload, currentUser:action.payload.id }; 
        case DELETE_VIDUS:
            return _.omit(estado, action.payload);
        default:
            return estado;
    }
}

export default vidusReducer;