
const products = require("../products.json");
exports.getProducts = (req, res) => {
  const { page = 1, limit = 5, category } = req.query;
  let filtered = [...products];

  if (category) {
    const lowerCat = category.toLowerCase();
    products = products.filter((p) => p.category.toLowerCase() === lowerCat);
  }
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = filtered.slice(start, end);

  res.json({
    data: paginated,
    total: filtered.length,
    page: parseInt(page),
  });
};