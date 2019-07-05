import React, {Component} from 'react';
import {Divider, Button, Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

import Aircraft from '../../FormInputs/Aircraft/Aircraft.jsx';
import OperatorForm from '../../FormInputs/OperatorForm/OperatorForm.jsx';
import OwnerForm from '../../FormInputs/OwnerForm/OwnerForm.jsx';

import '../Forms.css';

class AddAircraftForm extends Component{

    //as all the input are stored in separate components...we'll want
    //to store all the data in the same state with the parent component.
    state = {

    }

    fillDummyForm = () => {
        this.setState({
            aircraft: {
                CBP: "NW9PX5",
                callSign: "BCH666",
                color: "Red/White",
                tailNumber: "973DXP",
                type: "Beechcraft Bonanza G36",
            },
            operator: {
                city: "Minneapolis",
                email: "steviebeechcraft@gmail.com",
                firstName: "Stefen",
                lastName: "Menzel",
                middleName: "",
                phoneNumber: "1234567890",
                postalCode: "55409",
                state: "MN",
                streetAddress: "123 joke st.",
            },
            owner: {
                city: "Minneapolis",
                email: "steviebeechcraft@gmail.com",
                firstName: "Stefen",
                lastName: "Menzel",
                middleName: "",
                phoneNumber: "1234567890",
                postalCode: "55409",
                state: "MN",
                streetAddress: "123 Joke St.",
            }
        })
    }

    //send the aircraft we just added to the database.
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitting....or trying');
        this.props.dispatch({type: 'ADD_AIRCRAFT', payload: this.state});
        this.props.history.push('/aircraftinfo/')
        Swal.fire({
            type: 'success',
            title: 'Aircraft Added!',
            timer: 1500
        })
    }

    //cancel this form filling outing (go back to aircraft summary page)
    handleCancel = () => {
        console.log('canceling');
        this.props.history.push('/aircraftinfo');
    }


    /**
     * As our state is initially blank we need to fill it out
     * from the inputs as we go. this function will setstate
     * in a way that'll add new keys to the object that the
     * inputs correspond with (aircraft, owner, operator) and
     * set their values to whatever was set in the inputs.
     */
    handleChange = (propertyToChange, newProperty, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: {
                ...this.state[propertyToChange],
                [newProperty] : event.target.value
            }
        })
    }

    render(){
        console.log('this.state:', this.state);
        return(
            <div>
                <h1 className="ui header center aligned grid">Add Aircraft</h1>
                <button type="button" style={{ float: 'left', opacity: '0', height: '50px', width: '150px' }} onClick={this.fillDummyForm}></button>
                <form className="addForm" onSubmit={this.handleSubmit}>                    
                    <Aircraft handleChange={this.handleChange} aircraft={this.state.aircraft}/>
                    <Divider />
                    <OperatorForm handleChange={this.handleChange} person={this.state.operator}/>
                    <Divider />
                    <OwnerForm handleChange={this.handleChange} person={this.state.owner}/>

                    <div className="formButtons">
                        <Grid columns='equal'>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column width={3}>
                                <Button 
                                    type="button"
                                    onClick={this.handleCancel}
                                    secondary 
                                    className="ui medium button formButton"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Button
                                    type="submit"
                                    className="ui medium button green formButton"
                                >
                                    Add Aircraft
                                </Button>
                            </Grid.Column>
                        </Grid>                        
                    </div>
                </form>
            </div>            
        )
    }
}

export default connect()(AddAircraftForm);