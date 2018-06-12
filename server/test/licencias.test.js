process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let moment = require('moment');
let randomstring = require("randomstring");
let server = require('../server');
let should = chai.should();

const {Licencia} = require('../models/licencia');
const {Cliente}  = require('../models/cliente');
const {Software} = require('../models/software');

chai.use(chaiHttp);

describe('Licencias', () => {
    let url = "/api/licencias/";
    let licencia;
    let nombre;
    let cliente;
    let software;

    beforeEach(async () => { 
        await Licencia.remove({});        
		await Cliente.remove({});        
		await Software.remove({});                
    });

    const insertarCliente = async () => {
    	nombre = randomstring.generate();
        cliente = new Cliente({nombre});
        await cliente.save();
    }

    const insertarSoftware = async () => {
    	nombre = randomstring.generate();    	
        software = new Software({nombre});
        await software.save();
    }    

    const insertarLicencia = async () => {        
        await insertarCliente();
        await insertarSoftware();

        licencia = new Licencia({
        	observaciones: '',
        	unidades  : 1,
			caducidad : moment().add(7, 'days'),
        	cliente   : cliente._id, 
        	software  : software._id        	
        });

		await licencia.save();
    };    

    describe('GET /', () => {
      it('debe devolver todas las licencias', async () => {
        const res = await chai.request(server).get(url);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
      });
    });

    describe('GET /:id', () => {
      it('debe devolver un error 404 si no se encuentra la licencia', async () => {        
        const res = await chai.request(server).get(url + '1');          
        
        res.should.have.status(404);            
      });

      it('debe devolver una licencia si el id es válido', async () => {
        await insertarLicencia();
        const res = await chai.request(server).get(url + licencia._id);
        
        res.should.have.status(200);        
        res.body.should.be.a('object');
        res.body.should.have.property('observaciones');
        res.body.should.have.property('unidades');
        res.body.should.have.property('caducidad');
        res.body.should.have.property('cliente');
        res.body.should.have.property('software');
        res.body.should.have.property('_id').eql(licencia.id);
      });
    }); // GET

    describe('POST /', () => {
      it('debe devolver un error 400 si no se facilita el cliente asociado a la licencia', async () => {        
        await insertarSoftware();

        let licencia = {
        	observaciones: randomstring.generate(),
        	unidades: 1,
        	caducidad: moment().add(7, 'days'),
        	software: software._id
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(400);                     
      });

      it('debe devolver un error 400 si no se facilita el software asociado a la licencia', async () => {        
        await insertarCliente();

        let licencia = {
        	observaciones: randomstring.generate(),
        	unidades : 1,
        	caducidad: moment().add(7, 'days'),
        	cliente  : cliente._id
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(400);                     
      });

      it('debe devolver un error 400 si las unidades son inferiores a 1', async () => {        
        await insertarCliente();
        await insertarSoftware();

        let licencia = {
        	observaciones: randomstring.generate(),
        	unidades : 0,
        	caducidad: moment().add(7, 'days'),
        	cliente  : cliente._id,
        	software : software._id
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(400);                     
      });

      it('debe devolver un error 400 si la caducidad es anterior a hoy', async () => {        
        await insertarCliente();
        await insertarSoftware();

        let licencia = {
			observaciones: randomstring.generate(),
        	unidades : 10,
        	caducidad: moment().subtract(7, 'days'),
        	cliente  : cliente._id,
        	software : software._id
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(400);                     
      });

      it('debe devolver un error 400 si no se facilita ni software ni cliente', async () => {        
        let licencia = {
			observaciones: randomstring.generate(),
        	unidades : 1,
        	caducidad: moment().add(7, 'days')
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(400);                     
      });

      it('debe devolver un estado 200 si la licencia es registrada correctamente', async () => {        
        await insertarCliente();
        await insertarSoftware();

        let licencia = {
			observaciones: randomstring.generate(),
        	unidades : 10,
        	caducidad: moment().add(7, 'days'),
        	cliente  : cliente._id,
        	software : software._id
        }

        const res = await chai.request(server).post(url).send(licencia);          
        
        res.should.have.status(200);
        res.body.should.be.a('object');  
        res.body.should.have.property('observaciones');
        res.body.should.have.property('unidades');
        res.body.should.have.property('caducidad');
        res.body.should.have.property('cliente');
        res.body.should.have.property('software');
        res.body.should.have.property('_id');
      });
    }); // POST

	describe('PUT /', () => {
      it('debe devolver un 200 si la licencia se ha actualizado correctamente', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : 1000,
        	caducidad: moment().add(7, 'days'),
        	cliente  : cliente._id,
        	software : software._id
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(200);  
        res.body.should.be.a('object');  
        res.body.should.have.property('observaciones');
        res.body.should.have.property('unidades');
        res.body.should.have.property('caducidad');
        res.body.should.have.property('cliente');
        res.body.should.have.property('software');
        res.body.should.have.property('_id');
      });

      it('debe devolver un 404 si la licencia a actualizar no se encuentra', async () => {        
  		let licencia = {
			observaciones: randomstring.generate(),
        	unidades : 1000,
        	caducidad: moment().add(7, 'days'),
        	cliente  : cliente._id,
        	software : software._id
        }      	

      	const res = await chai.request(server).put(url + '1').send(licencia);
        
        res.should.have.status(404);                     
      });

      it('debe devolver un 400 si la licencia a actualizar no se indica el cliente', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : 1000,
        	caducidad: moment().add(7, 'days'),        	
        	software : software._id
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(400);                     
      });

      it('debe devolver un 400 si la licencia a actualizar no se indica el software', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : 1000,
        	caducidad: moment().add(7, 'days'),        	
        	cliente  : cliente._id
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(400);                     
      });

      it('debe devolver un 400 si la licencia a actualizar tiene unas unidades inferiores a 0', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : -10,
        	caducidad: moment().add(7, 'days'),        	
        	software : software._id
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(400);                     
      });

      it('debe devolver un 400 si la caducidad de la licencia a actualizar es anterior a hoy', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : 1000,
        	caducidad: moment().subtract(7, 'days'),        	
        	software : software._id,
        	cliente  : cliente._id
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(400);                     
      });

      it('debe devolver un 400 si la licencia a actualizar no tiene ni cliente ni software', async () => {        
      	await insertarLicencia();

  		let licenciaNueva = {
			observaciones: randomstring.generate(),
        	unidades : 1,
        	caducidad: moment().add(7, 'days')
        }      	

      	const res = await chai.request(server).put(url + licencia._id).send(licenciaNueva);
        
        res.should.have.status(400);                     
      });
	}); //PUT

    describe('DELETE /', () => {
      it('debe devolver un error 404 si no se encuentra la licencia a borrar', async () => {        
      	const res = await chai.request(server).delete(url + '1');
        
        res.should.have.status(404);                     
      });

      it('debe devolver un 200 si el borrado de la licencia ha tenido éxito', async () => {        
      	await insertarLicencia();
      	const res = await chai.request(server).delete(url + licencia._id);
        
        res.should.have.status(200); 
		res.body.should.be.a('object');        
        res.body.should.have.property('observaciones');
        res.body.should.have.property('unidades');
        res.body.should.have.property('caducidad');
        res.body.should.have.property('cliente');
        res.body.should.have.property('software');
        res.body.should.have.property('_id').eql(licencia.id);
      });
    }); // DELETE
});
