
People.after.insert(function(userId, people) {
  // Увеличим кол-во жителей в доме, при добавлении человека
  if (people.house) {
      Buildings.update({_id: people.house}, { $inc: { 'people.curr': 1 } }, { multi: true });
  }
  if (people.work) {
      Buildings.update({_id: people.work}, { $inc: { 'people.curr': 1 } }, { multi: true });
  }
});

People.after.remove(function(userId, people) {
  if (people.house) {
      Buildings.update({_id: people.house}, { $inc: { 'people.curr': -1 } }, { multi: true });
  }
  if (people.work) {
      Buildings.update({_id: people.work}, { $inc: { 'people.curr': -1 } }, { multi: true });
  }
});

Buildings.after.remove(function(userId, building) {
  if (building.structureKey === 'house_03') {
    People.remove({house: building._id});
  }
  if (building.structureKey === 'factory') {
    People.update({work: building._id}, { $set: { work: null } });
  }
});