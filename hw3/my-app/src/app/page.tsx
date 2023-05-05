import Image from "next/image";
import "./home.scss";

export default function Home() {
  return (
    <main className="home-page">
      <Image
        className="throne-background"
        alt="Throne background"
        src="/images/throne-background.jpg"
        width="3840"
        height="2160"
      />

      <div className="content-container">
        <h1>Welcome to my Throne Room</h1>
        <p>Sorry the official font is licensed...</p>
      </div>
    </main>
  );
}
