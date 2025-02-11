import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  const url = 'https://discord.com/api/v10/' + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 0.1.0)',
    },
    ...options
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  const endpoint = `applications/${appId}/commands`;

  try {
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

export async function getFacts(animal) {
  if (animal === 'cat') {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", `connect.sid=${process.env.SID}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1", requestOptions);
      const result = await response.json();
      console.log(result);
      return result.text;
    } catch (error) {
      console.error(error);
    };
  } else if (animal === 'dog') {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      const response = await fetch("http://dog-api.kinduff.com/api/facts?number=1", requestOptions);
      const result = await response.json();
      console.log(result);
      return result.facts;
    } catch (error) {
      console.error(error);
    };
  } else {
    console.error("Invalid animal!")
    return;
  }
}