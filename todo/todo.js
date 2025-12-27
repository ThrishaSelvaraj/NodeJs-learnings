const fs = require('fs');
const filepath = "./tasks.json";
//function to load files from the JSON file
const loadTasks = () =>{
    try{
        const databuffer = fs.readFileSync(filepath);
        const dataJSON = databuffer.toString();
        return JSON.parse(dataJSON);
    }catch(error){
        return[];
    }
}
const saveTasks = (tasks) =>{
  const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filepath, dataJSON);
}

const addTask= (task) =>{
 const tasks = loadTasks();
 tasks.push(task);
 saveTasks(tasks);
    console.log(`Added task: ${task}`);
}
const listTasks = () =>{
    const tasks = loadTasks();
tasks.forEach((task,index) => console.log(`${index + 1}. ${task}`));   
}

const removeTask=(index)=>{
    const tasks = loadTasks();
   
   if(index < 1 || index > tasks.length){
    console.log("invalid index");
    return; }
    else{
        tasks.splice(index-1,1);
    
    const newText = JSON.stringify(tasks);
    fs.writeFileSync(filepath,newText);
    console.log("deleted the given index")
    }
    
}
const command = process.argv[2];
const argument = process.argv[3];

if(command === "add"){
    addTask(argument);
}else if (command === "list"){
    listTasks();
}else if (command === "remove"){
    removeTask(parseInt(argument));
}else{
 console.log("Unknown command. Use 'add', 'list', or 'remove'.");
}
