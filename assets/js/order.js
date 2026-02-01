/* TOGGLE */
const retail = document.getElementById("retailSection")
const corporate = document.getElementById("monthlySection")
const rBtn = document.getElementById("retailBtn")
const cBtn = document.getElementById("packageBtn")
var closepop = document.getElementById("close-pop")
function switchMode(mode) {


  if (mode === "retail") {
    retail.classList.remove("hidden")
    corporate.classList.add("hidden")

    rBtn.classList.add("bg-amber-700", "text-white")
    rBtn.classList.remove("bg-gray-200")

    cBtn.classList.add("bg-gray-200")
    cBtn.classList.remove("bg-amber-700", "text-white")
  } else {
    corporate.classList.remove("hidden")
    retail.classList.add("hidden")

    cBtn.classList.add("bg-amber-700", "text-white")
    cBtn.classList.remove("bg-gray-200")

    rBtn.classList.add("bg-gray-200")
    rBtn.classList.remove("bg-amber-700", "text-white")

    renderPackages()
  }
}


/* RETAIL LOGIC */
let cart = {};
function updateQty(name, price, change) {
  cart[name] = cart[name] || { price, qty: 0 };
  cart[name].qty += change;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartBar = document.getElementById("cartBar");

  cartItemsEl.innerHTML = "";

  let total = 0;
  let count = 0;

  Object.keys(cart).forEach(k => {
    const i = cart[k];
    total += i.price * i.qty;
    count += i.qty;

    cartItemsEl.innerHTML += `
      <li class="flex justify-between mb-2">
        <span>${k} × ${i.qty}</span>
        <span>₹${i.price * i.qty}</span>
      </li>
    `;
  });

  document.getElementById("total").innerText = total;
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cartCount").innerText = count;

  // Show / hide cart bar
  if (count > 0) {
    cartBar.classList.remove("hidden");
  } else {
    cartBar.classList.add("hidden");
  }
}

function openCart() {
  document.getElementById("cartDrawer").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.add("hidden");
}

let selectedCategory = null;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let selectedTea = null;

function openCustomization(tea) {
  selectedTea = tea;
  customTeaName.innerText = tea.name;
  customModal.classList.remove("hidden");
}

function addCustomizedItem() {
  const note = `
    ${lessSugar.checked ? "Less Sugar " : ""}
    ${strongTea.checked ? "Strong" : ""}
  `;
  updateQty(selectedTea.name + " (" + note + ")", selectedTea.price, 1);
  customModal.classList.add("hidden");
}
closepop.addEventListener("click", function () {
  customModal.classList.add("hidden");
})
function selectCategory(category) {
  selectedCategory = category;

  document.querySelectorAll(".typeBtn").forEach(btn => {
    btn.classList.remove("bg-amber-700", "text-white");
    btn.classList.add("bg-gray-200");
  });
  event.target.classList.remove("bg-gray-200");
  event.target.classList.add("bg-amber-700", "text-white");
  renderMenu();
}
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});

const teaMenu = [
  {
    name: "Tea",
    price: 40,
    category: "Popular",
    bestseller: true,
    image: "./assets/images/tea-order-photo_7.jpg"
  },
  {
    name: "Masala Tea",
    price: 40,
    category: "Popular",
    bestseller: true,
    image: "./assets/images/tea-order-photo_1.jpg"
  },
  {
    name: "Ginger Tea",
    price: 45,
    category: "Popular",
    bestseller: true,
    image: "./assets/images/tea-order-photo_2.jpg"
  },
  {
    name: "Green Tea",
    price: 50,
    category: "Healthy",
    bestseller: false,
    image: "./assets/images/tea-order-photo_3.jpg"
  },
  {
    name: "Irani Chai",
    price: 120,
    category: "Milk Special",
    bestseller: true,
    image: "./assets/images/tea-order-photo_4.jpg"
  },
  {
    name: "Kashmiri Kahwa",
    price: 90,
    category: "Premium",
    bestseller: false,
    image: "./assets/images/tea-order-photo_5.jpg"
  },
  {
    name: "Lemon Iced Tea",
    price: 70,
    category: "Cold",
    bestseller: false,
    image: "./assets/images/tea-order-photo_6.jpg"
  },
  {
    name: "chamomile Tea",
    price: 50,
    category: "Healthy",
    bestseller: false,
    image: "./assets/images/tea-order-photo_8.jpg"
  },
  {
    name: "Black Tea",
    price: 50,
    category: "Healthy",
    bestseller: false,
    image: "./assets/images/tea-order-photo_9.jpg"
  }
  ,
  {
    name: "Tea with Biscuits",
    price: 80,
    category: "Snacks",
    bestseller: false,
    image: "./assets/images/tea-order-photo_10.jpg"
  }
];

