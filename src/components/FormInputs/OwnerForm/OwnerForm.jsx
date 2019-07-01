import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';

import Name from '../Name/Name.jsx';
import Address from '../Address/Address.jsx';
import Contact from '../Contact/Contact.jsx';

/**
 * This component combines some lower level components in order
 * to create a set of inputs.
 *
 * This component will require sending in some props:
 * handleChange is a function that will update values
 * on the parent component's state
 * stateType is a string that will tell the parent component
 * what to call the object in the parent component's state
 * that the information is being added to.
 */
class OwnerForm extends Component {

    state = {

    }

    //this function is to display values in the input fields
    //in the event of an edit. The information to be sent out
    //is stored in the parent objects state.
    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty]: event.target.value
            }
        })
        this.props.handleChange(propertyToChange, newProperty, event)
    }

    render() {
        return (
            <div>
                <h2>Owner</h2>
                <Name 
                    handleChange={this.handleChange}
                    stateType='owner'                    
                />
                <Divider />
                <Address 
                    handleChange={this.handleChange} 
                    stateType='owner'
                />                    
                <Divider />
                <Contact 
                    handleChange={this.handleChange}
                    stateType='owner'
                />
            </div>
        )
    }
}

export default OwnerForm;