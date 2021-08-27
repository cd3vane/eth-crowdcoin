import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import getCampaign from '../../../ethereum/campaign';

export class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    static async getInitialProps(props){
        const { address } = props.query;
        
        return { address };
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: '' });

        const campaign = getCampaign(this.props.address);

        const { description, value, recipient } = this.state;
        
        try{
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
            .send({ from: accounts[0] });

            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)

        } catch(err) {
            this.setState( {errorMessage: err.message} );
        }

        this.setState({loading: false });
        
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a New Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Amount to Send</label>
                        <Input 
                            label="Eth" 
                            labelPosition="right"
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient Address</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message 
                        error
                        header="Something went wrong!"
                        content={this.state.errorMessage}
                    /> 
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew
