process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

const {Proveedor} = require('../models/proveedor');

chai.use(chaiHttp);

describe('Proveedores', () => {
   let url = "/api/proveedores/";

    beforeEach(async () => { 
        await Proveedor.remove({});        
    });

    describe('GET /', () => {
      it('debe devolver todos los proveedores', async () => {
        const res = await chai.request(server).get(url);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
      });
    });

    describe('GET /:id', () => {
      it('debe devolver 404 si el id no es valido ', async () => {
        const nombre = 'proveedor1';
        const proveedor = new Proveedor({nombre});
        await proveedor.save();
        const res = await chai.request(server).get(url + '1').send(proveedor);          
        
        res.should.have.status(404);            
      });
    });

    describe('GET /:id', () => {
      it('debe devolver un proveedor si el id es correcto ', async () => {
        const nombre = 'proveedor1';
        const proveedor = new Proveedor({nombre});
        await proveedor.save();
        const res = await chai.request(server).get(url + proveedor._id).send(proveedor);          
        
        res.should.have.status(200);        
        res.body.should.be.a('object');
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id').eql(proveedor.id);
      });
    });

    describe('POST /', () => {
      it('no debe registrar un proveedor si no se facilita el nombre del mismo ', async () => {
        let proveedor = {nombre: ''};
        const res = await chai.request(server).post(url).send(proveedor);          
        
        res.should.have.status(400);                     
      });

      it('no debe registrar un proveedor si ya existe', async () => {
        const nombre = 'proveedor1';
        let proveedor = new Proveedor({nombre});
        await proveedor.save();

        proveedor = {nombre};
        const res = await chai.request(server).post(url).send(proveedor);          
        
        res.should.have.status(400);                     
      });

      it('debe registrar un proveedor dado el nombre del mismo', async () => {
        let nombre = 'proveedor1';
        let proveedor = {nombre};
        const res = await chai.request(server).post(url).send(proveedor);          
                
        res.should.have.status(200);    
        res.body.should.be.a('object');                 
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id');
      });
    });

    describe('PUT /', () => {
      it('debe actualizar dado el id de proveedor', async () => {
        const proveedor = new Proveedor({nombre: 'proveedor 1'});
        await proveedor.save();
        const res = await chai.request(server).put(url + proveedor.id).send({nombre: 'proveedor 2'});          
        
        res.should.have.status(200);                     
      });

      it('no debe actualizar un proveedor si no se facilita el nombre', async () => {
        const proveedor = new Proveedor({nombre: 'proveedor 1'});
        await proveedor.save();
        const res = await chai.request(server).put(url + proveedor.id).send({nombre: ''});          
        
        res.should.have.status(400);                     
      });

    });
});