// Legacy API for leads
const api = {
  postLead: async (
    name: string,
    email: string,
    url: string,
    message: string,
  ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/leads`, {
      method: "POST",
      body: JSON.stringify({ name, email, url, message }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  },
  // chat api
  // http://localhost:8080/v1/public/widget/chat
  // headers --> X-Widget-Site-Key
  // body -->  visitorId, message,conversationId
  postChat: async (
    visitorId: string,
    message: string,
    conversationId?: number,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/public/widget/chat`,
      {
        method: "POST",
        body: JSON.stringify({ visitorId, message, conversationId }),
        headers: {
          "Content-Type": "application/json",
          "X-Widget-Site-Key": "wsk_37aY6wkhJAiCnnWg9hw2P5dACoT3nH7h",
        },
      },
    );
    return response.json();
  },
  getHistory: async (visitorId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/public/widget/chat/history?visitorId=${visitorId}`,
      {
        method: "GET",
        headers: {
          "X-Widget-Site-Key": "wsk_37aY6wkhJAiCnnWg9hw2P5dACoT3nH7h",
        },
      },
    );
    return response.json();
  },
};

export default api;
