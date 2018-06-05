const request  = require('supertest');
const mongoose = require('mongoose');
const {Licencia} = require('../models/licencia');
const {Cliente}  = require('../models/cliente');
const {Software} = require('../models/software');

let server;

describe('/api/licencias', () => {
	beforeEach(() => { server = require('../server'); })
	afterEach(async () => { 
		server.close(); 
		await Cliente.remove({});
		await Software.remove({});
		await Licencia.remove({});
	});

	describe('GET /', () => {
		it('devuelve todas las licencias', async () => {	
			const cliente = new Cliente({nombre: 'cliente1'});
			await cliente.save();

			const software = new Software({nombre: 'software1'});
			await software.save();

			const licencias = [
        		{ 
        		  observaciones: 'observaciones1', 
        		  unidades: 1, 
        		  caducidad: '2018-05-30', 
        		  cliente: cliente._id, 
        		  software: software._id
        		},
        		{ 
        		  observaciones: 'observaciones2', 
        		  unidades: 1, 
        		  caducidad: '2018-05-30', 
        		  cliente: cliente._id, 
        		  software: software._id
        		}        		
      		];			

			await Licencia.collection.insertMany(licencias);

			const res = await request(server).get('/api/licencias');

			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);				
		});
	});

	describe('GET /:id', () => {
		it('devuelve una licencia si el id es correcto', async () => {
			const cliente  = new Cliente({nombre: 'cliente1'});
			const software = new Software({nombre: 'software1'});

			const licencia = new Licencia({
        		  observaciones: 'observaciones1', 
        		  unidades: 1, 
        		  caducidad: '2018-05-30', 
        		  cliente: cliente._id,
        		  software: software._id
			});
			
			await licencia.save();
			res = await request(server).get('/api/licencias/' + licencia._id);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('observaciones', licencia.observaciones);
			expect(res.body).toHaveProperty('unidades', licencia.unidades);
			expect(res.body).toHaveProperty('caducidad');
			expect(res.body).toHaveProperty('cliente');
			expect(res.body).toHaveProperty('software');
		});

		it('devuelve estado 404 si el id es incorrecto', async () => {
			const res = await request(server).get('/api/licencias/1');
			
			expect(res.status).toBe(404);
		});

		it('devuelve estado 404 si la licencia no existe', async () => {
			const cliente  = new Cliente({nombre: 'cliente1'});
			const software = new Software({nombre: 'software1'});

			const licencia = new Licencia({
        		  observaciones: 'observaciones1', 
        		  unidades: 1, 
        		  caducidad: '2018-05-30', 
        		  cliente: cliente._id,
        		  software: software._id
			});
			
			await licencia.save();

			res = await request(server).get('/api/licencias/1');

			expect(res.status).toBe(404);
		});
	});

	describe('POST /', () => {
		let cliente_id;
		let software_id;
		let observaciones;
		let caducidad;
		let unidades;

		const exec = async () => {
			return await request(server)
				.post('/api/licencias')
				.send({caducidad, unidades, observaciones, cliente: cliente_id, software: software_id });
		};

		it('devuelve la licencia aunque no se indique observaciones', async () => {	
			let software = new Software({nombre: 'software1'});
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = '';
			let caducidad = '2020-05-30';
			let unidades = 1;

			let cliente_id = cliente._id;
			let software_id = software._id;

			const res = await exec();
			const licencia = await Licencia.find({cliente: cliente_id});				
			
			expect(licencia).not.toBeNull();
		});

		it('devuelve la licencia cuando se proporcionan todos los datos', async () => {	
			let software = new Software({nombre: 'software1'});
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = 'observaciones';
			let caducidad = '2020-05-30';
			let unidades = 1;

			let cliente_id = cliente._id;
			let software_id = software._id;

			const res = await exec();
			const licencia = await Licencia.find({cliente: cliente_id});				
			
			expect(licencia).not.toBeNull();
		});

		it('devuelve 400 si las unidades son inferiores a una unidad', async () => {	
			let software = new Software({nombre: 'software1'});
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = 'observaciones';
			let caducidad = '2020-05-30';
			let unidades = 0;

			let cliente_id = cliente._id;
			let software_id = software._id;

			const res = await exec();					
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si la caducidad es anterior a hoy', async () => {	
			let software = new Software({nombre: 'software1'});
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = 'observaciones';
			let caducidad = '2018-05-30';
			let unidades = 0;

			let cliente_id = cliente._id;
			let software_id = software._id;

			const res = await exec();					
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si la caducidad no se indica', async () => {	
			let software = new Software({nombre: 'software1'});
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = 'observaciones';
			let caducidad = '';
			let unidades  = 1;

			let cliente_id = cliente._id;
			let software_id = software._id;

			const res = await exec();					
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si no hay cliente', async () => {	
			let software = new Software({nombre: 'software1'});			
			let observaciones = 'observaciones';
			let caducidad = '';
			let unidades  = 1;

			let software_id = software._id;
			const res = await exec();					
			
			expect(res.status).toBe(400);
		});

		it('devuelve 400 si no hay software', async () => {	
			let cliente  = new Cliente({nombre: 'cliente1'});
			let observaciones = 'observaciones';
			let caducidad = '';
			let unidades  = 1;

			let cliente_id = cliente._id;
			const res = await exec();					
			
			expect(res.status).toBe(400);
		});
	});


	describe('DELETE /:id', () => {
		let id;
		let licencia;
		let cliente;
		let software;

	    const exec = async () => {
	      return await request(server)
	        .delete('/api/licencias/' + id)
	        .send();
	    };

	    beforeEach(async () => {
	      cliente  = new Cliente({nombre: 'cliente1'});
	      software = new Software({nombre: 'software1'});

	      licencia = new Licencia({ 
	      	unidades: 1,
	      	observaciones: 'observaciones1',
	      	caducidad: '2020-1-1',
	      	cliente: cliente._id,
	      	software: software._id
	      });

	      await licencia.save();
	      
	      id = licencia._id; 
	    });
    	
    	it('devuelve 404 si el id no es correcto', async () => {
      		id = 1;       
      		const res = await exec();

      		expect(res.status).toBe(404);
    	});

	    it('devuelve 400 si el id no se encuentra', async () => {
	      id = mongoose.Types.ObjectId();
	      const res = await exec();

	      expect(res.status).toBe(400);
	    });

	    it('elimina la licencia si todo es correcto', async () => {
	      await exec();
	      const licencia = await Licencia.findById(id);

	      expect(licencia).toBeNull();
	    });

	    it('devuelve la licencia eliminada', async () => {
	      const res = await exec();

	      expect(res.body).toHaveProperty('_id', licencia._id.toHexString());
	      expect(res.body).toHaveProperty('nombre', licencia.nombre);
	    }); 
	});
});