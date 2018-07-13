import React from 'react';

class TableOptions extends React.Component  {
	constructor(){
		super();
		this.state = {
			tableoptions:[
				'API Table',
				'Own Custom Table',
				'Dynamic Crud Table',
			],
			myPick:''
		}
	}
	handleRadio(e){
		this.setState({myPick : e.target.value})
	}
	render(){
			const myPick = this.state.myPick;
			const tableoptions = this.state.tableoptions.map((type, key)=> {
				const currentPick = this.state.myPick === type
				return(
					<div key={key}>
						<div>
							<label>
								<input type="radio" name="tabletypes" id={type} value={type} onChange={this.handleRadio.bind(this)} />{type}
							</label>
						</div>
					</div>
				)
				const tablevalue = this.props.tablevalue;
			})
		return(
			<div>
				<strong>{myPick}</strong>
				{myPick ? ',selected': 'please choose a table type'} 
				<hr />
				{tableoptions}
			</div>
		)		
	}
}
export default TableOptions;