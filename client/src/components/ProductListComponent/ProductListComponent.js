import React, { Component } from 'react';
import axios from 'axios';
import AddProduct from '../AddProductComponent/AddProductComponent';

class ProductListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: []
        };
    }

    getProductList() {
        axios.get('/products',).then(res => {
            if (res.status === 200) {
                this.setState({ productList: res.data});
            }
            else {
                alert('При загрузке списка произошла ошибка!');
            }
        });
    }

    addProduct = (data) => {
        //this.setState(state => (state.taskList[index].status = newStatus, state));
        this.setState(state => (state.productList = [...state.productList, data], state));
    }

    componentDidMount() {
        this.getProductList();
    }

    render() {
        return (
            <React.Fragment>
                <AddProduct currencies={this.props.currencies} addProduct={this.addProduct}/>
                { 
                    this.state.productList.length ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Количество</th>
                                    <th>Валюта</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.productList.map((item, index) =>
                                        <tr key={ index }>
                                            <td>{ item.name }</td>
                                            <td>{ item.quantity }</td>
                                            <td>{ item.currency }</td>
                                            <td>{ item.price }</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    : <h3>Данные ещё не загружены</h3>
                }
            </React.Fragment>
        );
    }
}

export default ProductListComponent;