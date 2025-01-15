export default {
  async fetch(request, environment, context) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/_worker/")) {
      switch (pathname) {
        case "/_worker/hello":
          return Respond("Hello, world!");
        case "/_worker/goodbye":
          return Respond("Goodbye, world!");
        default:
          return Respond("Not found", { status: 404 });
      }
    }

    return environment.ASSETS.fetch(request);
  },
};

function Respond(response, options = {}) {
  if (typeof response === "string")
    response = JSON.stringify({ message: response });

  return new Response(response, options);
}
