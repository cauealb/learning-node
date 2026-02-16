import { app } from "./app.js";

app.listen({
    host: '0.0.0.0',
    port: 1414
}).then(() => {
    console.log('🔥 HTTP Server Running!')
})