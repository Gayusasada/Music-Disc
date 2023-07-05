import { ChatInputCommandInteraction, Client, Message } from "discord.js";


export const name = 'volume';
export const aliases = ['v'];
export const description = 'Configure bot volume';
export const usage = 'v <0-100>';
export const voiceChannel = true;
export const showHelp = true;
export const options = [
    {
        name: "volume",
        description: "The volume to set",
        type: 4,
        required: true,
        min_value: 1
    }
];


export const execute = async (client: Client, message: Message, args: string[]) => {
    const maxVolume = client.config.maxVolume;
    const player = client.lavashark.getPlayer(message.guild!.id);

    if (!player) {
        return message.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }

    await message.react('👍');
    const vol = parseInt(args[0], 10);

    if (!vol) {
        return message.reply({ content: `Current volume: **${player.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVolume}\` Type a number between.**`, allowedMentions: { repliedUser: false } });
    }
    if (player.volume === vol) {
        return message.reply({ content: `❌ | The volume you want to change is already the current volume.`, allowedMentions: { repliedUser: false } });
    }
    if (vol < 0 || vol > maxVolume) {
        return message.reply({ content: `❌ | **Type a number from \`1\` to \`${maxVolume}\` to change the volume .**`, allowedMentions: { repliedUser: false } });
    }

    player.filters.setVolume(vol);
    return message.reply({ content: `🔊 **${vol}**/**${maxVolume}**%`, allowedMentions: { repliedUser: false } });
}

export const slashExecute = async (client: Client, interaction: ChatInputCommandInteraction) => { 
    
    const maxVolume = client.config.maxVolume;
    const player = client.lavashark.getPlayer(interaction.guild!.id);

    if (!player) {
        return interaction.reply({ content: '❌ | There is no music currently playing.', allowedMentions: { repliedUser: false } });
    }

    const vol = Math.floor(interaction.options.getInteger("volume")!);

    if (!vol) {
        return interaction.reply({ content: `Current volume: **${player.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVolume}\` Type a number between.**`, allowedMentions: { repliedUser: false } });
    }
    if (player.volume === vol) {
        return interaction.reply({ content: `❌ | The volume you want to change is already the current volume.`, allowedMentions: { repliedUser: false } });
    }
    if (vol < 0 || vol > maxVolume) {
        return interaction.reply({ content: `❌ | **Type a number from \`1\` to \`${maxVolume}\` to change the volume .**`, allowedMentions: { repliedUser: false } });
    }

    player.filters.setVolume(vol);
    return interaction.reply({ content: `🔊 **${vol}**/**${maxVolume}**%`, allowedMentions: { repliedUser: false } });
}