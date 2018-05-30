const request = require('supertest');
const {Cliente} = require('../models/cliente');

let server;

describe('/api/clientes', () => {
	beforeEach(() => { server = require('../server'); })
	afterEach(async () => { 
		server.close(); 
		await Cliente.remove({});
	});

	describe('GET /', () => {
		it('devuelve todos los clientes', async () => {			
			const clientes = [
        		{ nombre: 'cliente1' },
        		{ nombre: 'cliente2' }
      		];			

			await Cliente.collection.insertMany(clientes);

			const res = await request(server).get('/api/clientes');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);			
			expect(res.body.some(p => p.nombre === 'cliente1')).toBeTruthy();
			expect(res.body.some(p => p.nombre === 'cliente2')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('devuelve un cliente si el id es correcto', async () => {
			const cliente = new Cliente({nombre: 'cliente1'});
			await cliente.save();

			const res = await request(server).get('/api/clientes/' + cliente._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', cliente.nombre);
		});

		it('devuelve 404 si el id es incorrecto', async () => {
			const res = await request(server).get('/api/clientes/1');
			
			expect(res.status).toBe(404);
		});

		it('devuelve 404 si el cliente no existe', async () => {
			const cliente = new Cliente({nombre: 'cliente1'});
			await cliente.save();

			const res = await request(server).get('/api/clientes/1');

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let nombre;

		const exec = async () => {
			return await request(server)
				.post('/api/clientes')
				.send({ nombre: nombre });
		};

		it('devuelve 400 si el nombre del cliente es menor de 3 caracteres', async () => {			
			nombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si el nombre del cliente es mayor de 50 caracteres', async () => {
			nombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve un cliente si es válido', async () => {			
			nombre = 'cliente1';
			const res = await exec();
			const cliente = await Cliente.find({nombre});

			expect(cliente).not.toBeNull();
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', nombre);
		});
	});

 	describe('PUT /:id', () => {
 		let id;
 		let nuevoNombre; 		
 		let cliente;

		const exec = async () => {
      		return await request(server)
        		.put('/api/clientes/' + id)
                .send({ nombre: nuevoNombre });
    	}

	    beforeEach(async () => {
	      cliente = new Cliente({ nombre: 'cliente1' });
	      await cliente.save();      

	      id = cliente._id; 
	      nuevoNombre = 'nuevoNombre'; 
	    });

		it('devuelve 400 si el nombre del cliente es menor de 3 caracteres', async () => {			
			nuevoNombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si el nombre del cliente es mayor de 50 caracteres', async () => {
			nuevoNombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve 404 si el id es incorrecto', async () => {
			id = 1;
			const res = await exec();
			
			expect(res.status).toBe(404);
		});	

	    it('devuelve el nombre del cliente esperado', async () => {
	      await exec();
	      const clienteActualizado = await Cliente.findById(id);

	      expect(clienteActualizado.nombre).toBe(nuevoNombre);
	    });

	    it('devuelve el cliente si es correcto', async () => {
	      const res = await exec();

	      expect(res.body).toHaveProperty('_id');
	      expect(res.body).toHaveProperty('nombre', nuevoNombre);
	    });
 	});
});
