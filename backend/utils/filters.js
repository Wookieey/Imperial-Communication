const harmfulWords = [
    "kill", "fuck", "shit", "bullshit", "nigger", "bomb"
];

const harmful = (message) => {
    const msgLower = message.toLowerCase();
    return harmfulWords.some(word => msgLower.includes(word));
};

export default { harmful };
