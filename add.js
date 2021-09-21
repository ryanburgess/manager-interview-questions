'use strict';
const fs = require('fs');
const prompt = require('prompt');
const list = fs.readFileSync('./list.json');
const update = require('./lib/update');
const fullList = JSON.parse(list);
const categories = [];

// get list of categories
for (const cats of fullList) {
  const catName = cats.cat;

  if (categories.indexOf(catName) === -1) {
    categories.push(catName);
  }
}

// prompt schema
const schema = {
  properties: {
    question: {
      description: 'Question',
      pattern: /([^\s]+)/g,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    category: {
      description: `Category (${categories})`,
      pattern: /^(management|people|project|partnerships|technical)/,
      message: 'Must be of the valid categories',
      required: true
    }
  }
};

// start prompt
prompt.start();

// prompt questions
prompt.get(schema, function (err, result) {
  const obj = {'question': result.question.trim(), 'cat': result.category.trim()};
  
  // add new resource to the list
  fullList.push(obj);

  //update the JSON file
  fs.writeFileSync('./list.json', JSON.stringify(fullList, null, 4) + '\n');
  //success message
  console.log('New question added!');

  // update readme
  update();
  
});