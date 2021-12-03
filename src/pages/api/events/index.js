import events from "pages/api/data.json";
export default function request(req, res) {
  if (req.method === "GET") {
    res.json({ success: true, events: events.events });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      mesage: `Merhod ${req.method} is not allowed`,
    });
  }
}
