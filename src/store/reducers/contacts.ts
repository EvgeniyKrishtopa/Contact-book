import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'store/firebase';
import type { AppThunk } from 'store/reducers';
import { IContacts, IContact, IError } from 'typings/interfaces';

const initialState: IContacts = {
  loading: false,
  contactsData: [],
  error: null,
};

// onSnapshot keeps firing for the life of the subscription, so it can't be
// modeled as a single-resolution createAsyncThunk.
export const FetchCurrentUserContacts =
  (userId: string): AppThunk =>
  dispatch => {
    const contactsRef = collection(db, 'users', userId, 'Contacts');
    onSnapshot(contactsRef, snapshot => {
      const contactItems = snapshot.docs.map(item => {
        const contact = item.data() as IContact;
        contact.id = item.id;
        return contact;
      });

      dispatch(contactsReceived(contactItems));
    });
  };

export const SendContact = createAsyncThunk(
  'contacts/sendContact',
  async ({
    contactName,
    contactEmail,
    contactPhone,
    userId,
  }: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    userId: string;
  }) => {
    const contactsRef = collection(db, 'users', userId, 'Contacts');
    await addDoc(contactsRef, {
      contactName,
      contactEmail,
      contactPhone,
      activeStatus: true,
      visibility: true,
    });
  },
);

export const deleteContactFromBook = createAsyncThunk(
  'contacts/deleteContact',
  async ({ id, userId }: { id: string; userId: string }) => {
    const contactRef = doc(db, 'users', userId, 'Contacts', id);
    await deleteDoc(contactRef);
  },
);

export const changeContactStatus = createAsyncThunk(
  'contacts/changeContactStatus',
  async ({
    id,
    userId,
    activeStatus,
  }: {
    id: string;
    userId: string;
    activeStatus: boolean;
  }) => {
    const contactRef = doc(db, 'users', userId, 'Contacts', id);
    await updateDoc(contactRef, { activeStatus: !activeStatus });
  },
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    contactsReceived: (state, action: PayloadAction<Array<IContact>>) => {
      state.contactsData = action.payload;
    },
    filterContact: (state, action: PayloadAction<Array<IContact>>) => {
      state.contactsData = action.payload;
    },
    filterContactsByStatus: (state, action: PayloadAction<Array<IContact>>) => {
      state.contactsData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(SendContact.pending, state => {
        state.loading = true;
      })
      .addCase(SendContact.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(SendContact.rejected, (state, action) => {
        state.error = action.error as IError;
      });
  },
});

export const { contactsReceived, filterContact, filterContactsByStatus } =
  contactsSlice.actions;

export default contactsSlice.reducer;
