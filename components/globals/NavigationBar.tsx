import { Button } from "../retroui/Button";
import { Text } from "../retroui/Text";

export default function NavigationBar() {
  return (
    <header className="px-4 py-3 border-b-4 border-black">
      <nav className="container mx-auto flex items-center justify-between">
        <Text as={"h3"} className="font-bold" >Dev<span className="text-yellow-400">sol</span></Text>
        <Button>Request Solana</Button>
      </nav>
    </header>
  );
}
