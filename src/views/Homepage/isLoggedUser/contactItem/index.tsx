import React, { useContext } from 'react';
import { useAppDispatch } from 'store/hooks';
import {
  deleteContactFromBook,
  changeContactStatus,
} from 'store/actions/Contacts/actions';
import {
  MdAccountBox,
  MdContactMail,
  MdContactPhone,
  MdCheckBox,
  MdDelete,
} from 'react-icons/md';
import { IContact } from 'typings/interfaces';
import { CurrentUserContext } from 'context';

const ContactItem: React.FC<IContact> = ({
  contactEmail,
  contactName,
  contactPhone,
  activeStatus,
  id,
  visibility,
}) => {
  const { userData } = useContext(CurrentUserContext);
  const userId: string = userData.uid;
  const dispatch = useAppDispatch();

  const deleteContactHandler = () => {
    dispatch(deleteContactFromBook({ id, userId }));
  };

  const changeStatusContactHandler = () => {
    dispatch(changeContactStatus({ id, userId, activeStatus }));
  };

  return (
    <li
      className={`px-[10px] py-[8px] border rounded-[0.45rem] mb-[20px] max-[767px]:overflow-x-auto
      ${activeStatus ? 'border-blue/20 bg-blue/30' : 'border-gray/20 bg-blue/5'}
      ${visibility ? 'block' : 'hidden'}
      `}
    >
      <div className="flex min-w-[737px] justify-between">
        <div className="pr-[30px] text-blue flex">
          <span className="pr-[30px] flex items-center">
            <MdAccountBox size={30} className="text-fiolet mr-[7px]" />
            {contactName}
          </span>
          <a
            href={`mailto:${contactEmail}`}
            className="pr-[30px] flex items-center"
          >
            <MdContactMail size={30} className="text-fiolet mr-[7px]" />
            {contactEmail}
          </a>
          <a href={`tel:${contactPhone}`} className="flex items-center">
            <MdContactPhone size={30} className="text-fiolet mr-[7px]" />
            {contactPhone}
          </a>
        </div>
        <div>
          <button
            onClick={changeStatusContactHandler}
            className={`ml-[12px] cursor-pointer ${
              activeStatus ? 'text-black/54' : 'text-white'
            }`}
          >
            <MdCheckBox size={30} />
          </button>
          <button onClick={deleteContactHandler} className="ml-[12px] cursor-pointer">
            <MdDelete size={30} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default React.memo(ContactItem);
