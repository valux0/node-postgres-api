

const cloudinary = require("../config/cloudinary");

const createPlanta = async (req, res) => {
  try {
	 console.log("REQ.FILE:", req.file); // 👈 AQUÍ
    let imageUrl = null;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "plantas"
      });

      imageUrl = result.secure_url;
    }

    const planta = await models.Plantas.create({
      ...req.body,
      imagen: imageUrl
    });

    return res.status(201).json({ planta });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const models = require("../models");
const getAllPlantas = async (req, res) => {
  try {
    const plantas = await models.Plantas.findAll();
    return res.status(200).json({ plantas });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deletePlanta = async (req, res) => {
  console.log('deleting planta...');
  try{ 
    const planta = await models.Plantas.findByPk(req.params.id);
    if(!planta){
     return res.status(404).json({ error: 'Planta not found' });
    }
    await planta.destroy();
    return res.status(200).json({ message: 'Planta deleted successfully' });
  } catch (error) {
    return res.status(500).json ({ error: error.message });
  }
};

const update = async (req, res) => {
  console.log('updating planta...');
  try {
    const planta = await models.Plantas.findByPk(req.params.id);

    if (!planta) {
      return res.status(404).json({ error: 'Planta not found' });
    }

    let imageUrl = planta.imagen; // mantener imagen actual

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "plantas"
      });

      imageUrl = result.secure_url;
    }

    await planta.update({
      ...req.body,
      imagen: imageUrl
    });

    return res.status(200).json({ planta });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPlantaById = async (req, res) => {
  console.log('getting user by id planta...');
  try{
    const planta = await models.Plantas.findByPk(req.params.id);
    if(!planta){
     return res.status(404).json({ error: 'Planta not found' });
    }
    return res.status(200).json({ planta });
  } catch (error) {
    return res.status(500).json ({ error: error.message });
  }
};


module.exports = { 
  createPlanta,
  getAllPlantas,
  deletePlanta,
  getPlantaById,
  update
  
};


