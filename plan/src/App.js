import React, { Component } from 'react';
import Header from './Header';
import LeftMenu from './LeftMenu';
import AddTask from './AddTask.js';
import UpdateTask from './UpdateTask.js';
import { Route } from 'react-router-dom';
import AddPropsToRoute from './AddPropsToRoute.js';
import MyCalendar from './Calendar/MyCalendar.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filteredName: "",
      defaultDate: new Date(),
      defaultView: "month",
      colors: []
    };
    this.filterPeople = this.filterPeople.bind(this);
    this.updateView = this.updateView.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(
        tasks => this.mapTasks(tasks)
      );
  }
  mapTasks(tmpTasks) {
    //zmiana daty na tą z moment
    for (let index = 0; index < tmpTasks.length; index++) {
      tmpTasks[index].start = new Date(tmpTasks[index].start);
      tmpTasks[index].end = new Date(tmpTasks[index].end);
    }
    var colors = this.findPeople(tmpTasks);

    //  dodanie koloru do każdego elementu
    for (let index = 0; index < tmpTasks.length; index++) {
      var element = tmpTasks[index].person

      for (var j = 0; j < colors.length; j++)
        if (colors[j].prop === element)
          tmpTasks[index].color = colors[j].color;
    }
    this.setState({
      tasks: tmpTasks,
      colors: colors
    });

  }
  findPeople(events) {
    var result = [];
    var people = [];
    result = events.reduce(function (r, a) {
      r[a.person] = r[a.person] || [];
      r[a.person].push(a);
      return r;
    }, Object.create(null));


    var counter = 1;
    for (var prop in result) {
      var color = this.getRandomColor();
      people.push({ counter, prop, color });
      counter++;
    }
    return people;
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  add(task) {
    console.log(task);
    fetch("http://localhost:3001/tasks", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then(res => {
      if (res.status !== 304) {
        let list = this.state.tasks.slice(0);
        list.push(task);
        this.setState({ tasks: list });
      } else throw new Error('Duplicate data');
    }).catch(error => console.error('Error:', error));
  }
  delete(taskID) {
    console.log(taskID);

  }
  filterPeople(tmp) {
    let name = tmp.target.innerHTML;

    if (this.state.filteredName === name)
      this.setState({ filteredName: "" });
    else
      this.setState({ filteredName: name });

  }
  updateView(view) {
    console.log(view);
    this.setState({
      defaultView: view
    });
  }
  updateDate(date) {
    console.log(date);
    this.setState({
      defaultDate: date
    });
  }
  render() {
    return (
      <div>
        <Header />
        <LeftMenu colors={this.state.colors} filter={this.filterPeople} />
        <Route exact path="/"
          component={AddPropsToRoute(MyCalendar,
            {
              events: this.state.tasks,
              people: this.state.people,
              filteredName: this.state.filteredName,
              updateView: this.updateView,
              updateDate: this.updateDate,
              delete: this.delete,
              defaultView: this.state.defaultView,
              defaultDate: this.state.defaultDate,
            })} />
        <Route path='/addtask' component={AddPropsToRoute(AddTask, { add: this.add })} />
        <Route path='/updatetask' component={UpdateTask} />
      </div>
    );
  }
}

export default App;