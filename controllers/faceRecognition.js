const axios = require("axios");

const handleClarifyApi = async (request, response) => {
  const USER_ID = "vp3fx9nhqq2j";
  const PAT = "4bf991280305438ba4a61e7963875886";
  const APP_ID = "d85b056a98b44bc99fe922613461ae77";
  const MODEL_ID = "general-image-recognition";
  const MODEL_VERSION = "aa7f35c01e0642fda5cf400f543e7c40";
  const { link: IMAGE_URL } = request.body;
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const CLARIFAI_API_BASE_URL = "https://api.clarifai.com/v2";
  const MODEL_ENDPOINT = `/models/${MODEL_ID}/versions/${MODEL_VERSION}/outputs`;

  try {
    const responseClarifyApi = await axios.post(
      `${CLARIFAI_API_BASE_URL}${MODEL_ENDPOINT}`,
      raw,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
        },
      }
    );
    
    const firstOutput = responseClarifyApi?.data?.outputs?.[0];
    if (firstOutput) {
      const { data } = firstOutput;
      response.json(data);
    } else {
      console.error("Resposta da API Clarifai sem dados válidos.");
    }
  } catch (error) {
    console.error("Erro ao processar resposta da API Clarifai:", error);
  }
};

module.exports = handleClarifyApi;
