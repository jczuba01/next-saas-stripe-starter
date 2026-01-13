export async function GET() {
  const models = [
    {
      id: 'xiaomi/mimo-v2-flash:free',
      name: 'MiMo V2 Flash',
      description: 'free1'
    },
    {
      id: 'mistralai/devstral-2512:free',
      name: 'Devstral 2 2512',
      description: 'free2'
    },
    {
      id: 'tngtech/deepseek-r1t2-chimera:free',
      name: 'DeepSeek R1T2 Chimera',
      description: 'free3'
    }
  ];

  return Response.json({ models });
}