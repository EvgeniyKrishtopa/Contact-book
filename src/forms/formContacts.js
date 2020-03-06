import React from 'react';

const FormContacts = React.memo(({onSubmit,name,tel,email,isDisabled,onChange}) => {
  return(
    <form className="contact-input-wrapper" onSubmit={onSubmit}>
      <input
        placeholder="Name" 
        type="text" 
        value={name} 
        onChange={onChange}
        className="contact-input"
      />
      <input 
        placeholder="Phone" 
        type="tel" 
        value={tel} 
        onChange={onChange}
        className="contact-input"
      />
      <input  
        placeholder="Email" 
        type="email" 
        value={email} 
        onChange={onChange}
        className="contact-input"
      />
      <br/>
      <button type="submit" disabled={isDisabled} className="btn-submit">Add New Contact</button>
      <br/>
    </form>
  )
})

export default FormContacts;