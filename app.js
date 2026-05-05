import app from "./src/server/server.js";

const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 7777;

if (Number.isNaN(PORT)) {
    console.error("PORT is not a number");
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
