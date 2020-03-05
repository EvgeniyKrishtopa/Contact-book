import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData } from '../actions/actionCreator';
import ContactList from '../components/contact-list/contactList';
import FormContacts from '../forms/formContacts';
import Select from '../components/select/select';
import Footer from '../components/footer/footer';
import Loader from '../components/loader/loader';
import {ContextContactItem} from '../context/contextContactItem';
import './styles/book.scss';

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

    this.state = {
      name: '',
      tel: '',
      email: '',
      status: true,
      itemVisibility: true,
      userId: '',
      userEmail: '',
      isDisabled: true
    }

    this.handleSubmitContact = this.handleSubmitContact.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.user !== prevProps.user) {
      localStorage.setItem('user', JSON.stringify(this.props.user))

      this.setState({
        userId: this.props.user.uid,
        isDisabled: false
      })

      this.props.asyncFetchData(this.props.user.uid);
    }
  }


  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted) {
      this.userData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.contactsData.contactItems.length = 0;
  }

  userData() {
    const data = JSON.parse(localStorage.getItem('user'));

    if(this._isMounted && data !== null) {
      this.setState({
        userId: data.uid,
        isDisabled: false
    })

    this.props.asyncFetchData(data.uid);
    }
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
          <FormContacts 
            onSubmit={this.handleSubmitContact} 
            name={name} 
            email={email} 
            tel={tel}
            isDisabled={isDisabled}
            onChange={this.handleChangeInput}
          />
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
    loading: store.contacts.loading,
    user: store.users.user
  }
}

export default connect(
  mapStateToProps,
  { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData }
)(Book);  