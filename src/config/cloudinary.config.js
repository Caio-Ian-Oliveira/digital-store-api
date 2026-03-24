/**
 * Cloudinary CDN Configuration
 *
 * @description Cloud-based image and media management service configuration.
 * Handles product image storage, optimization, and global delivery through
 * Cloudinary's CDN infrastructure with automatic image transformations.
 *
 * @example
 * // Usage in upload service
 * const cloudinary = require('../config/cloudinary.config');
 *
 * const result = await cloudinary.uploader.upload(imageBuffer, {
 *   folder: 'products',
 *   public_id: `product_${timestamp}`,
 *   transformation: [
 *     { width: 800, height: 600, crop: 'fit' },
 *     { quality: 'auto' }
 *   ]
 * });
 *
 * Environment Variables Required:
 * - CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name identifier
 * - CLOUDINARY_API_KEY: API key for authentication
 * - CLOUDINARY_API_SECRET: Secret key for secure API access
 *
 * Key Features:
 * - **Global CDN**: Fast image delivery worldwide
 * - **Automatic Optimization**: Dynamic image compression and format selection
 * - **On-the-fly Transformations**: Resize, crop, filter images via URL parameters
 * - **Secure URLs**: Protected image access with signed URLs when needed
 * - **Multi-format Support**: JPEG, PNG, WebP, AVIF automatic format selection
 *
 * Integration Points:
 * - Product image upload endpoint (/v1/product/upload-image)
 * - Image storage during product creation and updates
 * - Dynamic thumbnail generation for product listings
 * - High-resolution images for product detail views
 *
 * Security Features:
 * - API authentication via environment variables
 * - Folder-based organization for access control
 * - Signed URLs for private content
 * - Upload restrictions and validation
 *
 * @see {@link https://cloudinary.com/documentation} - Cloudinary API Documentation
 * @since 1.0.0
 */
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

// Initialize Cloudinary with environment-specific credentials

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
