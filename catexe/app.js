import 'dotenv/config';
import express from 'express';
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { DiscordRequest, getFacts } from './utils.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  const { id, type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'cat' || name === 'dog') {
      try {
        const fact = await getFacts(name); // Wait for the API response
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: fact,
          },
        });
      } catch (error) {
        console.error('Error fetching fact:', error);
        return res.status(500).json({ error: 'Failed to fetch fact' });
      }
    }

    console.error(`Unknown command: ${name}`);
    return res.status(400).json({ error: 'Unknown command' });
  }

  console.error('Unknown interaction type', type);
  return res.status(400).json({ error: 'Unknown interaction type' });
});


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
