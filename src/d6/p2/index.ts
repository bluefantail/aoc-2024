export const d6p2 = (): string => {
  const myWorker = new Worker(new URL("worker.ts", import.meta.url), {"type" : "module"});
  myWorker.postMessage("do all the work but let me have my UI please thanks");

  myWorker.onmessage = (e) => {
    const answer = e.data;

    const answerBox: HTMLElement = document.getElementById("answer") as HTMLElement;
    answerBox.innerHTML = `Positions: ${answer}`;
  };

  return "Loading..."
}
