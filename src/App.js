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
      }
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.setState({
      name: ''
    });
    this.props.createContact(contact);
  }

  listView(data, index){
    return (
      <div className="row">
        <div className="col-md-10">
          <td key={index}>
            {data.name}
          </td>
          <td>
            <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
            </button>
          </td>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
    </div> 
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index);
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
          <tr>
            {dataColumns.map(function(column){
              return <td>{row[column]}</td>;
            })}
          </tr>
        )
      });
    return(
      <div className="container">
        <div>
        <table className="table table-bordered table-hover" width="100%">
          {tableHeaders}
          {tableBody}
        </table>
        </div>
        <h1>Sample form</h1>
        <hr />
        <div>
          <h3>Add Contact Form</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-10">
                  <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name}/>
                </div>
                <div className="col-md-2">
                  <input type="submit" className="btn btn-success" value="ADD"/>
                </div>
              </div>
            </form>
          <hr />
        { <ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul> }
        {
          <table className="table table-bordered table-hover" width="100%">
            <tr>{this.props.contacts.map((contact, i) => this.listView(contact, i))}</tr>
          </table>
        }
        </div>
      </div>
    )
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
    deleteContact: index =>dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
