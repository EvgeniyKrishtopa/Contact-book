import React from 'react';
import PropTypes from 'prop-types';
import ButtonWrapperFilter from '../hoc/buttonWrapperFilter';
                  
const Footer = ({contactsData, filterList}) => {

  return (
  <div className="footer">
    <span className="amount">{`${contactsData.length} Contacts left`}</span>
    <div className="btn-group">
      <ButtonWrapperFilter onClick={filterList} className="filter-btn" type="button">All</ButtonWrapperFilter>
      <ButtonWrapperFilter onClick={filterList} className="filter-btn" type="button">Active</ButtonWrapperFilter>
      <ButtonWrapperFilter onClick={filterList} className="filter-btn" type="button">Inactive</ButtonWrapperFilter>
    </div>
  </div>
  )
}

Footer.propTypes = {
  contactsData: PropTypes.array,
  filterList: PropTypes.func
}

export default Footer;