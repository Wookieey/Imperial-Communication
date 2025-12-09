import User from "../models/User.js";
import ranks from "./ranks.js";

export default function messageParser(message) {
    const words = message.split(/\s+/);

    const mentions = {
        users: [],
        ranksNotified: [],
        everyone: false
    };

    for (const word of words) {
        if (word.startsWith("@")) {
            const tag = word.slice(1);

            if (tag === "everyone") {
                mentions.everyone = true;
            } else if (ranks[tag] !== undefined) {
                mentions.ranksNotified.push(tag);
            } else {
                // try to find user by username
                mentions.users.push(tag); // will resolve later in sockets
            }
        }
    }

    return mentions;
}
