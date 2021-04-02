import React, { Component } from 'react';

class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temptask: [],
            check: false,
            name: '',
        };
    }

    onDelete = (index) => {
        this.props.onDelete(index);
    }

    onUpdate = (index) => {
        this.props.onUpdate(index);
    }

    onSetColor = (data) => {
        if (data === '0') return 'item';
        if (data === '1') return 'item1';
        if (data === '2') return 'item2';
    }


    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.props.handleChange(
            name === 'name' ? value : this.state.name,
        );
        this.setState({
            [name]: value,
        });
    }

    renderTasks = () => {
        return this.props.task.map((item, index) => {
            return (
                <div
                    className={this.onSetColor(item.status)}
                    key={index}
                >
                    <div className='itemname'>{item.name}</div>
                    <div className="itemicon">
                        <i
                            className="fas fa-pencil-alt end"
                            onClick={() => this.onUpdate(index)}
                        ></i>
                        
                        <i
                            className="fas fa-trash-alt end"
                            onClick={() => this.onDelete(index)}
                        ></i>
                    </div>
                </div>
            );
        });
    }


    render() {
        return (
            <div>


                <div className="search">
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Nhập để tìm'
                        name='name'
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </div>

                {this.renderTasks()}


            </div>

        );
    }
}

export default Management;
