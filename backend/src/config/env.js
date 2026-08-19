import "dotenv/config";

const port = Number(process.env.PORT) || 3000;

export const env = {
  port,
};
