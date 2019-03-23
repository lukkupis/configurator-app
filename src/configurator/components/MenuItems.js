import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as configuratorActions from '../configuratorActions';

import styles from './MenuItems.module.scss';

import ItemsList from './ItemsList';

class MenuItems extends Component {
  render() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug =
      configuratorStore.userSettings.activeCategorySlug;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );
    const activeCategoryName =
      activeCategoryIndex > -1 ? categories[activeCategoryIndex].name : null;

    return (
      <div className={styles.wrapper}>
        {activeCategoryName ? (
          <div className="text-center py-4">
            <h2>{activeCategoryName}</h2>
          </div>
        ) : null}
        <div className="row">
          <ItemsList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItems);
