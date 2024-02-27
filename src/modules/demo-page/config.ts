import { ConfigObject } from '../types';
import routes from './router/index';

const config: ConfigObject = {
  name: 'demo-page',
  title: 'demo-page',
  isMain: true,
  routes,
};

export default config;
