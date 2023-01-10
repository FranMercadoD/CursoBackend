class ProductManager {
    constructor() {
      this.products = [];
    }
  
    agregarProducto(title, description, price, thumbnail, code, stock) {
      const producto = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
     //Validacion todos obligatorios 
      if (title === undefined ||description === undefined ||
        price === undefined ||thumbnail === undefined ||
        code === undefined ||stock === undefined ) 
        {
        return console.log("Todos los campos son obligatorios");
      }
  
      let condition = this.products.find((producto) => producto.code === code);
      if (condition) {
        return console.log("El producto ya existe");
      } else {
        this.products.push(producto);
      }
    }
  
      getProducts() {     return this.products;    }
  
    getProductById(id) {
      let oId = parseInt(id);
      let oProducto = null;
      this.products.forEach((producto) => {
        if (producto.id === oId) {
          oProducto = producto;
        }
      });
      if (oProducto === null) {
        return console.log("Not found");
      } else {
        return oProducto;
      }
    }
  }
  
  const productManager = new ProductManager();

  productManager.agregarProducto("Cafetera","Prensa Francesa",4500,"https://tiendafc.vtexassets.com/arquivos/ids/155405-800-auto?v=637674048974100000&width=800&height=auto&aspect=true","1234",8);
  productManager.agregarProducto("Cafetera","Cafetera Italiana",2980,"https://http2.mlstatic.com/D_NQ_NP_763368-MLA42155154804_062020-O.webp", "330",   5  );
  
  console.log(productManager.getProducts());
  
  console.log("busqueda de producto", productManager.getProductById(1));
  
  
  
  console.log(productManager.getProducts());