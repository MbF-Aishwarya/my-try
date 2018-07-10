import * as actionTypes from './actionTypes';

export const createContact = (contact) => {
    return {
      type: actionTypes.CREATE_NEW_CONTACT,
      contact: contact
    }
  };

export const deleteContact = (id) => {
    return {
        type: actionTypes.REMOVE_CONTACT,
        id: id
    }
}

export const editContact = (data, id) => {
    return {
        type: actionTypes.EDIT_CONTACT,
        id: id
    }
}

export const updateContact = (data) => {
    return {
        type: actionTypes.UPDATE_CONTACT,
        id: data,

    }
}