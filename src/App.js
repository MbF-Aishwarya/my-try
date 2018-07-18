import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import FormComponent from './Form';
import EditComponent from './EditForm';
import PlanetSearch from './tableapi/planetsearch';
import TableCustom from './tablecustom/tablecustom';
import TableOptions from './tableoptions/tableoptions';

class App extends Component {
  
 constructor(props){
    super(props);
    this.state = {
      mess:"Everyone",
      isOpen: false,
      heading:["name","id"],
      // values:{
      //   name:{contacts.name},
      //   id:{contacts.number},
      // }
    }
  }
 
  optionsType1 = () => {
    this.setState({
       type1: !this.state.type1,
    });
  }
  optionsType2 = () => {
    this.setState({
       type2: !this.state.type2,
    });
  }
  optionsType3 = () => {
    this.setState({
       type3: !this.state.type3,
    });
  }

  componentWillMount(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    this.setState({x:x,y:y});
  }

  listView(data, index){
    var Heading=this.state.heading;
    var ContactData = this.props.contacts;
    console.log("Header content",Heading);
    console.log("cheader",ContactData);

    var tHeader = (<div>
      { Heading.map(function(heading){
        return
        <th>{heading}</th>
      })}
       </div>
        );
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
    
    // var tHeader = 
    // console.log(tHeader);
    return(
        <div className="container">
          <div className="content-bg">
            <div>
              <div><img className='bg' src={'https://source.unsplash.com/'+this.state.x+'x'+this.state.y+'/?nature'} /></div>
               <h2>Welcome, {this.state.mess}!</h2>
               <p>Please choose a table type</p>
               <hr/>
                  <div className="tableButton">
                  <button onClick={this.optionsType1.bind(this)} className="btn btn-warning">
                    API Table
                  </button>
                  <button onClick={this.optionsType2.bind(this)} className="btn btn-warning">
                   Custom Table
                  </button>
                  <button onClick={this.optionsType3.bind(this)} className="btn btn-warning">
                    Dynamic Table
                  </button>
                </div>
             <div>
             {this.state.type1 &&
              <div>
              <br />
               <h5>A Table Sample - API</h5>
                <PlanetSearch />
              </div>
             }
             {this.state.type2 &&
                <div>
                 <br />
                  <h5>A Table Sample - Custom Table</h5>
                  <TableCustom/>                  
               </div>
             }
            
            </div>
          </div>
           {this.state.type3 &&
            <div>
              <br />
               <h5>A Table Sample - Dynamic Table</h5>
                <hr/>
                <FormComponent />
               <hr/>
               <div>
                  {
                    <div>
                    <h4>Add Contact Form</h4>                     
                    <hr />
                    <br />
                    <table className="table table-bordered table-hover" width="100%">
                     {this.props.contacts.map((contact, i) => this.listView(contact, i))}
                    </table>
                    </div>
                  }
                 </div>
                {this.state.edit &&
                <div>
                  <h4>Edit Form</h4>    
                  <br />
                  <EditComponent contact={this.state.newData} />
                </div>
                } 
              </div> 
            }         
          </div>
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
