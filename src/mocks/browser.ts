import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/index';

const worker = setupWorker(...handlers);

export default worker;
