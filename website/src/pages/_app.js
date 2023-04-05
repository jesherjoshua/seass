import Nav from "@/components/UI/Nav/Nav";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}
