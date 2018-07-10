import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';

class EditComponent extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      newname: '',
	      newnumber: ''
 	 	}
 	 	this.handleChange = this.handleChange.bind(this);
	    this.handleUpdate = this.handleUpdate.bind(this);
 	}

 	handleChange(e){
 		console.log(e.target.name)
    	this.setState({
      		[e.target.name]:e.target.value,
	 	})
 	}
 	componentDidMount() {
 		const { name, number, id } = this.props.contact;
 		console.log(name, number);
 		this.setState({
 			newname:name,
 			newnumber: number,
 			id: id
 		})
 	}
	handleUpdate(e){
	  e.preventDefault();
	  let contact = {
	      name: this.state.newname,
	      number: this.state.newnumber,
	      id: this.state.id
  	    }
	    this.props.updateContact(contact);
	    this.setState({
			newname:"",
			newnumber: "",
	      	id: ''
	    });
	}
	render(){
		return(
			<form onSubmit={this.handleUpdate}>
		      <div className="row">
		        <div className="col-md-10">
		          <input type="text" onChange={this.handleChange} className="form-control"  value={this.state.newname} name="newname"/>
		          <br />
		          <input type="number" onChange={this.handleChange} className="form-control" value={this.state.newnumber} name="newnumber"/>
		        </div>
		        <div className="col-md-2">
		          <input type="submit" className="btn btn-success" value="UPDATE"/>
		        </div>
		      </div>
    		</form>
		);
	}
}
const mapStateToProps = (state, ownProps) => {  
  return {
    contacts: state.contacts
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
  	createContact: contact => dispatch(contactAction.createContact(contact)),
    updateContact: index =>dispatch(contactAction.updateContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);