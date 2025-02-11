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
  const { id, type, data, token } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'cat' || name === 'dog') {
      // Respond immediately to acknowledge the command
      res.send({
        type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      });

      try {
        const fact = await getFacts(name);

        // Send the actual response with the fact
        await fetch(`https://discord.com/api/v10/webhooks/${process.env.APP_ID}/${token}/messages/@original`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: JSON.stringify({
            content: fact,
          }),
        });
      } catch (error) {
        console.error('Error fetching fact:', error);
      }
      return;
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
