import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { withRouter } from 'react-router-dom';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';
import Summary from './components/Summary';

class Configurator extends Component {
  setCategoryUrlIfEmpty() {
    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;

    if (!matchCategory) {
      this.props.history.replace(activeCategory);
    }
  }

  loadSettings() {
    let firstCategory = '';

    if (this.props.configuratorStore.categories.length) {
      firstCategory = this.props.configuratorStore.categories[0].slug;
    }

    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;

    const setCategory = () => {
      if (matchCategory) {
        this.props.setActiveCategory(matchCategory);
        this.props.history.replace(matchCategory);
      } else {
        this.props.setActiveCategory(firstCategory);
        this.props.history.replace(firstCategory);
      }
    };

    if (!activeCategory) {
      setCategory();
    }
  }

  updateCategoryFromUrl() {
    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;
    const categories = this.props.configuratorStore.categories;
    const firstCategory = categories[0].slug;
    const summaryOpen = this.props.configuratorStore.userSettings.summaryOpen;

    if (matchCategory && matchCategory !== activeCategory && !summaryOpen) {
      this.props.setActiveCategory(matchCategory);
    }

    const matchCategoryExist = categories.findIndex(
      item => item.slug === matchCategory
    );

    if (matchCategoryExist === -1 && !summaryOpen) {
      this.props.setActiveCategory(firstCategory);
      this.props.history.replace(firstCategory);
    }
  }

  componentDidMount() {
    this.loadSettings();
    this.setCategoryUrlIfEmpty();
    this.updateCategoryFromUrl();

    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    if (activeItems === null) {
      this.props.setDefaultActiveItems();
    }

    this.props.setActiveItems();
  }

  render() {
    return (
      <div className={`d-flex flex-column ${styles.wrapper}`}>
        <header className="text-center text-uppercase my-5">
          <h1>Konfigurator</h1>
        </header>
        <div className="row flex-grow-1">
          <div className="col-md-2">
            <Menu />
          </div>
          <div className="col-md-3">
            {this.props.match.params.category === 'gotowe' ? (
              <Summary />
            ) : (
              <MenuItems />
            )}
          </div>
          <div className="col-md-7">
            <ItemImg />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveCategory: categorySlug =>
      dispatch(configuratorActions.setActiveCategory(categorySlug)),
    setDefaultActiveItems: () =>
      dispatch(configuratorActions.setDefaultActiveItems()),
    setActiveItems: () => dispatch(configuratorActions.setActiveItems())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Configurator)
);
