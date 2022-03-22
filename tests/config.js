import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    port: process.env.DEV_PORT,
    db: process.env.DEV_DB,
    secret: process.env.JWT_SECRET,
  },
  test: {
    port: process.env.TEST_PORT,
    db: process.env.TEST_DB,
    secret: process.env.JWT_SECRET,
  },
};
const currentConfig = config[process.env.NODE_ENV];

export { currentConfig as default };
