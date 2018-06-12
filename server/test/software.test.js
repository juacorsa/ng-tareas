process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

const {Software} = require('../models/software');

chai.use(chaiHttp);

describe('Software', () => {
    let url = "/api/software/";
    let software;
    let nombre;

    beforeEach(async () => { 
        await Software.remove({});        
    });

    const insertarSoftware = async () => {
        nombre  = 'software1';
        software = new Software({nombre});
        return await software.save();
    };    

    describe('GET /', () => {
      it('debe devolver todos los software', async () => {
        const res = await chai.request(server).get(url);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
      });
    });

    describe('GET /:id', () => {
      it('debe devolver 404 si el id no es valido ', async () => {
        await insertarSoftware();
        const res = await chai.request(server).get(url + '1').send(software);          
        
        res.should.have.status(404);            
      });
    });

    describe('GET /:id', () => {
      it('debe devolver un software si el id es correcto ', async () => {
        await insertarSoftware();
        const res = await chai.request(server).get(url + software._id).send(software);          
        
        res.should.have.status(200);        
        res.body.should.be.a('object');
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id').eql(software.id);
      });
    });

    describe('POST /', () => {
      it('no debe registrar un software si no se facilita el nombre del mismo ', async () => {
        let software = {nombre: ''};
        const res = await chai.request(server).post(url).send(software);          
        
        res.should.have.status(400);                     
      });

      it('no debe registrar un software si ya existe', async () => {
        await insertarSoftware();
        software = {nombre};
        const res = await chai.request(server).post(url).send(software);          
        
        res.should.have.status(400);                     
      });

      it('debe registrar un software dado el nombre del mismo', async () => {
        let nombre  = 'software1';
        let software = {nombre};
        const res = await chai.request(server).post(url).send(software);          
                
        res.should.have.status(200);    
        res.body.should.be.a('object');                 
        res.body.should.have.property('nombre').eql(nombre);
        res.body.should.have.property('_id');
      });
    });

    describe('PUT /', () => {
      it('debe actualizar el nombre del software si el id es correcto', async () => {
        await insertarSoftware();
        const res = await chai.request(server).put(url + software.id).send({nombre: 'software2'});          
        
        res.should.have.status(200);                     
      });

      it('no debe actualizar un software si no se facilita el nombre', async () => {
        await insertarSoftware();  
        const res = await chai.request(server).put(url + software.id).send({nombre: ''});          
        
        res.should.have.status(400);                     
      });
    });

    describe('GET /count', () => {
      it('debe devolver el numero de software', async () => {
        await insertarSoftware(); 
        const res = await chai.request(server).get(url + 'count');
        
        res.should.have.status(200);  
        res.text.should.be.a('string').eql('1');
      });      
    });
});