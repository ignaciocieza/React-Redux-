import React from 'react';
import { Field, reduxForm } from "redux-form";
import provinces from './provinces';


class Form extends React.Component {

    /**
     * funcion que genera el contendor del error a mostrar.
     */
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>
                        {error}
                    </div>
                </div>
            );
        }
    }

    /**
     * funcion que muestra distintas clases de los campos "input" del formulario,
     * en base a la validacion de estos campos.
     */
    renderInput = ({ input, label, meta }) => {
        let className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    /**
     * Dropbox
     */
    renderSelect = ({ input, label, meta , children }) => {
        let className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <select {...input}>
                    {children}
                </select>
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }
    
    // HACER : textarea -- checkbox --  

    /**
     * funcion que envia, a traves de otra funcion,
     * los campos con los datos del formulario  a la base de datos
     */
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }


    render() {
        return (
            <form
                className='ui form error'
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field name='title' component={this.renderInput} label='Ingrese su nombre:' />
                <Field name='description' component={this.renderInput} label='Ingrese un titulo:' />
                <Field name='video' component={this.renderInput} label='Link del Video (para cargar video, click en "Cargar Video"):' />
                <Field name="province" label="Province" component={this.renderSelect}>
                    <option />
                    {provinces.map(province =>
                        <option key={province} value={province}>
                            {province}
                        </option>
                    )}
                </Field>
                <button type='submit' className='ui left floated button primary'>{this.props.buttonName}</button>
            </form>
        );
    }
}

/**
 * Funcion para validar los campos del formulario
 * @param {*campos del formulario} formValues 
 */
let validate = (formValues) => {
    let errors = {};

    if (!formValues.title) {
        errors.title = 'Ingrese su nombre!';
    }
    if (!formValues.description) {
        errors.description = 'Ingrese un titulo!';
    }
    return errors;
};

export default reduxForm({
    form: 'Form',
    validate
})(Form);

