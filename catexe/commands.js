import 'dotenv/config';

import { capitalize, InstallGlobalCommands } from './utils.js';

const CAT_COMMAND = {
  name: 'cat',
  description: 'Show Image of Cat',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [CAT_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
