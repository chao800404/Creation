declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      NEXTAUTH_SECRET: string
      MONGODB_URI: string
      NODE_ENV: 'development' | 'production'
      PORT?: string
    }
  }
}

export {}
