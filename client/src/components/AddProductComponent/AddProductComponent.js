import React, { Component } from 'react';
import axios from 'axios';

class AddProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            currency: 'RUB',
            price: ''
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            quantity: this.state.quantity,
            currency: this.state.currency,
            price: this.state.price
        };
        axios.post('/add', data)
            .then(res => {
                if (res.status === 200) {
                    alert('Успешно добавлено!');
                    this.props.addProduct(data);
                }
                else {
                    alert(JSON.stringify(res.data.message));
                }
            });
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit } className="container-fluid mt-3">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <input type="text" className="form-control" name="name" value={ this.state.name } onChange={ this.handleUserInput } id="inpuName" placeholder="Название" required/>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="number" className="form-control" name="quantity" value={ this.state.quantity } onChange={ this.handleUserInput } id="inputQuantity" placeholder="Количество" required/>
                    </div>
                    <div className="form-group col-md-2">
                        <select className="form-control" name="currency" value={ this.state.currency } onChange={ this.handleUserInput } id="inputCurrency" required>
                        {
                            this.props.currencies.map((element, key) => 
                                <option key={key}>{element}</option>
                            )
                        
                        }
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="number" className="form-control" name="price" value={ this.state.price } onChange={ this.handleUserInput } id="inputText" placeholder="Цена" required/>
                    </div>
                    <div className="form-group col-md-1">
                        <button type="submit" className="btn btn-primary">Добавить</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default AddProductComponent;