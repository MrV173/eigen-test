import express from "express";
import jsonfile from "jsonfile";
import member_route from "./routes/member_route.js";
import book_route from "./routes/book_route.js";
import swagger_ui from "swagger-ui-express";

const app = express();
const api_docs = jsonfile.readFileSync("./swagger/api_docs.json");
app.use(express.json());
app.use("/api-docs", swagger_ui.serve, swagger_ui.setup(api_docs));
app.use(member_route, book_route);
const port = 3000;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
