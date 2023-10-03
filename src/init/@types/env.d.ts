declare module 'react-native-config' {
  export const NODE_ENV:
    | 'development'
    | 'production'
    | 'test'
    | 'staging'
    | 'qa'
    | 'uat'
    | 'sandbox'
    | 'demo'
    | 'local';
  export const API_URL: string;
}
