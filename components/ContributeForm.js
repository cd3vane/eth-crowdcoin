import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes'

export class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = await getCampaign(this.props.address);

        this.setState({loading: true, errorMessage: '' });
        
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
            .contribute()
            .send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch(err) {
            this.setState( {errorMessage: err.message} );
        }

        this.setState({loading: false });
        
    };

    render() {
        return (
            <div>
                <h3>Make a Contribution!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Amount to contribute</label>
                        <Input 
                            label="ether" 
                            labelPosition="right"
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Message 
                        error
                        header="Something went wrong!"
                        content={this.state.errorMessage}
                    /> 
                    <Button primary loading={this.state.loading}>Contribute!</Button>
                </Form>
            </div>
        )
    }
}

export default ContributeForm
