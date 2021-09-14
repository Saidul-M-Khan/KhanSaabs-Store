const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `/API.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showProducts(data);
    });
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product card" style="border: 1px solid rgb(97, 73, 255);">
      <div>
        <img class="product-image card-img-top" src=${image} height=""></img>
      </div>
      <div class="card-body">
        <h4>${product.title.slice(0,40)}...</h4>
        <p>Category: ${product.category}</p>
        <h3>Price: $ ${product.price}</h3>
        <p><h5>Rating: <span class="text-danger fw-bold"><strong>${product.rating.rate}</strong></span></h5></p>
        <span><small><strong>(Rated By ${product.rating.count} People)</strong></small></span>
      </div>
      
      <div class="card-footer row text-center" style="margin-top: 5px;">
        <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-success mb-1">
        <i class="fas fa-shopping-cart"></i> &nbsp;Add to Cart
        </button>
        <button onclick="loadDetails('${product.id}')" type="button" class="btn btn-danger mb-1" id="details-btn">
        <i class="fas fa-info-circle"></i> &nbsp;Details
        </button>
      </div>

    </div>

      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
// Function to Add Product to Cart
const addToCart = (price) => {
  document.getElementById('details').textContent = '';
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// Function to Receive Input Value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// fetching single product details
const loadDetails = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => showDetails(data));
};

// showing details on top
const showDetails = data => {
  document.getElementById('details').textContent = '';
  const div = document.createElement("div");
  div.innerHTML = `<div class=" mx-auto card mb-3 shadow cart-2" style="max-width: 90%; background: white;">
 <div class="row g-3 d-flex align-item-center px-4 py-3" id="product-details">
   <div class="col-md-4">
     <img src="${data.image}" class="img-fluid rounded-start" style="height:250px; width:250px;" alt="...">
   </div>
   <div class="col-md-8">
     <div class="card-body mx-3" style="margin-left:100px;">
       <h3 class="card-title">${data.title}</h3>
       <p class="card-text">${data.description.slice(0,400)}</p>
       <p class="card-text"><h4 class="text-muted">Rating: <strong class="text-danger">${data.rating.rate}</strong></h4></p>
       <span><small><strong>(Rated By ${data.rating.count} People)</strong></small></span>
       <div class="card-footer row text-center" style="margin-top: 30px;">
        <button onclick="addToCart(${data.price})" id="addToCart-btn" class="buy-now btn btn-success">
        <i class="fas fa-shopping-cart"></i> &nbsp;Add to Cart
        </button>
      </div>
     </div>
   </div>
 </div>
</div>`;
  document.getElementById("details").appendChild(div);
};