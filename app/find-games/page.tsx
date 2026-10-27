import { redirect } from "next/navigation";

export default function FindGamesRedirect() {
  redirect("/games");
}
