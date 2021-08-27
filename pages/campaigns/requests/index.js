import React, { Component } from 'react';
import { Card, Grid, Button, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout'
import getCampaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';
import RequestRow from '../../../components/RequestRow';


export class RequestIndex extends Component {
    static async getInitialProps(props){
        const { address } = props.query

        const campaign = getCampaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();

        const approversCount = await campaign.methods.approversCount().call();
        
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        return { address, requests, requestCount, approversCount };
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        })
    }


    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h1>Pending Requests</h1>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button
                            content="Create Request"
                            floated="right"
                            style={{ marginBottom: 10 }}
                            primary
                        />
                    </a>
                </Link>
                
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        )
    }
}

export default RequestIndex
