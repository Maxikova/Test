class ServicioVentas {
    constructor() {
        this._ventas = [];
    }

    getAll() {
        return new Promise(resolve => {
            resolve(this._ventas);
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            let ventas = this._ventas.find(v => v.id == id);
            if (ventas) {
                resolve(ventas);
            } else {
                reject(`Numero de ventas no encontradoss`);
            }
        });
    }

    addVenta(id_cliente, id_vino) {
        return new Promise((resolve, reject) => {
            if (!id_cliente || !id_vino) {
                return reject(new Error('Faltan datos para agregar la venta'));
            }
    
            const nueva_venta = {
                id: this._ventas.length ? this._ventas[this._ventas.length - 1].id + 1 : 1,
                id_cliente,
                id_vino,
                fecha_venta: new Date().toISOString()
            };
    
            // Agregar la nueva venta al array
            this._ventas.push(nueva_venta);
    
            // Resolver la promesa con la nueva venta
            resolve(nueva_venta); // Solo devuelve la nueva venta
        });
    }
    

    deleteById(id) {
        return new Promise((resolve, reject) => {
            const index = this._ventas.findIndex(v => v.id === id);
            if (index != -1) {
                resolve(this._ventas.splice(index, 1));
            }
            else {
                reject(`No existe la venta con ${id}`);
            }
        });
    }
};

module.exports = new ServicioVentas();