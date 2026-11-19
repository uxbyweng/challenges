import { EditHistory } from "./edit-history.ts";

function getElement<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
        throw new Error(`Missing element: ${selector}`);
    }
    return element;
}
const input = getElement<HTMLInputElement>("#mytext");
const undoButton = getElement<HTMLInputElement>("#Undo");
const redoButton = getElement<HTMLInputElement>("#Redo");
// const input = document.querySelector("#mytext")<T>(selector) as HTMLInputElement;
// const undoButton = document.querySelector("#Undo") as HTMLButtonElement;
// const redoButton = document.querySelector("#Redo") as HTMLButtonElement;

const history = new EditHistory(input.value);

function render(): void {
    input.value = history.current;
    undoButton.disabled = !history.canUndo;
    redoButton.disabled = !history.canRedo;
}

input.addEventListener("input", () => {
    history.record(input.value);
    render();
});

undoButton.addEventListener("click", () => {
    history.undo();
    render();
});

redoButton.addEventListener("click", () => {
    history.redo();
    render();
});

render();
