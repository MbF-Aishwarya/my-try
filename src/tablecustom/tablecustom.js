import React from 'react';

class TableCustom extends React.Component {
    constructor() {
        super();
        this.state = {
             tableData: {
                nameandid: ["name","id"],
                nameandidrow: [{
                  'name':'Andy',
                  'id':'01',
                  },
                  {
                 'name':'Bhaichan',
                  'id':'03',
                  },
                  {
                 'name':'Bharath',
                  'id':'04',
                  },
                  {
                 'name':'Chandran',
                  'id':'05',
                  },
                ]
            },
        }
    }

    render () {
        var dataColumns = this.state.tableData.nameandid;
        var dataRows = this.state.tableData.nameandidrow;
        var tableHeaders = (<thead><tr>
            {dataColumns.map(function(column)
            {
                return <th>{column}</th>
            })}
            </tr></thead>)
            console.log(tableHeaders);
            var tableBody = dataRows.map(function(row){
                return(
                  <tr key={row.id}>
                    {dataColumns.map(function(column){
                      return <td>{row[column]}</td>;
                    })}
                  </tr>
                )
              });
        return (
         <div>
            <table className="table table-bordered table-hover" width="100%">
              {tableHeaders}
              <tbody>
                {tableBody}
              </tbody>
            </table>
         </div>
        )
    }
}

export default TableCustom;