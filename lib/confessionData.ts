export const confessionData = {
    crushName: "",

    landing: {
        title: "WILL YOU ACCEPT\nMY SIDE QUEST?",
        subtitle: "I made something a little different for you.",
        reassurance: "Don't worry...\nit won't take long. ❤️",
        buttonText: "START QUEST",
    },

    quest: {
        title: "CONFESSION QUEST ❤️",
        subtitle: "SIDE QUEST",
    },

    levels: [
        {
            id: 1,
            title: "LEVEL 01",
            objective: "QUEST OBJECTIVE",
            messages: [
                "There's someone I've been thinking about lately...",
                "Someone who somehow makes\nordinary days feel a little better.",
            ],
            buttonText: "NEXT LEVEL →",
        },
        {
            id: 2,
            title: "LEVEL 02",
            intro: "Let's see if you can figure out\nwho I'm talking about...",
            clues: [
                "Someone I genuinely enjoy talking to.",
                "Someone whose presence I notice\nmore than I probably should.",
                "Someone who can make me smile\nwithout even trying.",
            ],
            afterClues: "Any guesses?",
            buttonText: "I THINK I KNOW...",
        },
        {
            id: 3,
            title: "LEVEL 03",
            messages: [
                "Okay...",
                "I've been trying to figure out\nhow to say this.",
                "So instead of trying to find\nthe perfect words...",
                "I made you a website.",
                "Because apparently this is how\nI decided to handle my feelings. 😭",
            ],
            buttonText: "CONTINUE",
        },
        {
            id: 4,
            title: "LEVEL 04",
            objective: "I HAVE A CONFESSION...",
            mainConfession: "I LIKE YOU.",
            messages: [
                "Not because I expect anything from you.",
                "I just wanted you to know how I feel.",
                "You've become someone special to me.",
            ],
            heartSymbol: "❤️",
            finalPrompt: "QUEST OBJECTIVE",
            finalText: "Tell me what you think.",
            buttonText: "I'M READY",
        },
        {
            id: 5,
            title: "LEVEL 05",
            intro: "QUEST COMPLETE?",
            message: "I've said my part...\n\nNow it's completely up to you.",
            choices: [
                {
                    id: "yes",
                    emoji: "❤️",
                    text: "I LIKE YOU TOO",
                },
                {
                    id: "maybe",
                    emoji: "🤍",
                    text: "I NEED SOME TIME TO THINK",
                },
                {
                    id: "friend",
                    emoji: "🙂",
                    text: "I ONLY SEE YOU AS A FRIEND",
                },
            ],
        },
    ],

    responses: {
        yes: {
            title: "QUEST COMPLETE!",
            hearts: "❤️❤️❤️",
            surprise: "WAIT... REALLY?!",
            message: "You just made this entire\nwebsite worth it.",
            closing: "Looks like this side quest\nhad a pretty good ending. ❤️",
            buttonText: "RETRY AGAIN",
        },
        maybe: {
            message: "That's completely okay. 🤍",
            subtext: "You don't have to answer right away.",
            respect: "I meant what I said,\nand I respect whatever you feel.",
            closing: "Take your time.",
            buttonText: "BACK TO MENU",
        },
        friend: {
            message: "That's okay. 🙂",
            thanks: "Thank you for being honest with me.",
            respect: "I'd rather know how you genuinely feel\nthan make you uncomfortable.",
            closing: "No pressure.\nNo awkwardness.\n\nYou're still someone I appreciate.",
            buttonText: "BACK TO MENU",
        },
    },

    audio: {
        backgroundMusic: "/audio/background-music.mp3",
        click: "/audio/click.mp3",
        correct: "/audio/correct.mp3",
        celebration: "/audio/celebration.mp3",
    },
};

export type LevelData = typeof confessionData.levels[number];
export type Choice = NonNullable<typeof confessionData.levels[4]["choices"]>[number];
export type ResponseType = "yes" | "maybe" | "friend";
