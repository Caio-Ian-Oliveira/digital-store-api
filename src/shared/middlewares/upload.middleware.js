const multer = require("multer");

/**
 * File Upload Middleware Configuration
 *
 * @description Configured Multer middleware for handling image uploads via multipart forms.
 * Processes uploaded images in memory for immediate processing and validation before
 * external storage (Cloudinary). Includes file type validation and size limits.
 *
 * @example
 * // Single image upload
 * router.post('/upload', upload.single('image'), uploadHandler);
 *
 * // Multiple images upload (max 10)
 * router.post('/product/images', upload.array('images', 10), uploadMultipleImages);
 *
 * // Used in product image upload route
 * router.post('/v1/product/upload-image',
 *   authMiddleware,
 *   roleGuard.handle(['ADMIN']),
 *   upload.array('images', 10),
 *   uploadImageValidator,
 *   uploadImageController
 * );
 *
 * Configuration Details:
 * - **Storage**: Memory storage for temporary file processing
 * - **File Size Limit**: 5MB maximum per file
 * - **File Type Filter**: Only image MIME types allowed
 * - **Security**: File validation before processing
 *
 * Memory Storage Benefits:
 * - No temporary files on disk (security and cleanup)
 * - Immediate access to file buffer for processing
 * - Suitable for cloud storage integration (Cloudinary)
 * - No file system permissions required
 *
 * Validation Features:
 * - MIME type validation (image/* only)
 * - File size enforcement (5MB limit)
 * - Custom error messages for validation failures
 * - Prevents malicious file upload attempts
 *
 * Integration Points:
 * - Product image management (upload endpoint)
 * - Cloudinary integration for CDN storage
 * - Base64 alternative upload support
 * - Image optimization and processing pipeline
 *
 * @since 1.0.0
 */

// Configures multer to store uploaded files in memory (buffer) for immediate processing
const storage = multer.memoryStorage();

// Main upload configuration object with security and size constraints
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Aceita apenas imagens
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas imagens são permitidas"));
    }
  },
});

module.exports = { upload };
