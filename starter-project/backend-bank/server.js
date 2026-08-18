import app from './app.js';
const port = 5000;

app.listen(port, () => {
    console.log(`[Backend Bank] Berjalan di http://localhost:${port}`);
});
