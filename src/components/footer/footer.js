import React from 'react';
import PropTypes from 'prop-types';
                  
const Footer = React.memo(({contactsAmount, filterList}) => {
  return (
  <div className="footer">
    <span className="amount">{`${contactsAmount} Contacts left`}</span>
    <div className="btn-group">
      <button onClick={filterList} className="filter-btn" type="button">All</button>
      <button onClick={filterList} className="filter-btn" type="button">Active</button>
      <button onClick={filterList} className="filter-btn" type="button">Inactive</button>
    </div>
  </div>
  )
})

Footer.propTypes = {
  contactsAmount: PropTypes.number,
  filterList: PropTypes.func
}

export default Footer;