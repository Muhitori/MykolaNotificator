const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const { TOKEN, PERSONAL_USER_ID, WORK_USER_ID, SERVER_ID } = process.env;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
	],
});

client.on("messageCreate", async (message) => {
	if (
		message?.guild &&
		message?.guild?.id === SERVER_ID &&
		!message.author.bot &&
		message.mentions.has(WORK_USER_ID)
	) {
		try {
			const user = await client.users.fetch(PERSONAL_USER_ID);
			user.send(
				`New message in #${message?.channel?.name} (Server: ${message?.guild?.name}): ${message?.content}`
			);
		} catch (error) {
			console.error("Error sending message:", error);
		}
	}
});

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user.tag}`);
	console.log("server", SERVER_ID);
	console.log("receiver", PERSONAL_USER_ID);
});

client.login(TOKEN);
