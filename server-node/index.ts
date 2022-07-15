import * as express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { auth } from "express-oauth2-jwt-bearer";
import * as cors from "cors";
import { onConnection } from "./event-handlers/on-connection.handler";
const app = express();
const httpServer = createServer(app);
app.use(
  cors({
    origin: "*",
  })
);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "https://dev-jajajfbc.us.auth0.com/api/v2/",
  issuer: "dev-jajajfbc.us.auth0.com",
  issuerBaseURL: "https://dev-jajajfbc.us.auth0.com/",
});

const chatNsp = io.of(/^\/chat-\d$/);

chatNsp.on("connection", onConnection(chatNsp));

httpServer.listen(3000, () => {
  console.log("Listening on http://localhost:3000 .....");
});

app.get("/api/public", (req, res) => {
  res.json({
    message: "hello from public endpoint",
  });
});

app.get("/api/private", checkJwt, (req, res) => {
  res.json({
    message: "hello from private endpoint",
  });
});

// app.get("/me", checkJwt, (req, res) => {
//   const idToken = req.params["idToken"];
//   const userProfile = getUserProfileFromIdToken(idToken);
//   res.json(userProfile);
// });