function renderMenu() {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";

  const menu = teaMenu.filter(t =>
    (!selectedCategory || t.category === selectedCategory) &&
    t.name.toLowerCase().includes(search)
  );

  menuGrid.innerHTML = "";

  if (menu.length === 0) {
    if (menu.length === 0) {
      menuGrid.innerHTML = `
    <div class="col-span-2 text-center mt-10">
      <p class="text-4xl">☕</p>
      <p class="text-gray-500 mt-2">No tea found</p>
      <p class="text-sm text-gray-400">Try another category</p>
    </div>
  `;
      return;
    }
  }

  menu.forEach(t => {
    const isFav = favorites.includes(t.name);

    menuGrid.innerHTML += `
      <div class="bg-white rounded shadow overflow-hidden">
        <img src="${t.image}" class="h-32 w-full object-cover">

        <div class="p-3">
          <div class="flex justify-between">
            <h3 class="font-bold">${t.name}</h3>
            <button onclick="toggleFav('${t.name}')">
              ${isFav ? "❤️" : "🤍"}
            </button>
          </div>

          <p class="text-sm text-gray-500">${t.category}</p>
          <p>₹${t.price}</p>

          ${t.bestseller ? `<span class="text-xs text-orange-600 font-bold">⭐ GOOD RATING</span>` : ""}

          <div class="flex gap-2 mt-2">
            <button onclick="updateQty('${t.name}',${t.price},-1)"
              class="px-3 bg-gray-300 rounded">−</button>

            <button onclick="openCustomization(${JSON.stringify(t).replace(/"/g, '&quot;')})"
              class="px-3 bg-blue-600 text-white rounded">
              Customize
            </button>

            <button onclick="updateQty('${t.name}',${t.price},1)"
              class="px-3 bg-amber-700 text-white rounded">+</button>
          </div>
        </div>
      </div>
    `;
  });
}


function toggleFav(name) {
  favorites = favorites.includes(name)
    ? favorites.filter(f => f !== name)
    : [...favorites, name];

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderMenu();
}


const monthlyPackages = [
  {
    name: "Starter Office",
    cupsPerDay: "20 cups/day",
    price: "₹4,999 / month",
    includes: ["Milk Tea", "Green Tea", "Ginger Tea"]
  },
  {
    name: "Standard Office",
    cupsPerDay: "40 cups/day",
    price: "₹8,999 / month",
    includes: ["Milk Tea", "Green Tea", "Masala Tea", "Lemon Tea"]
  },
  {
    name: "Premium Office",
    cupsPerDay: "Unlimited",
    price: "₹14,999 / month",
    includes: ["All Tea Types", "On-call refill", "Priority support"]
  }
];
function renderPackages() {
  const grid = document.getElementById("packageGrid");
  grid.innerHTML = "";

  monthlyPackages.forEach(p => {
    grid.innerHTML += `
      <div class="border rounded-lg p-4 shadow">
        <h3 class="text-lg font-bold mb-1">${p.name}</h3>
        <p class="text-sm text-gray-500">${p.cupsPerDay}</p>

        <p class="text-xl font-semibold my-2 text-amber-700">${p.price}</p>

        <ul class="text-sm text-gray-600 mb-3">
          ${p.includes.map(i => `<li>✔ ${i}</li>`).join("")}
        </ul>

        <button onclick="openCorporateForm('${p.name}')"
          class="w-full py-2 bg-amber-700 text-white rounded">
          Request Subscription
        </button>
      </div>
    `;
  });
}
function openCorporateForm(packageName) {
  alert("Please feel free fill Enquiry form for: " + packageName);
}

