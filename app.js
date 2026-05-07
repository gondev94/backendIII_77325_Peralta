import 'dotenv/config'
import app from './src/server/server.js'
import logger from './src/logs/logger.js'


const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 7777;

if (Number.isNaN(PORT)) {
    logger.error("PORT is not a number");
}

app.listen(PORT, () => {
    logger.info(`Server is running on PORT ${PORT}`);
});
