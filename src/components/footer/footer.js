import React from 'react';
import PropTypes from 'prop-types';

//TODO: mainPageStyles честно говоря я бы просто пилил стили конкретно в этом компоненте, стили не та вещь которую надо кидать пропсами
const Footer = React.memo(({contactsAmount, filterList, mainPageStyles}) => {
  return (
  <div className={mainPageStyles.footer}>
    <span className={mainPageStyles.amount}>{`${contactsAmount} Contacts left`}</span>
    <div className={mainPageStyles.btnGroup}>
      {/* TODO - сделай массив строк типа ['All', 'Active'...] и рендери кнопки через map()*/}
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