import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            status: '0',
            index: null
        };

    }

    onSubmitData = (e) => {
        e.preventDefault();
        if (this.state.name === '') { alert('Xin hãy điền thông tin'); }
        else this.props.onSubmitData(this.state);
    }

    onHandleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
        });
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () =>{
        this.setState({
            name: '',
            status: '0',
        });
    }


    render() {
        const { name, status } = this.state;
        const { update } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmitData}>
                    <div className="form-group addform">
                        <label className="mt-10">Tên Công Việc: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            maxLength='30'
                            value={name}
                            onChange={this.onHandleChange}
                        /><br />
                        <label>Mức độ ưu tiên</label>
                        <select
                            name="status"
                            id="input"
                            className="form-control"
                            value={status}
                            onChange={this.onHandleChange}
                        >
                            <option value={0}>Không gấp</option>
                            <option value={1}>Gấp</option>
                            <option value={2}>Rất gấp</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mb-10">{update ? "Sửa" : "Thêm"}</button>
                    <button type="button" className="btn btn-danger ml-5 mb-10" onClick={()=>{this.onCloseForm(); this.onClear()}}>Hủy bỏ</button>
                </form>
            </div>


        );
    }
    componentDidMount() {
        if (this.props.update) {
            this.setState({
                name: this.props.update.name,
                status: this.props.update.status,
                index: this.props.index
            });
        }
    }
}


export default TaskForm;