import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useStore } from '../store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store}>
       <NextUIProvider >
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>

      </NextUIProvider>
    </Provider>
   
  );
}

export default MyApp