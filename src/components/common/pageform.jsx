import React, { Component } from 'react';
import Joi from 'joi-browser';
import { FaEdit, FaUndo, FaPaperPlane } from 'react-icons/fa';

class PageForm extends Component {
    state = { 
        data: {},
        errors: {}
    };

    // Our schema for joi validation
    schema = {
        id: Joi.number().label('Id'),
        title: Joi.string().min(0).max(50).required().label('Title'),
        description: Joi.string().min(0).max(200).required().label('Description'),
        type: Joi.string().required().label('Page type'),
        isActive: Joi.label('Page activation'),
        publishedOn: Joi.string().label('Publication date')
    };

    // Validate form
    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly:false}); //abortEary: terminates validation as soon as it finds an error
        if (!result.error) {
            return null;
        }

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    // Validate a field
    validateProperty = ({ name, value }) => {     
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    // Handle the form submission
    handleSubmit = e => {
        // Prevent the default form submission which causes full page reload
        e.preventDefault();

        // Handle submission erros
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        // if we have errors, we return immediately and do not call the server
        if (errors) return;

        this.doSubmit();

    };

    // Handle the errors
    handleErrors = (input)  => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage)
            errors[input.name] = errorMessage;
        else
            delete errors[input.name];

        //update the state
        this.setState({ errors });
    }

    // Handle the change of the form's fields
    handleFieldChange = ({ currentTarget: input })  => {
        this.handleErrors(input);

        // clone state
        const data = {...this.state.data};
        data[input.name] = input.value;

        //update the state
        this.setState({ data });
    };

    // Handle the change of boolean fields of the form
    handleBooleanChange = ({ currentTarget: input })  => {
        this.handleErrors(input);

        // clone state
        const data = {...this.state.data};
        data[input.name] = input.value === 'true' ? true: false; 

        //update the state
        this.setState({ data });
    };


    // Render the form submission button
    renderSubmitButton(label) {
        return (
            <button 
                onClick={this.handleSubmit}
                disabled={this.validate()} 
                className="btn btn-primary">
                    <FaPaperPlane /> Save Changes 
            </button>
        );
    }

    // Render cancel button
    renderCancelButton() {
        return (
            <button
                onClick={() => {this.props.history.push('/pages')}}
                className="btn btn-secondary">
                    <FaUndo /> Cancel
            </button>
        );
    }

    renderPageForm() {
        return ( 
            <div>
                <div className="form-group">
                    <hr />
                    <label htmlFor="title">Page Title *</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaEdit /></span>
                        </div>
                        <input 
                            type="text" 
                            value={this.state.data.title} 
                            onChange={this.handleFieldChange} 
                            name="title" 
                            id="title"
                            className="form-control" 
                            autoFocus />
                    </div>
                    {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Page Description *</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaEdit /></span>
                        </div>
                        <textarea 
                            type="text"
                            value={this.state.data.description} 
                            onChange={this.handleFieldChange} 
                            name="description"
                            id="description" 
                            className="form-control" 
                            rows="2">
                        </textarea>
                    </div>
                    {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">Page type *</label>
                    <select value={this.state.data.type} onChange={this.handleFieldChange} id="type" name="type" className="custom-select">
                        <option value=""></option>
                        <option value="0">Menu</option>
                        <option value="1">Events</option>
                        <option value="2">Content</option>
                    </select>
                    {this.state.errors.type && <div className="alert alert-danger">{this.state.errors.type}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">Page is active *</label>                
                    <div className="form-check">
                        <input 
                            type="radio" 
                            onChange={this.handleBooleanChange}
                            checked={this.state.data.isActive===true}
                            value="true" 
                            className="form-check-input" 
                            name="isActive"
                            id="isActiveTrue" />
                        <label className="form-check-label" htmlFor="isActiveTrue">Yes</label>
                    </div>
                    <div className="form-check">
                        <input 
                            type="radio" 
                            onChange={this.handleBooleanChange}
                            checked={this.state.data.isActive===false}
                            value="false" 
                            className="form-check-input" 
                            name="isActive"
                            id="isActiveFalse" />
                        <label className="form-check-label" htmlFor="isActiveFalse">No</label>
                    </div>   
                </div>             
                <div className="form-group">
                    <label htmlFor="publishedOn">Date of publish: </label>
                    <div className="input-group" hidden>
                        <span className="input-group-addon"><FaEdit /></span>
                        <input 
                            type="text"
                            value={this.state.data.publishedOn}
                            onChange={this.handleInputChange} 
                            name="publishedOn"
                            id="publishedOn" 
                            className="form-control"
                            readOnly/>
                    </div>
                    <p>{new Date(this.state.data.publishedOn).toLocaleDateString()}</p>
                </div>
                <div className="form-group">
                    {this.renderSubmitButton("Save Changes")}
                    {this.renderCancelButton()}
                </div>
            </div>
        );
    }

}
 
export default PageForm;