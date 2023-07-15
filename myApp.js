require('dotenv').config();

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new Schema(
  {
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: {type: [String]}
  }
)

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = async (done) => {
  let newPerson = new Person({name: "Marina", age: 20, favoriteFoods: ["Banan"]})

  newPerson.save(function(err, data){
    if(err) return done(err);
    return done(null, data);
  })
};

const createManyPeople = async (arrayOfPeople, done) => {
  // Person.create(arrayOfPeople, function(err, people){
  //   if(err) return done(err);
  //   return done(null, people);
  // });
  try{
    let people = await Person.create(arrayOfPeople)
    return done(null, people);
  }
  catch(err){
    return done(err);
  }
};

const findPeopleByName = async (personName, done) => {
  try{
    let people = await Person.find({"name" : personName});
    return done(null, people);
  }
  catch(err){
    return done(err);
  }
};

const findOneByFood = async (food, done) => {
  try{
    let person = await Person.findOne({favoriteFoods : food});
    return done(null, person);
  }
  catch(err){
    return done(err);
  }
};

const findPersonById = async (personId, done) => {
  try{
    let person = await Person.findOne(personId);
    return done(null, person);
  }
  catch(err){
    return done(err);
  }
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  try{
    let personToEdit = await Person.findOne(personId);
    personToEdit.favoriteFoods.push(foodToAdd);
    personToEdit.markModified("favoriteFoods");
    await personToEdit.save();
    done(null, personToEdit);
  }
  catch(err){
    done(err);
  }
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  try{
    let newPerson = await Person.findOneAndUpdate({name : personName}, {"age" : ageToSet}, {new : true})
    done(null, newPerson);
  }
  catch(err){
    done(err);
  }
};

const removeById = async (personId, done) => {
  try{
    let deletedPerson = await Person.findByIdAndRemove(personId);
    done(null, deletedPerson);
  }
  catch(err){
    done(err);
  }
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  try{
    let deletedPeople = await Person.remove({name : nameToRemove});
    done(null, deletedPeople);
  }
  catch(err){
    done(err);
  }
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  try{
    let people = await Person.find({favoriteFoods : foodToSearch}).sort({name : 1}).limit(2).select({age : 0});
    done(null, people);
  }
  catch(err){
    done(err);
  }
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
