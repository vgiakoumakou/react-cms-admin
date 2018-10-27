import React, { Component } from 'react';
import Joi from 'joi-browser';
import { FaEdit, FaUndo, FaPaperPlane } from 'react-icons/fa';

class EditPage extends Component {
    state = {
        page: { title: "PageAA", description: "DescrAA"},
        errors: {
            
        }
    };

    // Our schema for joi validation
    schema = {
        title: Joi.string().min(0).max(50).required().label('Title'),
        description: Joi.string().min(0).max(200).required().label('Description')
    };

    // Validate form
    validate = () => {
        const result = Joi.validate(this.state.page, this.schema, {abortEarly:false}); //abortEary: terminates validation as soon as it finds an error
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

    // Prevent the form submission which causes full page reload
    handleSubmit = e => {
        e.preventDefault();

        // Handle submission erros
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        // if we have errors, we return immediately and do not call the server
        if (errors) return;
        // Call the server
    };

    handleChange = ({ currentTarget: input })  => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        // clone state title
        const page = {...this.state.page};
        page[input.name] = input.value;

        //update the state
        this.setState({ page, errors });
    };

    render() {

        // we use object destructuring to avoid repetitions
        //const { page, errors } = this.state;

        return ( 
            <div>
                <h4><FaEdit /> Edit Page #{this.props.match.params.id}</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <hr />
                        <label htmlFor="title">Page Title *</label>
                        <div className="input-group">
                            <span className="input-group-addon"></span>
                            <input 
                                type="text" 
                                value={this.state.page.title} 
                                onChange={this.handleChange} 
                                name="title" 
                                id="title"
                                className="form-control" 
                                minlength="0" 
                                maxlength="50" 
                                autoFocus />
                        </div>
                        {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
                        <label htmlFor="description">Page Description *</label>
                        <div className="input-group">
                            <span className="input-group-addon"><FaEdit /></span>
                            <textarea 
                                type="text"
                                value={this.state.page.description} 
                                onChange={this.handleChange} 
                                name="description"
                                id="description" 
                                className="form-control" 
                                minlength="0" 
                                maxlength="200"
                                rows="2">
                            </textarea>
                        </div>
                        {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
                        <button type="submit" disabled={this.validate()} className="btn btn-primary"><FaPaperPlane /> Save Changes </button>
                        <button className="btn btn-secondary"><FaUndo /> Cancel</button>
                    </div>
                </form>
            </div> );
    }
}

export default EditPage;