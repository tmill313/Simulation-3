import React, { Component } from 'react';


export default class BasketballUpdate extends Component {







    render() {
   return( 
   <div>
   <h5>Do you like basketball?</h5>
    <select value={this.props.basketball}onChange={this.props.updateState}>
        <option value="null">select</option>
        <option value="yes">Yes</option>
        <option value="no">Hell nah</option>
    </select>
    <button onClick={() => this.props.submitChanges()}>submit the damn thing</button>
    </div>
   )
}
}