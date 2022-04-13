import { DEV_BACKEND_URL, PROD_BACKEND_URL } from "@env";

console.log("😀😀", DEV_BACKEND_URL, PROD_BACKEND_URL);

export default __DEV__ ? DEV_BACKEND_URL : PROD_BACKEND_URL;
