import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const featuredProducts = async (req, res) => {
  try {
    let featured = await redis.get("featured_products");

    if (featured) {
      return res.json(JSON.parse(featured));
    }

    featured = await Product.find({ isFeatured: true }).lean();

    if (featured.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featured));

    res.json(featured);
  } catch (error) {
    console.log("Error in featuredProducts controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryRes = null;

    if (image) {
      cloudinaryRes = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryRes?.secure_url || "",
      category,
    });

    if (product.isFeatured) {
      await updateFeaturedProductsCache();
    }

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        const destroyResult = await cloudinary.uploader.destroy(
          `products/${publicId}`
        );
        if (destroyResult.result !== "ok") {
          return res
            .status(500)
            .json({ message: "Failed to delete image from Cloudinary" });
        }
        console.log("Image deleted successfully");
      } catch (error) {
        console.log("Error in deleting image", error.message);
        return res.status(500).json({ message: "Error deleting image" });
      }
    }

    if (product.isFeatured) {
      await updateFeaturedProductsCache();
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getRecProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in getRecProducts controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryProducts = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });

    res.json(products);
  } catch (error) {
    console.log("Error in getCategoryProducts controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const toggleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();

      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleProduct controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in updateFeaturedProductsCache", error.message);
  }
}
