const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/d/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    if (!videoId) return res.status(400).send("Thiếu Video ID!");

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const command = `yt-dlp -f "worst[ext=mp4]" -o - "${videoUrl}"`;

    res.setHeader("Content-Disposition", `attachment; filename=${videoId}.mp4`);
    res.setHeader("Content-Type", "video/mp4");

    const process = exec(command, { maxBuffer: 1024 * 1024 * 50 });

    process.stdout.pipe(res);
    process.stderr.on("data", (data) => console.error(data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server chạy trên cổng ${PORT}`));
