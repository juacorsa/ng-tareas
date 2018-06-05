const request = require('supertest');
const {Software} = require('../models/software');

let server;

describe('/api/software', () => {
	beforeEach(() => { server = require('../server'); })
	afterEach(async () => { 
		server.close(); 
		await Software.remove({});
	});

	describe('GET /', () => {
		it('devuelve todos los software', async () => {			
			const software = [
        		{ nombre: 'software1' },
        		{ nombre: 'software2' }
      		];			

			await Software.collection.insertMany(software);

			const res = await request(server).get('/api/software');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);			
			expect(res.body.some(p => p.nombre === 'software1')).toBeTruthy();
			expect(res.body.some(p => p.nombre === 'software2')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('devuelve un software si el id es correcto', async () => {
			const software = new Software({nombre: 'software1'});
			await software.save();

			const res = await request(server).get('/api/software/' + software._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', software.nombre);
		});

		it('devuelve 404 si el id es incorrecto', async () => {
			const res = await request(server).get('/api/software/1');
			
			expect(res.status).toBe(404);
		});

		it('devuelve 404 si el software no existe', async () => {
			const software = new Software({nombre: 'software1'});
			await software.save();

			const res = await request(server).get('/api/software/1');

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let nombre;

		const exec = async () => {
			return await request(server)
				.post('/api/software')
				.send({ nombre: nombre });
		};

		it('devuelve estado 400 si el nombre del software es menor de 3 caracteres', async () => {			
			nombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve estado 400 si el nombre del software es mayor de 50 caracteres', async () => {
			nombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve los datos del software si es válido', async () => {			
			nombre = 'software1';
			const res = await exec();
			const software = await Software.find({nombre});

			expect(software).not.toBeNull();
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('nombre', nombre);
		});
	});

 	describe('PUT /:id', () => {
 		let id;
 		let nuevoNombre; 		
 		let software;

		const exec = async () => {
      		return await request(server)
        		.put('/api/software/' + id)
                .send({ nombre: nuevoNombre });
    	}

	    beforeEach(async () => {
	      software = new Software({ nombre: 'software1' });
	      await software.save();      

	      id = software._id; 
	      nuevoNombre = 'nuevoNombre'; 
	    });

		it('devuelve estado 400 si el nombre del software es menor de 3 caracteres', async () => {			
			nuevoNombre = 'aa';			
			const res = await exec();
			
			expect(res.status).toBe(400);
		});

		it('devuelve estado 400 si el nombre del software es mayor de 50 caracteres', async () => {
			nuevoNombre = new Array(100).join('a');
			const res = await exec();	
			
			expect(res.status).toBe(400);
		});

		it('devuelve estado 404 si el id es incorrecto', async () => {
			id = 1;
			const res = await exec();
			
			expect(res.status).toBe(404);
		});	

	    it('devuelve el nombre del software esperado', async () => {
	      await exec();
	      const softwareActualizado = await Software.findById(id);

	      expect(softwareActualizado.nombre).toBe(nuevoNombre);
	    });

	    it('devuelve los datos del software si es correcto', async () => {
	      const res = await exec();

	      expect(res.body).toHaveProperty('_id');
	      expect(res.body).toHaveProperty('nombre', nuevoNombre);
	    });
 	});
});