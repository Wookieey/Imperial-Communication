import filters from "../utils/filters.js";
import ranks from "../utils/ranks.js";
import messageParser from "../utils/messageParsing.js";

export const kxModeration = (message, sender) => {
    let moderationResponse = {
        flagged: false,
        reason: "",
        blockMessage: false,
        alerts: []
    };

    // 1. Check harmful language
    if (filters.harmful(message)) {
        moderationResponse.flagged = true;
        moderationResponse.blockMessage = true;
        moderationResponse.reason = "Harmful language detected.";
        return moderationResponse;
    }

    // 2. Check for unauthorized @everyone
    const parsed = messageParser(message);

    if (parsed.mentions.everyone) {
        const rankWeight = ranks[sender.rank];
        if (rankWeight < ranks["Moff"]) {
            moderationResponse.flagged = true;
            moderationResponse.blockMessage = true;
            moderationResponse.reason = "Unauthorized @everyone attempted.";
            moderationResponse.alerts.push("High-ranking officers notified.");
            return moderationResponse;
        }
    }

    // 3. All good
    return moderationResponse;
};
