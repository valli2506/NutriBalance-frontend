import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "/NutriBalance-frontend/"   // 🔥 MUST MATCH YOUR REPO NAME
})