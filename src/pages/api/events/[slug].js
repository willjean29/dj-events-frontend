import events from "pages/api/data.json";
export default function request(req, res) {
  const event = events.events.filter((event) => event.slug === req.query.slug);
  if (req.method === "GET") {
    res.json({ success: true, event: event[0] });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      mesage: `Merhod ${req.method} is not allowed`,
    });
  }
}
