class TasksAPI {
  static loadData() {
    return fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(json => { return json.results })
      .catch(error => { return error });
  }


  static addData(task_to_add) {
    fetch("http://localhost:3001/tasks", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task_to_add),
    }).then(res => {
      if (res.status === 304) throw new Error('Duplicate data');
      else return res.status;
    }
    ).catch(error => console.error('Error:', error));
  }
}

export default TasksAPI;



