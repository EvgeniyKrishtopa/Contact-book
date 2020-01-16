import React from 'react';
import PropTypes from 'prop-types';
                  
const Footer = ({contactsData, filterList}) => {

  return (
  <div className="footer">
    <span className="amount">{`${contactsData.length} Contacts left`}</span>
    <div className="btn-group">
      <button onClick={filterList} className="filter-btn">All</button>
      <button onClick={filterList} className="filter-btn">Active</button>
      <button onClick={filterList} className="filter-btn">Inactive</button>
    </div>
  </div>
  )
}

Footer.propTypes = {
  contactsData: PropTypes.array,
  filterList: PropTypes.func
}

export default Footer;