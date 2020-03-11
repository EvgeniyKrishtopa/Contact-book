import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData } from '../actions/actionCreator';
import ContactList from '../components/contact-list/contactList';
import FormContacts from '../forms/formContacts';
import Select from '../components/select/select';
import Footer from '../components/footer/footer';
import Loader from '../components/loader/loader';
import {ContextContactItem} from '../context/contextContactItem';
import {getContactItems, getLoading, getCurrentUser} from '../selectors/index';
import { validateEmail, validatePhone } from '../helpers/validation';
import mainPageStyles from './pages.module.scss';

class Book extends PureComponent {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      status: true,
      itemVisibility: true,
      isDisabled: true
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.user !== prevProps.user) {
      localStorage.setItem('user', JSON.stringify(this.props.user))
      this.props.asyncFetchData(this.props.user.uid);
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if(this._isMounted) {
      this.userData();
    }
  }

  userData() {
    const data = JSON.parse(localStorage.getItem('user'));

    if(this._isMounted && data !== null) {
      this.props.asyncFetchData(data.uid);

      this.setState({
        isDisabled: false,
        userId: data.uid
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmitContact = values => {

    const {email, name, phone} = values;
    const {status, itemVisibility, userId} = this.state;

      if(validateEmail(email) && validatePhone(phone)) {
        this.props.asyncAddContact(name, phone, email, status, itemVisibility, userId);
      }
  }

  filterList = event => {
    this.props.filterStatus(event.target.textContent);
  }

  handleChangeSelect = event => {
    this.props.selectContact(event.target.value);
  }

  render() {
    const { contactsData, asyncDeleteContact, statusSwitch } = this.props;
    const { isDisabled } = this.state;

    return (
      <div className={`${mainPageStyles.mainWrapper} ${mainPageStyles.mainPage}`}>
          <h1>Contact Book</h1>
          <FormContacts 
            onSubmit={this.handleSubmitContact} 
            isDisabled={isDisabled}
            onChange={this.handleChangeInput}
          />
          <br/>
          {
            this.props.loading
            ?<Loader/>
            :contactsData.length !== 0 &&
            <div className="contacts-info">
              {
                contactsData.length > 1 &&
                <div>
                  <h3>Select contact</h3>
                  <Select 
                    onChange={this.handleChangeSelect} 
                    className={mainPageStyles.contactInput} 
                    contactsData={contactsData.map(item =>
                      {
                          return {
                            name: item.name, 
                            id: item.id
                          }
                        }
                      )}
                  />
                </div>
              }
              <ContextContactItem.Provider value={{asyncDeleteContact,statusSwitch}}>
                <ContactList
                  contacts={contactsData} 
                />
              </ContextContactItem.Provider>
              {
                contactsData.length > 1 &&
                <Footer 
                  contactsAmount={contactsData.length} 
                  filterList={this.filterList}
                  mainPageStyles={mainPageStyles}
                />
              }
            </div>
          }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    contactsData: getContactItems(store),
    loading: getLoading(store),
    user: getCurrentUser(store)
  }
}

export default connect(
  mapStateToProps,
  { asyncAddContact, asyncDeleteContact, selectContact, statusSwitch, filterStatus, asyncFetchData }
)(Book);  