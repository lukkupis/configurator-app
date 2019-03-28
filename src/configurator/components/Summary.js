import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Summary.module.scss';

import html2pdf from 'html2pdf.js';
import saveBase64AsFile from '../../utils/saveBase64AsFile';

import TemplatePDF from './TemplatePDF';

class Summary extends Component {
  handleOpenProductsClick = () => {
    this.props.openSavedProducts();
  };

  handleSaveProductImgClick = () => {
    const opt = {
      html2canvas: {
        logging: false,
        ignoreElements: element => element.id === 'btnAdd'
      }
    };

    html2pdf()
      .set(opt)
      .from(document.querySelector('#product'))
      .toImg()
      .outputImg('dataurlstring')
      .then(image => {
        saveBase64AsFile(image, 'produkt.jpg');
      });
  };

  handleSaveProductPdfClick = () => {
    const opt = {
      margin: 1,
      filename: 'produkt.pdf',
      image: { type: 'png' },
      html2canvas: {
        logging: false
      },
      jsPDF: { orientation: 'landscape' }
    };

    html2pdf()
      .set(opt)
      .from(document.querySelector('#templatePDF'))
      .save();
  };

  render() {
    const savedProductsCount = this.props.configuratorStore.userSettings
      .savedProducts.length;

    return (
      <>
        <div className={styles.wrapper}>
          <div className="row">
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                className={`p-3 ${styles.item}`}
                onClick={this.handleOpenProductsClick}
              >
                Zapisane produkty ({savedProductsCount})
              </button>
            </div>
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                className={`p-3 ${styles.item}`}
                onClick={this.handleSaveProductImgClick}
              >
                Zapisz produkt jako obrazek
              </button>
            </div>
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                className={`p-3 ${styles.item}`}
                onClick={this.handleSaveProductPdfClick}
              >
                Zapisz opis produktu jako PDF
              </button>
            </div>
          </div>
        </div>

        <TemplatePDF categories={this.props.configuratorStore.categories} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    openSavedProducts: () => dispatch(configuratorActions.openSavedProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
