const togetherTokenInputBox = document.getElementById("token");
const senderInputBox = document.getElementById("name");
const recipientInputBox = document.getElementById("recipient");
const emailGoalsInputBox = document.getElementById("email_goals");
const generateButton = document.getElementById("generate");
const outputBox = document.getElementById("output");

const systemMessage = `
    You are an E-Mail Assistant. You will be provided with the sender's name, the recipient's name and
    a list of goals that you are expected to achieve within the E-Mail. You are to maintain a professional,
    concise and polite tone throughout the E-Mail and follow all goals to the best of your ability. In your
    responses, you are only going to provide the E-Mail and not the subject line. Do not preface your response
    with anything, nor include any information at the end, you will always be expected to provide just the body
    of the E-Mail. Please ensure that the E-Mail is formatted correctly and is free of any spelling, grammatical
    or punctuation errors.
`;

const url = 'https://api.together.xyz/v1/chat/completions';

window.onload = () => {
    outputBox.value = "";
};

generateButton.addEventListener("click", () => {
    outputBox.value = "Generating...";
    const hfToken = togetherTokenInputBox.value;
    const sender = senderInputBox.value;
    const recipient = recipientInputBox.value;
    const emailGoals = emailGoalsInputBox.value;
    const userMessage = `
        Sender: ${sender}
        Recipient: ${recipient}
        Goals:\n${emailGoals}
    `;
    const data = {
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages: [
            {
                role: "system",
                content: systemMessage
            },
            {
                role: "user",
                content: userMessage
            }
        ],
        max_tokens: 512,
        stream: false
    };

    fetch(
        url,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + hfToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    .then(response => response.json())
    .then(data => {
        outputBox.value = data.choices[0].message.content;
    })
    .catch(error => {
        outputBox.value = "An error occurred, perhaps you entered an invalid token? Check the console for more information.";
        console.error(error);
    });

});