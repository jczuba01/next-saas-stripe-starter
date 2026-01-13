//   const selectedModel = useChatStore(state => state.selectedModel);
//   const availableModels = useChatStore(state => state.availableModels);
//   const loading = useChatStore(state => state.loading);
//   const error = useChatStore(state => state.error);
//   const setSelectedModel = useChatStore(state => state.setSelectedModel);





//   onClick={(model_id) => {
//     // Example: Set the first available model as selected
//     if (availableModels.length > 0) {
//       setSelectedModel(model_id);
//     }
//   }

//   makeOpenRouterRequest(prompt, selectedModel.id).then(response => {
//     console.log('OpenRouter response:', response);
//   }

// function makeOpenRouterRequest(prompt: string, modelId: string) {
//     // Example implementation of making a request to OpenRouter API
//     return fetch('https://api.openrouter.ai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer YOUR_OPENROUTER_API_KEY`,
//       },
//       body: JSON.stringify({
//         model: modelId,
//         messages: [{ role: 'user', content: prompt }],
//       }),
//     }).then(response => response.json());
//   }

  