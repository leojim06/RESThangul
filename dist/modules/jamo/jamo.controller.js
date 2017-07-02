"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var Gridfs = require("gridfs-stream");
var mongoose_1 = require("mongoose");
var jamo_model_1 = require("./jamo.model");
var query_service_1 = require("../../services/query.service");
function createJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo, _a, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, jamo_model_1.default.createJamo(req.body)];
                case 1:
                    jamo = _c.sent();
                    _b = (_a = res.status(201)).json;
                    return [4 /*yield*/, jamo.save()];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    e_1 = _c.sent();
                    return [2 /*return*/, res.status(400).json(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createJamo = createJamo;
function getJamos(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamos, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.list(query_service_1.default(req.query))];
                case 1:
                    jamos = _a.sent();
                    if (jamos && jamos.length === 0)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [2 /*return*/, res.status(200).json(jamos)];
                case 2:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getJamos = getJamos;
function getVocales(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamos, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.getVocales(query_service_1.default(req.query))];
                case 1:
                    jamos = _a.sent();
                    if (jamos && jamos.length === 0)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [2 /*return*/, res.status(200).json(jamos)];
                case 2:
                    e_3 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_3)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getVocales = getVocales;
function getConsonantes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamos, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.getConsonantes(query_service_1.default(req.query))];
                case 1:
                    jamos = _a.sent();
                    if (jamos && jamos.length === 0)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [2 /*return*/, res.status(200).json(jamos)];
                case 2:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_4)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getConsonantes = getConsonantes;
function getGruposConsonanticos(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamos, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.getGruposConsonanticos(query_service_1.default(req.query))];
                case 1:
                    jamos = _a.sent();
                    if (jamos && jamos.length === 0)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [2 /*return*/, res.status(200).json(jamos)];
                case 2:
                    e_5 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_5)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getGruposConsonanticos = getGruposConsonanticos;
function getJamoById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo = _a.sent();
                    if (!jamo)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [2 /*return*/, res.status(200).json(jamo)];
                case 2:
                    e_6 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_6)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getJamoById = getJamoById;
function updateJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo_1, _a, _b, e_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo_1 = _c.sent();
                    if (!jamo_1)
                        return [2 /*return*/, res.sendStatus(404)];
                    Object.keys(req.body).forEach(function (key) {
                        jamo_1[key] = req.body[key];
                    });
                    _b = (_a = res.status(200)).json;
                    return [4 /*yield*/, jamo_1.save()];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    e_7 = _c.sent();
                    return [2 /*return*/, res.status(400).json(e_7)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateJamo = updateJamo;
function deletJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo = _a.sent();
                    if (!jamo)
                        return [2 /*return*/, res.sendStatus(404)];
                    return [4 /*yield*/, jamo.remove()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
                case 3:
                    e_8 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_8)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deletJamo = deletJamo;
function addAudioToJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo_2, audioFiles, savedFiles, _a, _b, e_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo_2 = _c.sent();
                    if (!jamo_2)
                        return [2 /*return*/, res.sendStatus(404)];
                    audioFiles = req.files;
                    if (audioFiles.length === 0)
                        return [2 /*return*/, res.sendStatus(400)];
                    return [4 /*yield*/, saveFiles(req.files)];
                case 2:
                    savedFiles = _c.sent();
                    savedFiles.forEach(function (file) {
                        jamo_2.audios.push(file);
                    });
                    _b = (_a = res.status(201)).json;
                    return [4 /*yield*/, jamo_2.save()];
                case 3: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                case 4:
                    e_9 = _c.sent();
                    return [2 /*return*/, res.status(400).json(e_9)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addAudioToJamo = addAudioToJamo;
function getAudioFromJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo, gfs, readstream, e_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo = _a.sent();
                    if (!jamo)
                        return [2 /*return*/, res.sendStatus(404)];
                    if (jamo.audios.find(function (audio) { return audio === req.params.filename; })) {
                        gfs = Gridfs(mongoose_1.connection.db, mongoose_1.mongo);
                        readstream = gfs.createReadStream({
                            filename: req.params.filename
                        });
                        readstream.pipe(res);
                    }
                    else {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_10 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_10)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAudioFromJamo = getAudioFromJamo;
function addImgToJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var jamo_3, imgFile, gfs, writestream, e_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo_3 = _a.sent();
                    if (!jamo_3)
                        return [2 /*return*/, res.sendStatus(404)];
                    imgFile = req.file;
                    if (imgFile.length === 0)
                        return [2 /*return*/, res.sendStatus(400)];
                    gfs = Gridfs(mongoose_1.connection.db, mongoose_1.mongo);
                    writestream = gfs.createWriteStream({
                        filename: req.file.originalname,
                        mode: 'w',
                        content_type: req.file.mimetype,
                    });
                    fs_1.createReadStream(req.file.path).pipe(writestream);
                    return [4 /*yield*/, writestream.on('close', function (img) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        jamo_3.img = img._id;
                                        fs_1.unlink(req.file.path);
                                        _b = (_a = res.status(201)).json;
                                        return [4 /*yield*/, jamo_3.save()];
                                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_11 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_11)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addImgToJamo = addImgToJamo;
function getImgFromJamo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var jamo, gfs, readstream, e_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, jamo_model_1.default.findById(req.params.id)];
                case 1:
                    jamo = _a.sent();
                    if (!jamo)
                        return [2 /*return*/, res.sendStatus(404)];
                    if (jamo.img !== undefined && jamo.img !== null) {
                        gfs = Gridfs(mongoose_1.connection.db, mongoose_1.mongo);
                        readstream = gfs.createReadStream({
                            _id: jamo.img
                        });
                        readstream.pipe(res);
                    }
                    else {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_12 = _a.sent();
                    return [2 /*return*/, res.status(400).json(e_12)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getImgFromJamo = getImgFromJamo;
function saveFiles(requestFiles) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (!requestFiles)
                        reject(null);
                    var gfs = Gridfs(mongoose_1.connection.db, mongoose_1.mongo);
                    resolve(requestFiles.map(function (file) {
                        var writestream = gfs.createWriteStream({
                            filename: file.originalname,
                            mode: 'w',
                            content_type: file.minetype,
                        });
                        fs_1.createReadStream(file.path).pipe(writestream);
                        writestream.on('close', function (audio) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_1.unlink(file.path)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return file.originalname;
                    }));
                })];
        });
    });
}
