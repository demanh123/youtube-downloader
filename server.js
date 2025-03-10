const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép mọi trang web gọi API

app.get("/download", (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send("Thiếu URL video!");
    }

    const command = `yt-dlp -f best -o - "${videoUrl}"`;

    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
    res.setHeader("Content-Type", "video/mp4");

    const process = exec(command, { maxBuffer: 1024 * 1024 * 50 });

    process.stdout.pipe(res);
    process.stderr.on("data", (data) => console.error(data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server chạy trên cổng ${PORT}`));
