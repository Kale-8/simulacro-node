import app from "./app";
import {sequelize} from "./config/db";

const PORT = process.env.PORT || 4000;

(async () => {
    await sequelize.sync();
    app.listen(PORT, () => console.log("Server running on port", PORT));
})();