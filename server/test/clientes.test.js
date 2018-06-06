process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

const {Cliente} = require('../models/cliente');

chai.use(chaiHttp);

describe('Clientes', () => {
    let url = "/api/clientes/";
    let cliente;
    let nombre;

    beforeEach(async () => { 
        await Cliente.remove({});        
    });

    const insertarCliente = async () => {
        nombre  = 'cliente1';
        cliente = new Cliente({nombre});
        return await cliente.save();
    };    

    describe('GET /', () => {
      it('debe devolver todos los clientes', async () => {
        const res = await chai.request(server).get(url);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
      });
    });

    describe('GET /:id', () => {
      it('debe devolver 404 si el id no es valido ', async () => {
        await insertarCliente();
        const res = await chai.request(server).get(url + '1').send(cliente);          
        
        res.should.have.status(404);            
      });
    });

    describe('GET /:id', () => {
      it('debe devolver un cliente si el id es correcto ', async () => {
        await insertarCliente();
        const res = await chai.request(server).get(url + cliente._id).send(cliente);          
        
        res.should.have.status(200);        
        res.body.should.be.a('object');
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id').eql(cliente.id);
      });
    });

    describe('POST /', () => {
      it('no debe registrar un cliente si no se facilita el nombre del mismo ', async () => {
        let cliente = {nombre: ''};
        const res = await chai.request(server).post(url).send(cliente);          
        
        res.should.have.status(400);                     
      });

      it('no debe registrar un cliente si ya existe', async () => {
        await insertarCliente();
        cliente = {nombre};
        const res = await chai.request(server).post(url).send(cliente);          
        
        res.should.have.status(400);                     
      });

      it('debe registrar un cliente dado el nombre del mismo', async () => {
        let nombre  = 'cliente1';
        let cliente = {nombre};
        const res = await chai.request(server).post(url).send(cliente);          
                
        res.should.have.status(200);    
        res.body.should.be.a('object');                 
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id');
      });
    });

    describe('PUT /', () => {
      it('debe actualizar el nombre del cliente si el id es correcto', async () => {
        await insertarCliente();
        const res = await chai.request(server).put(url + cliente.id).send({nombre: 'cliente2'});          
        
        res.should.have.status(200);                     
      });

      it('no debe actualizar un cliente si no se facilita el nombre', async () => {
        await insertarCliente();  
        const res = await chai.request(server).put(url + cliente.id).send({nombre: ''});          
        
        res.should.have.status(400);                     
      });
    });

    describe('GET /count', () => {
      it('debe devolver el numero de clientes', async () => {
        await insertarCliente();              
        const res = await chai.request(server).get(url + 'count');
        
        res.should.have.status(200);  
        res.text.should.be.a('string').eql('1');
      });      
    });
});