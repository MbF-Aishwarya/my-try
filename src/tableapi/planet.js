import React from 'react';

class Planet extends React.Component {
    constructor() {
        super();
    }

    render () {
        let planets = this.props.state.planets;
        var tablBody = planets.map((planet) => {
        	return(
        		<tr key={planet.name}>
        			<td>{planet.name}</td>
        		</tr>
    		)
        });
        return (
         <div>
            <table className="table table-bordered table-hover" width="100%">
				{tablBody}
            </table>
         </div>
        )
    }
}

export default Planet;