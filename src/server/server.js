import dotenv from "dotenv";
import app from "../../app.js";

dotenv.config();

const rawPort = process.env.PORT || 7777;
if (Number.isNaN(rawPort)) {
    console.error("PORT is not a number");
}
const PORT = parseInt(rawPort);

app.listen(PORT || 7777, () => {
    console.log(`Server is running on PORT ${PORT || 7777}`);
});
