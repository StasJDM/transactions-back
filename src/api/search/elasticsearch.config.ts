import { Client } from '@elastic/elasticsearch';
import { ELASTICSEARCH_HOST, ELASTICSEARCH_PORT } from '../constants';

const elasticUrl = `${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}`;
const elasticClient = new Client({ node: elasticUrl });

export default elasticClient;
