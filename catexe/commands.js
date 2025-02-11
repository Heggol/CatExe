import 'dotenv/config';

import { InstallGlobalCommands } from './utils.js';

const CAT_COMMAND = {
  name: 'cat',
  description: 'Show cat fact',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const DOG_COMMAND = {
  name: 'dog',
  description: 'Show dog fact',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [CAT_COMMAND, DOG_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
