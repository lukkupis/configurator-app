import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategoryId, itemId) => {
    this.props.setActiveItems({ [activeCategoryId]: itemId });
  };

  list() {
    const activeCategory = this.props.configuratorStore.categories.filter(
      category => category.active === true
    )[0];

    let list = [];

    if (activeCategory) {
      list = activeCategory.items.map(item => {
        const activeItemClass = () => item.active && styles.active;

        return (
          <div
            key={item.id}
            className="col-md-6 p-4 d-flex justify-content-center align-content-center"
          >
            <button
              className={`${styles.item} ${activeItemClass()}`}
              onClick={this.handleClick.bind(this, activeCategory.id, item.id)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/simple-model.png`}
                alt=""
                className={styles.simpleModel}
              />
              <img
                src={process.env.PUBLIC_URL + item.imgThumb}
                alt=""
                className={styles.thumb}
              />
              {item.name}
            </button>
          </div>
        );
      });
    }

    return list;
  }

  render() {
    return <>{this.list()}</>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveItems: items =>
      dispatch(configuratorActions.setActiveItems(items)),
    checkProductExist: () => dispatch(configuratorActions.checkProductExist())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
