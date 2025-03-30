import fs from "fs";
import minimist from "minimist";

const command = process.argv[2];
const args = minimist(process.argv.slice(3));

if (command === "add") {
  const newNote = { title: args.title, content: args.content };

  // Read existing notes
  let notes = [];
  if (fs.existsSync("notes.json")) {
    const data = fs.readFileSync("notes.json", "utf-8");
    notes = JSON.parse(data);
  }

  notes.push(newNote);
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
  console.log("Note Added Successfully");
}

if (command === "view") {
  if (fs.existsSync("notes.json")) {
    const data = fs.readFileSync("notes.json", "utf-8");
    const notes = JSON.parse(data);
    console.log("Your Notes:");
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.title}: ${note.content}`);
    });
  } else {
    console.log("No notes found!");
  }
}

if (command === 'delete') {
  const titleToDelete = args.title;

  if (fs.existsSync('notes.json')) {
      const data = fs.readFileSync('notes.json', 'utf-8');
      let notes = JSON.parse(data);

      // Filter notes to exclude the one with the matching title
      const updatedNotes = notes.filter(note => note.title !== titleToDelete);

      if (notes.length === updatedNotes.length) {
          console.log('Note not found!');
      } else {
          fs.writeFileSync('notes.json', JSON.stringify(updatedNotes, null, 2));
          console.log('Note deleted successfully!');
      }
  } else {
      console.log('No notes to delete!');
  }
}
