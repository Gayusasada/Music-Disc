import type { Client } from "discord.js";
import type { Node } from "lavashark";


export default async (_client: Client, node: Node) => {
    console.log(`[nodeDisconnect]`, `Disconnect from "${node.identifier}"`);
};