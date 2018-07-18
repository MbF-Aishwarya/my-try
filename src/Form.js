import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class FormComponent extends Component {
	constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      number: ''
 	 }
 	}
  	handleChange(e){
	    console.log(e.target.name);
	    this.setState({
	      [e.target.name]:e.target.value,
	    })
 	}
 	 handleSubmit(e){
	    e.preventDefault();
	    let contact = {
	      name: this.state.name,
	      number: this.state.number,
	      id: new Date().toString()
	    }
	    this.props.createContact(contact);
	    this.setState({
	      name: '',
	      number: '',
	      id: ''
	    });
  	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
		      <div className="row">
		        <div className="col-md-12">
		          <h4>Name : </h4><input type="text"  onChange={this.handleChange} className="form-control" value={this.state.name} name="name"/>
		          <br />
		          <h4>ContactNumber :</h4><input type="number" onChange={this.handleChange} className="form-control" value={this.state.number} name="number"/>
		        </div>
		        <div className="col-md-2">
		        	<br />
		          <input type="submit" className="btn btn-success" value="ADD"/>
		        </div>
		      </div>
    		</form>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    contacts: state.contacts
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
