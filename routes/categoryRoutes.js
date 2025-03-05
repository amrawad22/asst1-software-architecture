const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

//  Create_Category
router.post("/Create_Category", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "Category name is required" });
    }
    
    const category = new Category({ name: req.body.name });
    await category.save();
    
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GetAllCategories
router.get("/GetAllCategories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update_Category
router.put("/Update_Category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  GetCategoryByBId
router.get("/GetCategoryByBId/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DleteCategoryByBId
router.delete("/DleteCategoryByBId/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
