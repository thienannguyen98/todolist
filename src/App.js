import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Management from './components/Manage';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForm: true,
            tasks: [],
            taskUpdate: null,
            index: 0,
            name: '',
        };
    }

    onShowForm = () => {
        this.setState({
            isShowForm: true,
        });
    }

    onCloseForm = () => {
        this.setState({
            isShowForm: false,
            taskUpdate: null,
        });
    }

    onSubmitData = (data) => {
        let { tasks, taskUpdate } = this.state;
        if (taskUpdate === null) {
            tasks.push(data);
        }
        else {
            tasks[data.index] = data;
        }
        this.setState({
            tasks: tasks,
            taskUpdate: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();

    }

    onDelete = (data) => {
        let { tasks } = this.state;
        tasks.splice(data, 1);
        this.setState({ tasks: tasks });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdate = (data) => {
        let { tasks } = this.state;
        this.onShowForm();
        let taskUpdate = tasks[data];
        let index = data;
        this.setState({
            taskUpdate: taskUpdate,
            index: index
        });
    }
    Search = (name) => {
        this.setState({
            name: name.toLowerCase(),
        });
    }


    render() {
        let { isShowForm, tasks, index, taskUpdate, name } = this.state;
        if(name){
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(name) !== -1;
            });
        }
        return (
            <div>
                <div className="contain text-center">
                    <div className="main">
                        <div className="add" onClick={this.onShowForm}>
                            {this.state.taskUpdate ? 'SỬA CÔNG VIỆC' : 'THÊM CÔNG VIỆC'}
                        </div>
                        <div className="manage" onClick={this.onCloseForm}>
                            QUẢN LÝ
                        </div>
                        <div className="appbody row">
                            <div className={isShowForm ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-0 col-sm-0 col-md-0 col-lg-0"} >
                                {isShowForm
                                    ? <TaskForm
                                        update={taskUpdate}
                                        index={index}
                                        onSubmitData={this.onSubmitData}
                                        onCloseForm={this.onCloseForm} />
                                    : ''}
                            </div>
                            <div className={isShowForm ? "col-xs-0 col-sm-0 col-md-0 col-lg-0" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                                {isShowForm
                                    ? ''
                                    : <Management
                                        task={tasks}
                                        onDelete={this.onDelete}
                                        onUpdate={this.onUpdate}
                                        handleChange={this.Search}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            const parsetasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: parsetasks,
            });
        }
    }
}


export default App;
