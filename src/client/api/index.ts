import { GASClient } from 'gas-client';
import type * as Server from '../../server/main';

const { serverFunctions } = new GASClient<typeof Server>();

export const APIClient = serverFunctions;
