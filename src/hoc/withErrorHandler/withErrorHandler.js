import React, { Component } from 'react';

import Aux from '../Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedContent, axios) => {
    return class extends Component {
        state = {
            error: false
        }

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use( request => {
                this.setState({error: false});
                return request;
            }, error => {
                this.setState({error: error});
            });
            this.resInterceptor = axios.interceptors.response.use( r => r, error => {
                this.setState({error: error});
            });
        }

        errorCancelHandler = () => {
            this.setState({error: false});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorCancelHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedContent {...this.props}/>
                </Aux>
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    };
}

export default withErrorHandler;