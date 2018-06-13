import React, { Component } from 'react';

class AddTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {
        "title": "",
        "start": "",
        "end": "",
        "category": "",
        "person": "",
      },
      tmpTask: {
        "title": "",
        "datestart": "",
        "dateend": "",
        "timestart": "",
        "timeend": "",
        "category": "",
        "person": "",
      },
      updated: false,
      valid: false
    };
  }

  update() {
    let editTask = this.state.task;
    let eventNumber = this.props.location.pathname.replace("/updatetask/", "");
    fetch("http://localhost:3001/tasks/" + eventNumber, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTask),
    }).then(res => {
      if (res.status !== 304) {
        console.log(res);
      } else throw new Error('Duplicate data');
    }).catch(error => console.error('Error:', error));
  }

  componentDidMount() {
    let eventNumber = this.props.location.pathname.replace("/updatetask/", "");
    let pathFetch = "http://localhost:3001/tasks/" + eventNumber;
    fetch(pathFetch)
      .then(function (response) {
        return response.json();
      })
      .then(myJson => this.fillFields(myJson));
  }

  fillFields(event) {

    var date = new Date();
    var TMPTask = [];
    TMPTask.title = event.title
    TMPTask.category = event.category
    TMPTask.person = event.person

    date = new Date(event.start);
    TMPTask.datestart = (date.getMonth() + 1) + "-" + date.getDay() + "-" + date.getFullYear();
    TMPTask.timestart = date.getHours() + ":" + date.getMinutes();

    date = new Date(event.end);
    TMPTask.dateend = (date.getMonth() + 1) + "-" + date.getDay() + "-" + date.getFullYear();
    TMPTask.timeend = date.getHours() + ":" + date.getMinutes();

    document.getElementsByName("title")[0].value = TMPTask.title;
    document.getElementsByName("category")[0].value = TMPTask.category;
    document.getElementsByName("person")[0].value = TMPTask.person;
    document.getElementsByName("datestart")[0].value = TMPTask.datestart;
    document.getElementsByName("timestart")[0].value = TMPTask.timestart;
    document.getElementsByName("dateend")[0].value = TMPTask.dateend;
    document.getElementsByName("timeend")[0].value = TMPTask.timeend;

    this.setState({
      tmpTask: TMPTask
    });
    this.validateForm();
  }


  onChange(event) {
    let target = event.target;
    let name = target.name;
    let taskk = this.state.tmpTask;
    switch (name) {
      case "title": taskk.title = target.value; break;
      case "datestart": taskk.datestart = target.value; break;
      case "dateend": taskk.dateend = target.value; break;
      case "timestart": taskk.timestart = target.value; break;
      case "timeend": taskk.timeend = target.value; break;
      case "category": taskk.category = target.value; break;
      case "person": taskk.person = target.value; break;
      default: break;
    }
    this.setState({
      tmpTask: taskk
    }); 
    this.validateForm();
  }

  validateForm() {
    let taskk = this.state.tmpTask;
    let addTask = this.state.task;
    let valid = true;
    addTask.title = taskk.title;
    addTask.start = new Date(Date.parse(taskk.datestart + " " + taskk.timestart))
    addTask.end = new Date(Date.parse(taskk.dateend + " " + taskk.timeend))
    addTask.category = taskk.category;
    addTask.person = taskk.person;

    if (addTask.title === "" || addTask.category === "" || addTask.person === "")
      valid = false;
    if (Object.prototype.toString.call(addTask.start) === "[object Date]") {
      if (isNaN(addTask.start.getTime())) {
        valid = false;
      }
    }
    else {
      valid = false;
    }
    if (Object.prototype.toString.call(addTask.end) === "[object Date]") {
      if (isNaN(addTask.end.getTime())) {
        valid = false;
      }
    }
    else {
      valid = false;
    }
    if (addTask.end < addTask.start) {
      valid = false;
    }
    if (valid) {
      this.setState({
        task: addTask
      }) 
    }
    this.setState({
      valid: valid
    })
  }

  submitButtonRender() {
    if (this.state.valid === false) {
      return;
    }

    return (
      <div className="form-group">
        <button id="submit" className="btn btn-primary col-lg-offset-5" onClick={this.update.bind(this)} >Zapisz Zmiany</button>
      </div>
    );

  }

  render() {
    return (
      //this.state.added ? <Redirect  to={"/tasks"} />:
      <div className="header item" onChange={this.onChange.bind(this)}>
        <br />
        <form className="form-horizontal col-lg-6">
          <div className="form-group">
            <label className="control-label col-lg-4">Nazwa zadania </label>
            <div className="col-lg-8">
              <input className="form-control" name="title" defaultValue={this.state.tmpTask.title} required="required" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-lg-4">Początek </label>
            <div className="col-lg-4">
              <input className="form-control" name="datestart" defaultValue={this.state.tmpTask.datestart} placeholder="mm-dd-yyyy" required="required" />
            </div>
            <div className="col-lg-4">
              <input className="form-control" name="timestart" defaultValue={this.state.tmpTask.timestart} placeholder="hh:mm" required="required" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-lg-4">Koniec </label>
            <div className="col-lg-4">
              <input className="form-control" name="dateend" defaultValue={this.state.tmpTask.dateend} placeholder="mm-dd-yyyy" required="required" />
            </div>
            <div className="col-lg-4">
              <input className="form-control" name="timeend" defaultValue={this.state.tmpTask.timeend} placeholder="hh:mm" required="required" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-lg-4">Kategoria </label>
            <div className="col-lg-8">
              <select className="form-control" name="category" defaultValue={this.state.tmpTask.category} required="required" >
                <option value="" disabled>Wybierz...</option>
                <option value="Dom">Dom</option>
                <option value="Praca">Praca</option>
                <option value="Sport">Sport</option>
                <option value="Studia">Studia</option>
                <option value="Zakupy">Zakupy</option>
                <option value="Zdrowie">Zdrowie</option>
                <option value="Inna">Inna</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-lg-4">Osoba </label>
            <div className="col-lg-8">
              <input className="form-control" name="person" defaultValue={this.state.tmpTask.person} required="required" />
            </div>
          </div>
          {this.submitButtonRender()}
        </form>
      </div>
    );
  }
}


export default AddTask;
