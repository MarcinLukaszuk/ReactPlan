const express = require('express');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const tasks = [
    { id: 1, title: 'Biometria wykład', category: "Studia", start: new Date(2018, 5, 2, 10, 30, 0, 0),end: new Date(2018, 5, 2, 13, 30, 0, 0), person: "Ewelina"},
    { id: 2, title: 'AIOoK ps', category: "Studia", start: new Date(2018, 5, 2, 10, 30, 0, 0),end: new Date(2018, 5, 2, 13, 30, 0, 0), person: "Michał"},
    { id: 3, title: 'Angielski', category: "Studia", start: new Date(2018, 5, 6, 10, 30, 0, 0),end: new Date(2018, 5, 6, 13, 30, 0, 0), person: "Marcin"},
    { id: 4,  title: 'Egzamin BSK', category: "Studia", start: new Date(2018, 5, 6, 10, 30, 0, 0),end: new Date(2018, 5, 6, 13, 30, 0, 0), person: "Ewelina"},
    { id: 5,  title: 'Praca', category: "Praca",start: new Date(2018, 5, 6, 10, 30, 0, 0),end: new Date(2018, 5, 6, 13, 30, 0, 0), person: "Kamil"},
    { id: 6,  title: 'Okulista', category: "Zdrowie", start: new Date(2018, 5, 6, 10, 30, 0, 0),end: new Date(2018, 5, 6, 13, 30, 0, 0), person: "Marcin"},
    { id: 7,  title: 'Siłownia', category: "Sport", start: new Date(2018, 5, 6, 10, 30, 0, 0),end: new Date(2018, 5, 6, 13, 30, 0, 0), person: "Michał"},
    { id: 8,  title: 'Mycie okien', category: "Dom", start: new Date(2018, 5, 14, 10, 30, 0, 0),end: new Date(2018, 5, 14, 13, 30, 0, 0), person: "Ewelina" },
    { id: 9,  title: 'Głaskanie kota', category: "Dom", start: new Date(2018, 5, 14, 10, 30, 0, 0),end: new Date(2018, 5, 14, 13, 30, 0, 0), person: "Ewelina" },
    { id: 10,  title: 'Budowanie czołgu', category: "Dom", start: new Date(2018, 5, 14, 10, 30, 0, 0),end: new Date(2018, 5, 14, 13, 30, 0, 0), person: "Marcin" },
    { id: 11,  title: 'Programowanie', category: "Studia", start: new Date(2018, 5, 14, 10, 30, 0, 0),end: new Date(2018, 5, 14, 13, 30, 0, 0), person: "Marcin" },
    { id: 12,  title: 'Programowanie', category: "Studia", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Marcin" },
    { id: 13,  title: 'Programowanie', category: "Studia", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Marcin" },
    { id: 14,  title: 'Jazda na rowerze', category: "Studia", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Ewelina" },
    { id: 15,  title: 'Czesanie kota', category: "Dom", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Ewelina" },
    { id: 16,  title: 'Głaskanie kota x2', category: "Dom", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Ewelina" },
    { id: 17,  title: 'Jazda samochodem', category: "Zdrowie", start: new Date(2018, 5, 17, 10, 30, 0, 0),end: new Date(2018, 5, 17, 13, 30, 0, 0), person: "Marcin" }
];

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.post('/tasks', (req,res) => {
    if (!req.body.title || !req.body.category || !req.body.start || !req.body.end || !req.body.person) return res.status(404).send('Bad Request posting');
    const task = {
        id: tasks.length+1,
        title: req.body.title,
        category: req.body.category,
        start: req.body.start,
        end: req.body.end,
        person: req.body.person
    };
    tasks.push(task);
    res.send(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Not Found');
    task.title = req.body.title;
    task.category = req.body.category;
    task.start = req.body.start;
    task.end = req.body.end;
    task.person = req.body.person;
    res.send(task);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) res.status(404).send('Not Found');
    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const task = tasks.find(c => c.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Not Found');
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.send(task);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

