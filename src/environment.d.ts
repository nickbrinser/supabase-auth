declare namespace NodeJS {
  export interface ProcessEnv {
    HOST: string
    REACT_APP_SUPABASE_URL: string
    REACT_APP_SUPABASE_ANON_KEY: string
    DB_URL: string
    DB_NAME?: string
  }
}
