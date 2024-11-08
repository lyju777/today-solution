import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    server: {
      host: "0.0.0.0", // 네트워크 IP 주소
      open: true, // 서버 시작 시 브라우저 열기
    },
  });
};
