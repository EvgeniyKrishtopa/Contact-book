import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData } from '../../actions/actionCreator';
import ContactList from '../../components/contact-list/contact-list';
import Loader from '../../components/loader/loader';
import './book.css';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(tel) {
  const re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return re.test(String(tel).toLowerCase());
}

class Book extends Component {

  state = {
      name: '',
      tel: '',
      email: '',
      status: true,
      itemVisibility: true
  }

  componentDidMount() {
    this.props.asyncFetchData();
  }

  handleSubmitContact = event => {
    event.preventDefault();

    const { name, tel, email, status, itemVisibility } = this.state;

    if(validateEmail(email) && validatePhone(tel)) {
      this.props.asyncAddContact(name, tel, email, status, itemVisibility);

      this.setState({
        name: '',
        tel: '',
        email: '',
        status: true,
        itemVisibility: true
      })
    }
  }


  filterList = event => {
    this.props.filterStatus(event.target.textContent);
  }


  handleChangeInput = event => {
    
    if(event.target.type === "text") {
      this.setState({
        name: event.target.value
      })
    }

    if(event.target.type === "tel") {
      this.setState({
        tel: event.target.value
      })
    }
    if(event.target.type === "email") {
      this.setState({
        email: event.target.value
      })
    }
  }

  handleChangeSelect = event => {
    this.props.selectContact(event.target.value);
  }

  render() {
    const { contactsData, asyncDeleteContact, statusSwitch } = this.props;
    const { name, email, tel, searchEmail } = this.state;

    return (
      <div className="contact-wrapper">
          <form className="contact-input-wrapper" onSubmit={this.handleSubmitContact}>
            <input className="contact-input"  value={name} type="text" placeholder="Name" onChange={this.handleChangeInput}/>
            <input className="contact-input"  value={tel} type="tel" placeholder="Phone" onChange={this.handleChangeInput}/>
            <input className="contact-input"  value={email} type="email" placeholder="Email" onChange={this.handleChangeInput}/>
            <br/>
            <button type="submit" className="btn-submit">Add New Contact</button>
            <br/>
          </form>
          <br/>
          {
          this.props.loading
          ?<Loader/>
          :contactsData.contactItems.length && 
          <div className="contacts-infro">
            <h3>Select contact</h3>
            <select className="contact-input" onChange={this.handleChangeSelect}>
                {
                  contactsData.contactItems.map((item,index) => {
                    return <option 
                            key={index} 
                            value={item.id}
                            >
                            {item.name}
                            </option>
                  })
                }
            </select>

            <ContactList
              contacts={contactsData.contactItems} 
              removeContact={asyncDeleteContact} 
              statusSwitch={statusSwitch}
            />
            <div className="footer">
              <span className="amount">{`${contactsData.contactItems.length} Contacts left`}</span>
              <div className="btn-group">
                <button onClick={this.filterList} className="filter-btn">All</button>
                <button onClick={this.filterList} className="filter-btn">Active</button>
                <button onClick={this.filterList} className="filter-btn">Inactive</button>
              </div>
            </div>
          </div>
          }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    contactsData: store.contacts,
    loading: store.contacts.loading
  }
}

export default connect(
  mapStateToProps,
  { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData }
)(Book);  