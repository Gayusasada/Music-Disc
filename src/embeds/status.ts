import { EmbedBuilder, HexColorString } from "discord.js";
import { Config, Info, SystemStatus } from "../@types";


const status = (config: Config, info: Info, systemStatus: SystemStatus) => {
    const cpuUsage = `${systemStatus.load.percent}  \`${systemStatus.load.detail}\``;
    const ramUsage = `${systemStatus.memory.percent}  \`${systemStatus.memory.detail}\``;
    const heapUsage = `${systemStatus.heap.percent}  \`${systemStatus.heap.detail}\``;

    const embed_ = new EmbedBuilder()
        .setColor(config.embedsColor as HexColorString | number)
        .setTitle(`${config.name} ${info.bot_version}`)
        .setURL('https://github.com/hmes98318/Music-Disc')
        .setDescription(`**• Serving ${systemStatus.serverCount} servers**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
        .addFields(
            { name: `⚙️ SYSTEM`, value: `OS : **${info.os_version}**\nNode.js : **${info.node_version}**\nDiscord.js : **${info.dc_version}**\nLavaShark : **${info.shark_version}**\nCPU : **${info.cpu}**\nUptime : **${systemStatus.uptime}**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, inline: false },
            { name: `📊 USAGE`, value: `CPU : **${cpuUsage}**\nRam : **${ramUsage}**\nHeap : **${heapUsage}**\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, inline: false },
            { name: `🛰️ LATENCY`, value: `Bot : **${systemStatus.ping.bot}**\nAPI : **${systemStatus.ping.api}ms**`, inline: false }
        )
        .setTimestamp()
    return embed_;
}

export { status };