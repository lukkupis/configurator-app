import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withTranslation } from 'react-i18next';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styles from './SavedProducts.module.scss';

import createProductThumb from '../../utils/createProductThumb';

class SavedProducts extends Component {
  componentUpdated = false;

  handleProductClick = items => {
    this.props.setActiveItems(items);
    this.props.savedProductsToggle();
  };

  handleAddProductClick = e => {
    if (!this.props.configuratorStore.productExists) {
      createProductThumb(this.props.addProduct);
    } else {
      this.activeItem.style.visibility = 'hidden';

      setTimeout(() => {
        this.activeItem.style.visibility = 'visible';
      }, 200);
    }
  };

  handleRemoveProductClick = index => {
    this.props.removeProduct(index);
  };

  componentDidMount() {
    this.props.checkProductExist();
  }

  componentDidUpdate(prevProps) {
    const isCategoriesLoaded = this.props.configuratorStore.isCategoriesLoaded;

    if (isCategoriesLoaded !== prevProps.configuratorStore.isCategoriesLoaded) {
      if (isCategoriesLoaded) {
        this.props.checkSavedProducts();
      }
    }

    if (!this.componentUpdated) {
      this.props.checkProductExist();

      this.componentUpdated = true;
    } else {
      this.componentUpdated = false;
    }
  }

  render() {
    const t = this.props.t;
    const modal = this.props.configuratorStore.savedProductsModal;
    const savedProducts = this.props.configuratorStore.userSettings
      .savedProducts;
    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    const savedProductsList = savedProducts.map((item, index) => {
      const productsAreEqual =
        JSON.stringify(item.productParts) === JSON.stringify(activeItems);
      const activeItemClass = productsAreEqual ? styles.active : undefined;

      return (
        <div
          className={styles.itemWrapper}
          key={index}
          ref={activeItem => productsAreEqual && (this.activeItem = activeItem)}
        >
          <button
            className={styles.btnRemove}
            onClick={this.handleRemoveProductClick.bind(this, index)}
          >
            {t('remove')}
          </button>
          <button
            className={`${styles.btnChange} ${activeItemClass}`}
            id={activeItemClass}
            onClick={this.handleProductClick.bind(this, item.productParts)}
          >
            <img src={item.img} alt="" />
          </button>
        </div>
      );
    });

    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={this.props.savedProductsToggle}
          className={styles.modal}
          centered={true}
        >
          <ModalHeader toggle={this.props.savedProductsToggle}>
            {t('saved_products')}
          </ModalHeader>
          <ModalBody>
            <button onClick={this.handleAddProductClick}>
              {t('add_product')}
            </button>
            {savedProductsList}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    savedProductsToggle: () =>
      dispatch(configuratorActions.savedProductsToggle()),
    setActiveItems: items =>
      dispatch(configuratorActions.setActiveItems(items)),
    removeProduct: index => dispatch(configuratorActions.removeProduct(index)),
    addProduct: img => dispatch(configuratorActions.addProduct(img)),
    checkProductExist: () => dispatch(configuratorActions.checkProductExist()),
    checkSavedProducts: () => dispatch(configuratorActions.checkSavedProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SavedProducts));
