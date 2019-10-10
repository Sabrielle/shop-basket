import React, { Component } from 'react';
import axios from 'axios';
import AddProduct from '../AddProductComponent/AddProductComponent';

class ProductListComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productList: [],
            sumList: {},
            isCalculated: false
        };
    }

    getProductList() {
        axios.get('/products',).then(res => {
            this.setState({ productList: res.data});
        }).catch(function (error) {
            alert('При загрузке списка произошла ошибка!');
        });
    }

    addProduct = (data) => {
        this.setState({ isCalculated: false});
        this.setState(state => (state.productList = [...state.productList, data], state));
    }

    calculate = () => {
        axios.get('/calculate',).then(res => {
            this.setState({ sumList: res.data});
            this.setState({ isCalculated: true});
        }).catch(function (error) {
            alert('При подсчёте произошла ошибка!');
        });
    }

    componentDidMount() {
        this.getProductList();
    }

    render() {
        return (
            <React.Fragment>
                <AddProduct currencies={ this.props.currencies } addProduct={ this.addProduct }/>
                { 
                    this.state.productList.length ?
                        <React.Fragment>
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
                            <div className="row">
                                <div className="col-md-10">
                                    {
                                        this.state.isCalculated ? 
                                            <div className="pl-3">
                                                <h5>Сумма:</h5>
                                                {   
                                                    Object.entries(this.state.sumList).map((item, index) =>
                                                        <h6 key={ index }>
                                                            { item[0] }: { item[1] }
                                                        </h6>
                                                    )
                                                }
                                            </div>
                                        : ''
                                    }
                                </div>
                                <div className="col-md-2">
                                    <div className="d-flex justify-content-end">
                                        <button onClick={ this.calculate } className="btn btn-primary">Подсчитать</button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    : <h3>Нет данных</h3>
                }
            </React.Fragment>
        );
    }
}

export default ProductListComponent;