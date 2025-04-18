import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/ui-config/components'],
      deep: true,
      extensions: ['vue'],
      dts: 'src/ui-config/components/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      _helpers: fileURLToPath(
        new URL('./src/helpers', import.meta.url),
      ),
    },
  },
});
