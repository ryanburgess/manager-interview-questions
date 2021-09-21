module.exports = function update() {
  const fs = require('fs');
  const obj = require('../list.json');
  const management = [];
  const people = [];
  const project = [];
  const technical = [];
  const partnerships = [];

  let content = '# Manager Interview Questions \n A list of interview questions for manager roles. \n \n Follow [Ryan Burgess on Twitter](http://twitter.com/burgessdryan)';

   // create lists of resources
   for (const resource of obj) {
     const question = resource.question;
     const cat = resource.cat;

     const categoryMap = {
       management: management,
       people: people,
       project: project,
       partnerships: partnerships,
       technical: technical
     };

     categoryMap[cat].push({'question': question});
   }

  // create content of the list of links
  const outputLinks = (obj, question) => {
    content += `\n\n## ${question}`;
    const duplicates = [];
    for (const out of obj) {
      // avoid duplicates
      if (duplicates.indexOf(out.question) === -1) {
        duplicates.push(out.question);

        // create the content that will be output to the Readme
        content += (
         `\n * ${out.question}`
       );
      }
    }
  }

  outputLinks(management, 'Management');
  outputLinks(people, 'People Management');
  outputLinks(project, 'Project Management');
  outputLinks(partnerships, 'Partnerships');
  outputLinks(technical, 'Technical');

  // create contributing instructions
  content += ('\n\n\n\n## Contributing \n' +
  '1. Fork it\n' +
  '2. Run `npm install`\n' +
  '3. Run `node add` to update `README.md` with your changes\n' +
  '4. Create your feature branch (`git checkout -b my-new-feature`)\n' +
  '5. Commit your changes (`git commit -am "Add some feature"`)\n' +
  '6. Push to the branch (`git push origin my-new-feature`)\n' +
  '7. Create new Pull Request\n');


  // create README file
   fs.writeFile('./README.md', content, function (err) {
       if (err) throw err;
       console.log('Updated resource list');
   });
};