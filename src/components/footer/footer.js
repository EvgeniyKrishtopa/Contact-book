import React from 'react';
import PropTypes from 'prop-types';
                  
const Footer = React.memo(({contactsAmount, filterList, mainPageStyles}) => {
  return (
  <div className={mainPageStyles.footer}>
    <span className={mainPageStyles.amount}>{`${contactsAmount} Contacts left`}</span>
    <div className={mainPageStyles.btnGroup}>
      <button onClick={filterList} className={mainPageStyles.filterBtn} type="button">All</button>
      <button onClick={filterList} className={mainPageStyles.filterBtn} type="button">Active</button>
      <button onClick={filterList} className={mainPageStyles.filterBtn} type="button">Inactive</button>
    </div>
  </div>
  )
})

Footer.propTypes = {
  contactsAmount: PropTypes.number,
  filterList: PropTypes.func
}

export default Footer;