//form validation
const submitwithoutLoginbtn = document.getElementById("submitwithoutLoginbtn")
const submitwithLoginbtn = document.getElementById("submitwithLoginbtn")
const txtName = document.getElementById("txtName")
const txtMobile = document.getElementById("txtMobile")
const txtAddress = document.getElementById("txtAddress")
const spnErrorName = document.getElementById("spnErrorName")
const spnErrorMobile = document.getElementById("spnErrorMobile")
const spnErrorAddress = document.getElementById("spnErrorAddress")
const namePattern = /^[A-Za-z]+$/;
const mobilePattern = /^[0-9]{10}$/;
var isvalid = true
submitwithoutLoginbtn.addEventListener("click", function (event) {
  event.preventDefault();
  isvalid = true
  if (txtName.value == "") {
    spnErrorName.innerHTML = "Please enter the name";
    isvalid = false;
  }

  else {
    if (!namePattern.test(txtName.value)) {
      spnErrorName.innerHTML = "Name must contain alphabets only";
      isvalid = false;
    }
    else {
      spnErrorName.innerHTML = "";
    }

  }

  if (txtMobile.value == "") {
    spnErrorMobile.innerHTML = "Please enter the mobile number";
    isvalid = false;
  }

  else {
    if (!mobilePattern.test(txtMobile.value)) {
      spnErrorMobile.innerHTML = "Enter a valid 10-digit mobile number";
      isvalid = false;
    }
    else {
      spnErrorMobile.innerHTML = "";
    }

  }

  if (txtAddress.value == "") {
    spnErrorAddress.innerHTML = "Please enter full address";
    isvalid = false;
  }
  else {
    if (txtAddress.value.length < 10) {
      spnErrorAddress.innerHTML =
        "Address must be at least 10 characters long";
      isValid = false;
    }
    else {
      spnErrorAddress.innerHTML = "";
    }

  }

  if (isvalid)
   // alert("You ordered sucessfully")
  window.location.href = "./thanksorder.html";

})

submitwithLoginbtn.addEventListener("click", function (event) {
  event.preventDefault();
window.location.href = "./login.html";
})

const btnEnquire=document.getElementById("btnEnquire")
const txtEnqName=document.getElementById("txtEnqName")
const txtEnqMobile=document.getElementById("txtEnqMobile")
const spnEnqErrorName=document.getElementById("spnEnqErrorName")
const spnEnqErrorMobile=document.getElementById("spnEnqErrorMobile")
const txtEnqEmail=document.getElementById("txtEnqEmail")
const txtEnqComapny=document.getElementById("txtEnqComapny")
const spnEnqErrorEmail=document.getElementById("spnEnqErrorEmail")
const spnEnqErrorComapny=document.getElementById("spnEnqErrorComapny")
const mobilePattern1 = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isvalidEnq=true
   btnEnquire.addEventListener("click",function(event){
    //event.preventDefault();
    isvalidEnq=true
    if(txtEnqName.value=="")
    {
        spnEnqErrorName.innerHTML="Please enter the name"
        isvalidEnq=false
    }
    else{
        spnEnqErrorName.innerHTML=""
    }
    if(txtEnqMobile.value=="")
    {
       spnEnqErrorMobile.innerHTML="Please enter the mobile number"
       isvalidEnq=false
    }
    else {
    if (!mobilePattern1.test(txtEnqMobile.value)) {
      spnEnqErrorMobile.innerHTML = "Enter a valid 10-digit mobile number";
      isvalidEnq = false;
    }
    else {
      spnEnqErrorMobile.innerHTML = "";
    }

  }
  if(txtEnqEmail.value=="")
    {
       spnEnqErrorEmail.innerHTML="Please enter the email"
       isvalidEnq=false
    }
    else {
    if (!emailRegex.test(txtEnqEmail.value)) {
      spnEnqErrorEmail.innerHTML = "Please enter valid email";
      isvalidEnq = false;
    }
    else {
      spnEnqErrorEmail.innerHTML = "";
    }

  }

  if(txtEnqComapny.value=="")
    {
        spnEnqErrorComapny.innerHTML="Please enter the company name"
        isvalidEnq=false
    }
    else{
        spnEnqErrorComapny.innerHTML=""
    }

   
    if(isvalidEnq)
    {
     alert("Your enquire sucessfully added.Our Team will contact you soon")
     location.reload();   // refresh page
    }
   
})

