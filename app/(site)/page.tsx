import Image from "next/image";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="h-full w-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
      <Header> Header </Header>
    </div>
  );
}
