import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData } from '../../actions/actionCreator';
import ContactList from '../../components/contact-list/contact-list';
import Select from '../../components/form/select';
import InputWrapper from '../../components/hoc/inputWrapper';
import ButtonWrapper from '../../components/hoc/buttonWrapper';
import Footer from '../../components/footer/footer';
import Loader from '../../components/loader/loader';
import './book.css';

function validateEmail(email) {
  const re = /^(([^<>()\t[\]\\.,;:\s@"]+(\.[^<>()\t[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(tel) {
  const re = /^[\t+]?[(]?[0-9]{3}[)]?[-\s\t.]?[0-9]{3}[-\s\t.]?[0-9]{4,6}$/im;
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
    const { name, email, tel } = this.state;

    return (
      <div className="contact-wrapper">
          <form className="contact-input-wrapper" onSubmit={this.handleSubmitContact}>
            <InputWrapper  placeholder="Name" type="text" value={name} onChange={this.handleChangeInput}/>
            <InputWrapper  placeholder="Phone" type="tel" value={tel} onChange={this.handleChangeInput}/>
            <InputWrapper  placeholder="Email" type="email" value={email} onChange={this.handleChangeInput}/>
            <br/>
            <ButtonWrapper type="submit" className="btn-submit">Add New Contact</ButtonWrapper>
            <br/>
          </form>
          <br/>
          {
          this.props.loading
          ?<Loader/>
          :contactsData.contactItems.length && 
          <div className="contacts-infro">
            <h3>Select contact</h3>
            <Select 
              onChange={this.handleChangeSelect} 
              className="contact-input" 
              contactsData={contactsData.contactItems}
            />
            <ContactList
              contacts={contactsData.contactItems} 
              removeContact={asyncDeleteContact} 
              statusSwitch={statusSwitch}
            />
            <Footer contactsData={contactsData.contactItems} filterList={this.filterList}/>
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