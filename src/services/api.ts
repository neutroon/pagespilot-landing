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
          "X-Widget-Site-Key": process.env.NEXT_PUBLIC_WIDGET_SITE_KEY || "",
        },
      },
    );
    return response.json();
  },
  streamChat: async (
    visitorId: string,
    message: string,
    conversationId?: number,
    onChunk?: (text: string) => void,
    onConversationId?: (id: number) => void,
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/public/widget/chat`,
      {
        method: "POST",
        body: JSON.stringify({ visitorId, message, conversationId, stream: true }),
        headers: {
          "Content-Type": "application/json",
          "X-Widget-Site-Key": process.env.NEXT_PUBLIC_WIDGET_SITE_KEY || "",
        },
      },
    );

    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6).trim();
          if (dataStr === "[DONE]") return fullText;
          try {
            const data = JSON.parse(dataStr);
            if (data.token) {
              fullText += data.token;
              onChunk?.(fullText);
            } else if (data.conversationId) {
              onConversationId?.(data.conversationId);
            } else if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            // Ignore parse errors on incomplete chunks
          }
        }
      }
    }
    return fullText;
  },
  getHistory: async (visitorId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/public/widget/chat/history?visitorId=${visitorId}`,
      {
        method: "GET",
        headers: {
          "X-Widget-Site-Key": process.env.NEXT_PUBLIC_WIDGET_SITE_KEY || "",
        },
      },
    );
    return response.json();
  },
};

export default api;
