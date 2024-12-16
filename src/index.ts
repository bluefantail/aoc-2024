import "./styles.css";
import { d1p1 } from "./d1/p1";
import { d1p2 } from "./d1/p2";
import { d2p1 } from "./d2/p1";
import { d2p2 } from "./d2/p2";
import { d3p1 } from "./d3/p1";
import { d3p2 } from "./d3/p2";
import { d4p1 } from "./d4/p1";
import { d4p2 } from "./d4/p2";
import { d5p1 } from "./d5/p1";
import { d5p2 } from "./d5/p2";
import { d6p1 } from "./d6/p1";
import { d6p2 } from "./d6/p2";

const answerBox: HTMLElement = document.getElementById("answer") as HTMLElement;

answerBox.innerHTML = d6p2();