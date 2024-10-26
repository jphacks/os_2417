const sendQuery = (word, key) => {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const model = "gpt-3.5-turbo";
  const messages = [
    {
      role: "system",
      content:
        "与えられたITに関わる用語をIT用語を用いずできるだけ短く言い換えてください",
    },
    {
      role: "user",
      content: `${word}をIT用語を用いずできるだけ短く言い換えてください`,
    },
  ];
  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 700, //レスポンスのトークンの最大数
    }),
  };
  const gptRequest = new Request(endpoint, requestOption);
  const result = fetch(gptRequest)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      process.exitCode = 1;
    });
  return result;
};
//APIキーをここに！
console.log(sendQuery("API", apikeyhere));
