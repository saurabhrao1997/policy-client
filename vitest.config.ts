import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: ['./tests/setup.ts'],
  // },
  resolve: {
    alias: {
      '@testing-library/react': '@testing-library/react',
    },
  },
});


