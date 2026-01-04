const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

let allProducts = [];

// FETCH DATA FROM BACKEND
fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(allProducts);
  })
  .catch(err => console.error("Error:", err));

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p.id}">View Details</a>
      </div>
    `;
  });
}

function applyFilters() {
  let filtered = allProducts;

  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(p => p.category === categoryFilter.value);
  }

  if (priceFilter.value === "low")
    filtered = filtered.filter(p => p.price < 1000);

  if (priceFilter.value === "mid")
    filtered = filtered.filter(p => p.price >= 1000 && p.price <= 5000);

  if (priceFilter.value === "high")
    filtered = filtered.filter(p => p.price > 5000);

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);
