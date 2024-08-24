import Link from "next/link";
import style from "@/styles/nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  return (
    <nav>
      <ul className={style.list}>
        <li>
          <Link href="/">
            <FontAwesomeIcon icon={faHouseChimney} />
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
