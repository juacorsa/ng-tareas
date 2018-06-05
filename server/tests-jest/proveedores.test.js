const request = require('supertest');
const {Proveedor} = require('../models/proveedor');

let server;

describe('/api/proveedores', () => {
	beforeEach(() => { server = require('../server'); })
	afterEach(async () => { 
		server.close(); 
		await Proveedor.remove({});
	});

	describe('GET /', () => {
		it('devuelve todos los proveedores', async () => {			
			const proveedores = [
        		{ nombre: 'proveedor1' },
        		{ nombre: 'proveedor2' }
      		];			

			await Proveedor.collection.insertMany(proveedores);

			const res = await request(server).get('/api/proveedores');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);			
			expect(res.body.some(p => p.nombre === 'proveedor1')).toBeTruthy();
			expect(res.body.some(p => p.nombre === 'proveedor2')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('devuelve un proveedor si el id es correcto', async () => {
			const proveedor = new Proveedor({nombre: 'proveedor 1'});
			await proveedor.save();

			const res = await request(server).get('/api/proveedores/' + proveedor._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', proveedor.nombre);
		});

		it('devuelve 404 si el id es incorrecto', async () => {
			const res = await request(server).get('/api/proveedores/1');
			
			expect(res.status).toBe(404);
		});

		it('devuelve 404 si el proveedor no existe', async () => {
			const proveedor = new Proveedor({nombre: 'proveedor 1'});
			await proveedor.save();

			const res = await request(server).get('/api/proveedores/1');

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let nombre;

		const exec = async () => {
			return await request(server)
				.post('/api/proveedores')
				.send({ nombre: nombre });
		};

		it('devuelve 400 si el nombre del proveedor es menor de 3 caracteres', async () => {			
			nombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si el nombre del proveedor es mayor de 50 caracteres', async () => {
			nombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve un proveedor si es válido', async () => {			
			nombre = 'proveedor1';
			const res = await exec();
			const proveedor = await Proveedor.find({nombre});

			expect(proveedor).not.toBeNull();
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', nombre);
		});
	});

 	describe('PUT /:id', () => {
 		let id;
 		let nuevoNombre; 		

		const exec = async () => {
      		return await request(server)
        		.put('/api/proveedores/' + id)
                .send({ nombre: nuevoNombre });
    	}

	    beforeEach(async () => {
	      proveedor = new Proveedor({ nombre: 'proveedor1' });
	      await proveedor.save();      

	      id = proveedor._id; 
	      nuevoNombre = 'nuevoNombre'; 
	    });

		it('devuelve 400 si el nombre del proveedor es menor de 3 caracteres', async () => {			
			nuevoNombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si el nombre del proveedor es mayor de 50 caracteres', async () => {
			nuevoNombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve 404 si el id es incorrecto', async () => {
			id = 1;
			const res = await exec();
			
			expect(res.status).toBe(404);
		});	

	    it('devuelve el nombre del proveedor esperado', async () => {
	      await exec();
	      const proveedorActualizado = await Proveedor.findById(id);

	      expect(proveedorActualizado.nombre).toBe(nuevoNombre);
	    });

	    it('devuelve el proveedor si es correcto', async () => {
	      const res = await exec();

	      expect(res.body).toHaveProperty('_id');
	      expect(res.body).toHaveProperty('nombre', nuevoNombre);
	    });
 	});
});