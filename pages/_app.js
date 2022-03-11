import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useStore } from '../store'
import { Provider } from 'react-redux'
import icon from '../public/spidey_animated.gif'
import Image from 'next/image'

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store}>
       <NextUIProvider >
        <PersistGate loading={<div style={{top:"50%", paddingTop:"200px", left:"40%", position:"absolute"}}><Image alt="Spidey" src={icon} width={400} height={300} /></div>} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp