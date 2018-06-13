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
      added: false,
      valid: false
    };
  }

  add() {
    let addTask = this.state.task;
    this.setState({
      task: addTask,
      added: true
    })
    this.props.add(this.state.task);
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
      default : break;
    } 
    this.setState({
      tmpTask: taskk
    }) 
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
        <button id="submit" className="btn btn-primary col-lg-offset-5" onClick={this.add.bind(this)} >Dodaj zadanie</button>
      </div>
    );

  }

  render() {
    return ( 
      <div className="header item" onChange={this.onChange.bind(this)}>
        <br />
        <form className="form-horizontal col-lg-6">
          <div className="form-group">
            <label className="control-label col-lg-4">Nazwa zadania </label>
            <div className="col-lg-8">
              <input className="form-control" name="title" defaultValue={this.state.task.title} required="required" />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-lg-4">Początek </label>
            <div className="col-lg-4">
              <input className="form-control" name="datestart" defaultValue={this.state.task.datestart} placeholder="mm-dd-yyyy" required="required" />
            </div>
            <div className="col-lg-4">
              <input className="form-control" name="timestart" defaultValue={this.state.task.timestart} placeholder="hh:mm" required="required" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-lg-4">Koniec </label>
            <div className="col-lg-4">
              <input className="form-control" name="dateend" defaultValue={this.state.task.dateend} placeholder="mm-dd-yyyy" required="required" />
            </div>
            <div className="col-lg-4">
              <input className="form-control" name="timeend" defaultValue={this.state.task.timeend} placeholder="hh:mm" required="required" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-lg-4">Kategoria </label>
            <div className="col-lg-8">
              <select className="form-control" name="category" defaultValue={this.state.task.category} required="required" >
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
              <input className="form-control" name="person" defaultValue={this.state.task.person} required="required" />
            </div>
          </div>
          {this.submitButtonRender()}
        </form>
      </div>
    );
  }
}


export default AddTask;
