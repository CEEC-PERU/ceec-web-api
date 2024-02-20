const cloudinary = require("../../services/courses/imageService");


exports.uploadImage = async (req, res) => {
    try {
        await cloudinary.uploader.upload_stream(
            { folder: "ceec" },
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: "Error at upload image" })
                } else {
                    console.log("result.secure_url", result.secure_url)
                    res.json({ imageUrl: result.secure_url });
                }
            }
        ).end(req.file.buffer);
    } catch (error) {
        console.error('Error uploading image:', error.error.code, error.error.syscall);
        return res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
    }
}