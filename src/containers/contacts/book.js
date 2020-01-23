import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData } from '../../actions/actionCreator';
import ContactList from '../../components/contact-list/contact-list';
import Select from '../../components/form/select';
import InputWrapper from '../../components/hoc/inputWrapper';
import ButtonWrapper from '../../components/hoc/buttonWrapper';
import Footer from '../../components/footer/footer';
import Loader from '../../components/loader/loader';
import {ContextContactItem} from '../../context/context';
import firebase from '../../firebase';
import './book.scss';

function validateEmail(email) {
  const re = /^(([^<>()\t[\]\\.,;:\s@"]+(\.[^<>()\t[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(tel) {
  const re = /^[\t+]?[(]?[0-9]{3}[)]?[-\s\t.]?[0-9]{3}[-\s\t.]?[0-9]{4,6}$/im;
  return re.test(String(tel).toLowerCase());
}

class Book extends Component {

  constructor(props) {
    super(props);

    this._isMounted = false;
  }

  state = {
      name: '',
      tel: '',
      email: '',
      status: true,
      itemVisibility: true,
      userId: '',
      isDisabled: true
  }

  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted) {
     firebase.auth().onAuthStateChanged(user => {

      if (user) {
      const userId = user.uid;

      this.setState({
        userId
      })

       this.props.asyncFetchData(userId);

       const btnSubmit = document.querySelector('.btn-submit');
        btnSubmit.disabled = false;
      }
    });
    }
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  handleSubmitContact = event => {
    event.preventDefault();

    const { name, tel, email, status, itemVisibility, userId } = this.state;

      if(validateEmail(email) && validatePhone(tel)) {

        this.props.asyncAddContact(name, tel, email, status, itemVisibility, userId);
        
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
    const { name, email, tel, isDisabled } = this.state;

    return (
      <div className="contact-wrapper">
          <h1>Contact Book</h1>
          <form className="contact-input-wrapper" onSubmit={this.handleSubmitContact}>
            <InputWrapper  
              placeholder="Name" 
              type="text" 
              value={name} 
              onChange={this.handleChangeInput}
            />
            <InputWrapper  
              placeholder="Phone" 
              type="tel" 
              value={tel} 
              onChange={this.handleChangeInput}
            />
            <InputWrapper  
              placeholder="Email" 
              type="email" 
              value={email} 
              onChange={this.handleChangeInput}
            />
            <br/>
            <ButtonWrapper type="submit" disabled={isDisabled} className="btn-submit">Add New Contact</ButtonWrapper>
            <br/>
          </form>
          <br/>
          {
            this.props.loading
            ?<Loader/>
            :contactsData.contactItems.length !== 0 &&
            <div className="contacts-infro">
              {
                contactsData.contactItems.length > 1
                ?<div>
                  <h3>Select contact</h3>
                  <Select 
                    onChange={this.handleChangeSelect} 
                    className="contact-input" 
                    contactsData={contactsData.contactItems}
                  />
                </div>
                :null
              }
              <ContextContactItem.Provider value={{asyncDeleteContact,statusSwitch}}>
                <ContactList
                  contacts={contactsData.contactItems} 
                />
              </ContextContactItem.Provider>
              {
                contactsData.contactItems.length > 1
                ?<Footer 
                  contactsData={contactsData.contactItems} 
                  filterList={this.filterList}
                />
                :null
              }
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