import { Alert } from "./Alert";
import React, { Component } from 'react';
import { actions } from './actions';
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { FadeAndSlideTransition } from '../transitions/FadeSlide';

const createHandlers = dispatch => {
  const handleRemove = id => {
    dispatch(actions.remove(id));
  }
  return {
    handleRemove
  }
}

export class AlertRenderer extends Component {

  constructor (props) {
    super(props);
    this.handlers = createHandlers(this.props.store.dispatch);
  }
  
  render() {
    console.log('rendering alert renderer');
    const { store } = this.props;
    return(
      <TransitionGroup>
        {store.state.alerts.current.map((alert, i) => {
          return (
            <FadeAndSlideTransition duration={1000} key={`__rsa_alert_${alert.id}`} >
              <Alert pos={i} store={store} remove={this.handlers.handleRemove} {...alert}/>
              {/* <Alert key={`__rsa_alert_${alert.id}`} pos={i} store={store} remove={this.handlers.handleRemove} {...alert}/> */}
            </FadeAndSlideTransition>
          )
        })}
      </TransitionGroup>
    )
  };
}