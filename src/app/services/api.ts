const api = {
  postLead: async (
    name: string,
    email: string,
    url: string,
    message: string
  ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/leads`, {
      method: "POST",
      body: JSON.stringify({ name, email, url, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
};

export default api;
