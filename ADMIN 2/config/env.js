import { DEV_BACKEND_URL, PROD_BACKEND_URL } from "@env";

export default __DEV__ ? DEV_BACKEND_URL : PROD_BACKEND_URL;
