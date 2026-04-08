export const getVisitorId = () => {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem("pp_visitor_id");
  if (!id) {
    id = "vis_" + Math.random().toString(36).substring(2, 11);
    localStorage.setItem("pp_visitor_id", id);
  }
  return id;
};
