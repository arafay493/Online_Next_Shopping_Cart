import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import { store } from '@/store/store'
import { store } from "@/toolkit_store/store";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Header />
        <Component {...pageProps} />
        <Footer />
        {/* <ReactQueryDevtools position="bottom-right" initialIsOpen = {false}/> */}
      </QueryClientProvider>
    </Provider>
  );
}
