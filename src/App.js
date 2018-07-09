import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class App extends Component {
 constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      number: '',
      edit: false,
      tableData: {
        nameandid: ["name","id"],
        nameandidrow: [{
          'name':'aishu',
          'id':'02',
          },
          {
         'name':'bharu',
          'id':'03',
          },
        ]
      },
      mess:"guys"
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

  listView(data, index){
    return (
        <tr key={index}>
          <td>
            {data.name}
          </td>
          <td>
            {data.number}
          </td>
          <td>
            <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
            </button>
          </td>
          <td>
            <button onClick={this.editContact.bind(this, data)} className="btn btn-warning">
             Edit
            </button>
          </td>
        </tr>
   
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
  }
  updateContact(e, index){
    e.preventDefault();
    this.props.updateContact(index);
  }

  editContact(data){
    this.setState({
      edit: !this.state.edit
    })
    console.log(data);
  }
  
  render() {
    var dataColumns = this.state.tableData.nameandid;
    var dataRows = this.state.tableData.nameandidrow;
    var tableHeaders = (<thead><tr>
      {dataColumns.map(function(column)
        {
        return <th>{column}</th>
        })}
      </tr></thead>)
      var tableBody = dataRows.map(function(row){
        return(
          <tr key={row.id}>
            {dataColumns.map(function(column){
              return <td>{row[column]}</td>;
            })}
          </tr>
        )
      });
    return(
    
      <div className="container">
        <div>
         <h2>Welcome, {this.state.mess}</h2>
        <table className="table table-bordered table-hover" width="100%">
          {tableHeaders}
          <tbody>
           {tableBody}
          </tbody>
        </table>
        </div>
        <h1>Sample form</h1>

        <hr />
        <div>
          <h3>Add Contact Form</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-10">
                  <input type="text"  onChange={this.handleChange} className="form-control" value={this.state.name} name="name"/>
                  <br />
                  <input type="number" onChange={this.handleChange} className="form-control" value={this.state.number} name="number"/>
                </div>
                <div className="col-md-2">
                  <input type="submit" className="btn btn-success" value="ADD"/>
                  
                </div>
              </div>
            </form>
          <hr />
        {
          <table className="table table-bordered table-hover" width="100%">
             {this.props.contacts.map((contact, i) => this.listView(contact, i))}
          </table>
        }
        </div>
        {this.state.edit&&<div>edit</div>}
      </div>
    )
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
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index =>dispatch(contactAction.deleteContact(index)),
    updateContact: index =>dispatch(contactAction.updateContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
