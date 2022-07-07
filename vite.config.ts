/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/pomodoro-app-web/",
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy", "classProperties"],
        },
      },
    }),
  ],
})
