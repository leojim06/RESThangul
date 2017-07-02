import { Request, Response } from 'express';
import { createReadStream, unlink } from 'fs';
import * as Gridfs from 'gridfs-stream';
import { connection, mongo } from 'mongoose';

import Jamo from './jamo.model';
import query from '../../services/query.service';

export async function createJamo(req: Request, res: Response) {
  try {
    const jamo = await Jamo.createJamo(req.body);
    return res.status(201).json(await jamo.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getJamos(req: Request, res: Response) {
  try {
    const jamos = await Jamo.list(query(req.query));
    if (jamos && jamos.length === 0) return res.sendStatus(404);
    return res.status(200).json(jamos);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getVocales(req: Request, res: Response) {
  try {
    const jamos = await Jamo.getVocales(query(req.query));
    if (jamos && jamos.length === 0) return res.sendStatus(404);
    return res.status(200).json(jamos);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getConsonantes(req: Request, res: Response) {
  try {
    const jamos = await Jamo.getConsonantes(query(req.query));
    if (jamos && jamos.length === 0) return res.sendStatus(404);
    return res.status(200).json(jamos);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getGruposConsonanticos(req: Request, res: Response) {
  try {
    const jamos = await Jamo.getGruposConsonanticos(query(req.query));
    if (jamos && jamos.length === 0) return res.sendStatus(404);
    return res.status(200).json(jamos);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getJamoById(req: Request, res: Response) {
  try {
    const jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);
    return res.status(200).json(jamo);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function updateJamo(req: Request, res: Response) {
  try {
    const jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);

    Object.keys(req.body).forEach(key => {
      jamo[key] = req.body[key];
    });

    return res.status(200).json(await jamo.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function deletJamo(req: Request, res: Response) {
  try {
    const jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);
    await jamo.remove();
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function addAudioToJamo(req: Request, res: Response) {
  try {
    const jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);

    const audioFiles: any = req.files;
    if (audioFiles.length === 0) return res.sendStatus(400);

    let savedFiles: any = await saveFiles(req.files);
    savedFiles.forEach(file => {
      jamo.audios.push(file);
    });

    return res.status(201).json(await jamo.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getAudioFromJamo(req: Request, res: Response) {
  try {
    let jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);

    if (jamo.audios.find(audio => audio === req.params.filename)) {
      const gfs = Gridfs(connection.db, mongo);
      const readstream = gfs.createReadStream({
        filename: req.params.filename
      });
      readstream.pipe(res);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function addImgToJamo(req: Request, res: Response) {
  try {
    const jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);

    const imgFile: any = req.file;
    if (imgFile.length === 0) return res.sendStatus(400);

    const gfs = Gridfs(connection.db, mongo);
    const writestream = gfs.createWriteStream({
      filename: req.file.originalname,
      mode: 'w',
      content_type: req.file.mimetype,
    });

    createReadStream(req.file.path).pipe(writestream);

    await writestream.on('close', async (img) => {
      jamo.img = img._id;
      unlink(req.file.path);
      return res.status(201).json(await jamo.save());
    });
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function getImgFromJamo(req: Request, res: Response) {
  try {
    let jamo = await Jamo.findById(req.params.id);
    if (!jamo) return res.sendStatus(404);

    if (jamo.img !== undefined && jamo.img !== null) {
      const gfs = Gridfs(connection.db, mongo);
      const readstream = gfs.createReadStream({
        _id: jamo.img
      });
      readstream.pipe(res);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function saveFiles(requestFiles) {
  return new Promise((resolve, reject) => {
    if (!requestFiles) reject(null);
    const gfs = Gridfs(connection.db, mongo);
    resolve(requestFiles.map(file => {
      const writestream = gfs.createWriteStream({
        filename: file.originalname,
        mode: 'w',
        content_type: file.minetype,
      });

      createReadStream(file.path).pipe(writestream);

      writestream.on('close', async audio => {
        await unlink(file.path);
      });
      return file.originalname;
    }));
  });
}
