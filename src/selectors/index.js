import { createSelector } from "reselect";

const getUsers = store => store.users;
const getContacts = store => store.contacts;

export const getCurrentUser = createSelector([getUsers],(users) => users.user);
export const getContactItems = createSelector([getContacts],(contacts) => contacts.contactItems);
export const getLoading = createSelector([getContacts],(contacts) => contacts.loading);
export const getErrorLoginNotification = createSelector([getUsers], (users) => users.errorLoginNotification);
export const getErrorAuthNotification = createSelector([getUsers], (users) => users.errorAuthNotification);

