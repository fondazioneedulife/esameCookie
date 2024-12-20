export const config: Config = {
  APP_BASENAME: "/",
  API_BASEPATH: "http://localhost:3000",
};

type Config = {
  [x: string]: any;
  APP_BASENAME: string;
  API_BASEPATH: string;
};
