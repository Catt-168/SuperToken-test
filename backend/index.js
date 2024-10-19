import express from "express";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import cors from "cors";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "https://try.supertokens.com",
    // apiKey: <API_KEY(if configured)>,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "auth-test",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());
app.use(errorHandler());

app.use((err, req, res, next) => {
  console.log("ERROR", err);
});

app.get("/", verifySession(), (req, res) => {
  // console.log(req.session.accessToken);
  let userId = req.session.getUserId();

  res.send({
    mesage: "Hello World",
    userId,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
