const containerProductos = document.querySelector(".container");
const items = document.getElementById("items");

const templateCard = document.getElementById("template-card").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment(); //el fragment se usa para evitar el reflow de la pagina

const dataBase = [
  {
    id: 1,
    precio: 50,
    categoria: "Vacaciones",
    img: "https://picsum.photos/id/10/600",
  },
  {
    id: 2,
    precio: 150,
    categoria: "Compras",
    img: "https://picsum.photos/id/30/600",
  },
  {
    id: 3,
    precio: 200,
    categoria: "Computer",
    img: "https://picsum.photos/id/20/600",
  },
];

let carrito = {};

const pintarCard = () => {
  dataBase.forEach((producto) => {
    templateCard.querySelector("img").setAttribute("src", producto.img);
    templateCard.querySelector("h5").textContent = producto.categoria;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
    containerProductos.appendChild(fragment);

    // console.log(producto);
  });
};
pintarCard();

containerProductos.addEventListener("click", (e) => {
  // console.log(e.target.parentElement);
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
    pintarCarrito();
  }
});

// con setCarrito tomo el div al que le hice click => (e.target.parentElement)
const setCarrito = (item) => {
  const producto = {
    id: item.querySelector(".btn-dark").dataset.id,
    precio: item.querySelector("p").textContent,
    categoria: item.querySelector("h5").textContent,
    cantidad: 1,
  };
  //console.log(producto);
  // carrito.push(producto);
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
    //producto.cantidad++;
  }
  carrito[producto.id] = { ...producto };
  //console.log(carrito);

  //fragment.appendChild(carrito);
};

const pintarCarrito = () => {
  items.innerHTML = "";

  Object.values(carrito).forEach((e) => {
    templateCarrito.querySelector("th").textContent = e.id;
    templateCarrito.querySelectorAll("td")[0].textContent = e.categoria;
    templateCarrito.querySelectorAll("td")[1].textContent = e.cantidad;
    templateCarrito.querySelector("span").textContent = e.cantidad * e.precio;

    //botones
    templateCarrito.querySelector(".btn-info").dataset.id = e.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = e.id;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
    // console.log(fragment);
  });
  items.appendChild(fragment);
  // containerProductos.appendChild(fragment);
  pintarFooter();
};

const pintarFooter = () => {
  pintarFooter.innerHTML = "";
};
