import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		host: '127.0.0.1', // явный IPv4
		port: 3000, // свободный порт
		strictPort: true, // если порт занят — выдаст ошибку
		open: true, // сразу открывает браузер
	},
})
