import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppProps } from 'next/app';
import { useAppState } from '../utils/state';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { state, actions } = useAppState();

  return (
    <Component state={state} actions={actions} {...pageProps} />
  )
}

export default MyApp;
