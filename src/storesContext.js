import React from 'react'
import Store from './Store';

export const storesContext = React.createContext({
    store: new Store()
})
