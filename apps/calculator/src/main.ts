import { addFn } from "@recursive-ui/utils";
import { setupCounter } from "./counter.ts";

let n = 1;

function render() {
	document.querySelector<HTMLDivElement>("#app strong")!.textContent =
		n.toString();
}

function onClick() {
	n = addFn(n, 1);
	render();
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>
<strong>${n}</strong>
  Hello World! <button  id='btn' >Counter</button>
</h1>
`;

const btn = document.querySelector<HTMLButtonElement>("#btn")!;
btn.addEventListener("click", onClick);

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
