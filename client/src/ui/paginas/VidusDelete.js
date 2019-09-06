import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import Notification from '../widgets/Notification';
import history from '../../api/history';
import { fetchVidUs, deleteVidUs } from "../../api/actions/index";

class VidusDelete extends React.Component {

    componentDidMount() {
        this.props.fetchVidUs(this.props.match.params.id);
    }

    /**
     * Funcion que puede pasarse como "props",
     * en el componente "Notification" para agregar botones ("aceptar/cancelar").
     */
    renderActions() {
        let { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteVidUs(id)}
                    className='ui button negative'
                >
                    Aceptar
                </button>
                <NavLink to='/' className='ui button'>Cancelar</NavLink>
            </React.Fragment>
        );
    } 
    /**
     * "Notification", por defecto el usuario tiene 3 segundos para 
     * aceptar borrar vidus. En caso de que pasen los 3 segundo o 
     * aprete cancelar sera redirigido a la pantalla principal
     */
    render() {
        return (
            <Notification
                title="Borrar VidUs?"
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
                //time={5000}
                time={null}
            />
        );
    };
}

let mapStateToProps = (estado, ownProps) => ({
    user: estado[ownProps.match.params.id]
});

let mapDispatchToProps = dispatch => ({
    fetchVidUs: bindActionCreators(fetchVidUs, dispatch),
    deleteVidUs: bindActionCreators(deleteVidUs, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VidusDelete);