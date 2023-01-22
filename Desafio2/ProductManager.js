const fs = require('fs');

class ProductManager {
    constructor(file) {
        this.file = file;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.promises.readFile(this.file, 'utf-8')
                .then((data) => resolve(JSON.parse(data)))
                .catch((e) => {
                    fs.writeFileSync(this.file, '[]');
                    reject();
                })
        })
    }

    getById(number) {
        this.getAll().then((data) => console.log(data.find(item => item.id == number)))
        .catch((e) => console.log('No se enceontró el archivo'));
    }

    save(product) {
        this.getAll()
            .then((data) => {
                data.push({...product, id: data.length + 1});
                fs.promises.writeFile(this.file, JSON.stringify(data,null,'\t'));
               // console.log('Producto guardado con id: ' + (data.length));
            })
            .catch((e) => {
                product.id = 1;
                fs.writeFileSync(this.file, `[${JSON.stringify(product)}]`);
              //  console.log('Producto guardado con id: 1');
            })
    }

    async updateProduct(id, field) {
        let estado = await this.getAll();
        const result = estado.find((x) => x.id === id);
        const restEstado = estado.filter((x) => x.id != id);
        result[field] = value;
        let concatenado = restEstado.concat(result);
    
        if (!id || !field ) {
          console.log("→ → → Error : Deben completarse todos los campos");
        } else {
          fs.promises.writeFile(this.file, JSON.stringify(concatenado));
          console.log(`ID ${id} modificado correctamente`);
        }
      }
    

      async readFile() {
        return new Promise((resolve, reject) => {
          fs.readFile(this.file, "utf-8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
      async writeFile(data) {
        return new Promise((resolve, reject) => {
          fs.writeFile(this.file, JSON.stringify(data, null, "\t"), (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        });
      }
    


    deleteById(number) {
        this.getAll().then((data) => {
            const itemFind = data.find(item => item.id == number);
            const itemPosition = data.indexOf(itemFind);
            itemPosition !== -1 ? data.splice(itemPosition, 1) : console.log('Item no encontrado');
            fs.promises.writeFile(this.file, JSON.stringify(data));
        })
        .catch((e) => console.log('No se enceontró el archivo'));
    }

    deleteAll() {
        fs.promises.writeFile(this.file, '[]');
    }
}

const producto1 = new ProductManager('./productos.json');

producto1.getAll()
    .then((response) => console.log(response))
    .catch((error) => console.log('No se encontró el archivo y se creó uno nuevo.'))

 //producto1.save({ title: 'comida', price: 13900, thumbnail: 'http://' });



// producto1.getById(1)
 //producto1.deleteById(1);
// producto1.deleteAll();


 producto1.updateProduct( 1,"Zapatilla",1000,'fff');
 





