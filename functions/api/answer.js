export async function onRequestPost({ request, env }) {
  if (!env.ANSWER_SHEET_TOKEN) {
    return Response.json({ error: "Answer storage is not configured." }, { status: 503 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!["Ok", "Br"].includes(payload.answer)) {
    return Response.json({ error: "Invalid answer." }, { status: 400 });
  }

  const response = await fetch("https://api.jsonbin.io/v3/b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": env.ANSWER_SHEET_TOKEN,
      "X-Bin-Name": "website-answers",
    },
    body: JSON.stringify({
      answer: payload.answer,
      noClicks: Number(payload.noClicks) || 0,
      submittedAt: payload.submittedAt,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "Could not save the answer." }, { status: 502 });
  }

  return Response.json({ saved: true }, { status: 201 });
}
