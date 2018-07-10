import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormComponent from './Form';
import EditComponent from './EditForm';

class App extends Component {
 constructor(props){
    super(props);
    this.state = {
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
      mess:"guys",
      isOpen: false
    }
  }
 
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
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
  
  editContact(data){
    this.setState({
      edit: !this.state.edit,
      newData : data
    })
    editing:false,
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
            <FormComponent />
        <hr/>
        <div>
          <h3>Add Contact Form</h3>
          <hr />
        {
          <table className="table table-bordered table-hover" width="100%">
             {this.props.contacts.map((contact, i) => this.listView(contact, i))}
          </table>
        }
        </div>
        {this.state.edit &&
          <div>
            <EditComponent contact={this.state.newData} />
          </div>
          }
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
    deleteContact: index =>dispatch(contactAction.deleteContact(index)),
    editContact: index =>dispatch(contactAction.editContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
