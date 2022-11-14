const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;

const makerPage =  (req, res) => res.render('app');
const userPage =  (req, res) => res.render('page');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
    color: req.body.color,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();

    req.session.account.domosMade++;

    return res.status(201).json({ name: newDomo.name, age: newDomo.age, color: newDomo.color });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(400).json({ error: 'An error occured. Skill issue!' });
  }
};

const getDomos = (req, res) => DomoModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ domos: docs });
});

const getAll = (req, res) => DomoModel.findAll((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ domos: docs });
});

module.exports = {
  makerPage,
  userPage,
  makeDomo,
  getDomos,
  getAll,
};
