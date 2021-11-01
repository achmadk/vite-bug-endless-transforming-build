import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
// import legacy from '@vitejs/plugin-legacy'

import { cosmiconfig } from 'cosmiconfig'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const appConfig = await cosmiconfig('test').search()
  const TEST = appConfig.config

  return {
    plugins: [
      reactRefresh(),
      tsconfigPaths(),
      // legacy()
    ],
    define: {
      TEST,
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ]
    }
  }
})
