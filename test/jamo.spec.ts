process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Users from '../src/modules/users/user.model';
import Jamos from '../src/modules/jamo/jamo.model';

chai.use(chaiHttp);
const expect = chai.expect;

const userURL: string = '/api/v1/users';
const jamoURL: string = '/api/v1/jamo';

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

const jamoVocalTest = {
  jamo: "ㅏ",
  tipo: "Vocal",
  nombre: "아",
  pron: "/ah/",
  esc_rom_nombre: "a",
  esc_rom: "a"
}

const jamoConsonanteTest = {
  jamo: "ㄱ",
  tipo: "Consonante",
  nombre: "기역",
  pron: "/gu/ /k/",
  esc_rom_nombre: "giyeok",
  esc_rom: "g"
}

const jamoGCTest = {
  jamo: "ㄳ",
  tipo: "Grupo Consonantico",
  nombre: "기역 시옷",
  pron: "/x/",
  esc_rom_nombre: "giyeok siot",
  esc_rom: "x"
}

const jamoPostTest = {
  jamo: "ㅠ",
  tipo: "Vocal",
  nombre: "유",
  pron: "/iu/",
  esc_rom_nombre: "yu",
  esc_rom: "yu"
}

describe('Jamo', () => {
  beforeEach(async () => {
    let dropUsers = await Users.collection.drop();
    let createUser = await Users.create(adminUserTest);
    let dropJamos = await Jamos.collection.drop();
    let createJamoVocal = await Jamos.create(jamoVocalTest);
    let createJamoConsonante = await Jamos.create(jamoConsonanteTest);
    let createJamoGC = await Jamos.create(jamoGCTest);
  });

  describe('/', () => {
    it('GET => Debe obtener todos los jamos', (done) => {
      chai.request(app).get(jamoURL).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(3);
        expect(res.body[0].jamo).to.equal(jamoVocalTest.jamo);
        done();
      });
    });

    it('GET => Debe obtener todos los jamos vocales', (done) => {
      chai.request(app).get(`${jamoURL}/vocales`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].jamo).to.equal(jamoVocalTest.jamo);
        done();
      })
    });

    it('GET => Debe obtener todos los jamos consonantes', (done) => {
      chai.request(app).get(`${jamoURL}/consonantes`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].jamo).to.equal(jamoConsonanteTest.jamo);
        done();
      })
    });

    it('GET => Debe obtener todos los jamos de grupos consonanticos', (done) => {
      chai.request(app).get(`${jamoURL}/grupos_consonanticos`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].jamo).to.equal(jamoGCTest.jamo);
        done();
      })
    });

    it('POST => Debe crear un nuevo jamo', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password
      }).end((err, res) => {
        chai.request(app)
          .post(jamoURL)
          .send(jamoPostTest)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.jamo).to.equal(jamoPostTest.jamo);
            done();
          });
      });
    });

    it('POST => No debe crear un nuevo jamo sin todos los campos requeridos', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(jamoURL)
          .send({
            jamo: "faltan_campos"
          })
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(400);
            expect(r).to.have.status(400);
            done();
          });
      });
    });

    it('POST => No debe crear un nuevo jamo si el tipo no es uno de los valores predefinidos', (done) => {
      let jamoChanged = Object.assign({}, jamoPostTest, { tipo: 'other' });
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(jamoURL)
          .send(jamoChanged)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.exist
            expect(e).to.have.status(400);
            expect(r).to.have.status(400);
            done();
          });
      });
    });

  });

  describe('/:id', () => {
    it('GET:id => Debe obtener un jamo por id', (done) => {
      chai.request(app).get(jamoURL).end((err, res) => {
        chai.request(app).get(`${jamoURL}/${res.body[0]._id}`).end((e, r) => {
          expect(e).to.be.null;
          expect(r).to.have.status(200);
          expect(r).to.be.json;
          expect(r.body.jamo).to.equal(res.body[0].jamo);
          done();
        });
      });
    });

    it('PATCH:id => Debe modificar un jamo por id', (done) => {
      let jamoPatch = {
        jamo: jamoVocalTest.jamo + ".",
      }
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(jamoURL).end((e, r) => {
          chai.request(app)
            .patch(`${jamoURL}/${r.body[0]._id}`)
            .send(jamoPatch)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              expect(r).to.be.json;
              expect(r.body.jamo).to.equal(jamoPatch.jamo).to.equal(jamoVocalTest.jamo + '.');
              done();
            });
        });
      });
    });

    it('DELETE:id => Debe eliminar un jamo por id', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(jamoURL).end((e, r) => {
          chai.request(app).del(`${jamoURL}/${r.body[0]._id}`)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              done();
            });
        });
      });
    });
  });

  describe('/:id/audiovisuales', () => {
    it('POST:id/img => Debe agregar la imagen al jamo seleccionado', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        const token = res.body.token;
        chai.request(app).get(jamoURL).end((err, res) => {
          chai.request(app)
            .post(`${jamoURL}/${res.body[0]._id}/img`)
            .set('authorization', token)
            .attach('img', './data/imagenes/아.svg', 'jamoImg.svg')
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(201);
              expect(r).to.be.json;
              expect(r.body).to.have.property('img');
              expect(r.body.jamo).to.equal(jamoVocalTest.jamo);
              done();
            });
        });
      });
    });

    it('POST:id/audio => Debe agregar los audios al jamo seleccionado', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        const token = res.body.token;
        chai.request(app).get(jamoURL).end((err, res) => {
          chai.request(app)
            .post(`${jamoURL}/${res.body[0]._id}/audio`)
            .set('authorization', token)
            .attach('audio', './data/audio/mp3/ㅏ/아♀.mp3', 'audio1.mp3')
            .attach('audio', './data/audio/mp3/ㅏ/아♂.mp3', 'audio2.mp3')
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(201);
              expect(r).to.be.json;
              expect(r.body).to.have.property('audios');
              expect(r.body.audios).length(2);
              expect(r.body.jamo).to.equal(jamoVocalTest.jamo);
              expect(r.body.audios[0]).to.equal('audio1.mp3');
              done();
            });
        });
      });
    });

    it('POST:id/img => No debe agregar la imagen al jamo seleccionado - No imagen proporcionada', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        const token = res.body.token;
        chai.request(app).get(jamoURL).end((err, res) => {
          chai.request(app)
            .post(`${jamoURL}/${res.body[0]._id}/img`)
            .set('authorization', token)
            .end((e, r) => {
              expect(e).to.exist;
              expect(e).to.have.status(400);
              expect(r).to.have.status(400);
              done();
            });
        });
      });
    });

    it('POST:id/audio => No debe agregar los audios al jamo seleccionado - No audios proporcionados', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        const token = res.body.token;
        chai.request(app).get(jamoURL).end((err, res) => {
          chai.request(app)
            .post(`${jamoURL}/${res.body[0]._id}/audio`)
            .set('authorization', token)
            .end((e, r) => {
              expect(e).to.exist
              expect(e).to.have.status(400);
              expect(r).to.have.status(400);
              done();
            });
        });
      });
    });
  });
});