import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x82621cB279624C96C171C4aBAb066b7611df6F95'
);

export default instance;