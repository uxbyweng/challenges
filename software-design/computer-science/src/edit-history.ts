export class EditHistory {
    private value: string;
    private back: string[] = [];
    private forward: string[] = [];

    constructor(initial: string) {
        this.value = initial;
    }

    record(value: string): void {
        this.back.push(this.value);
        this.value = value;
        this.forward = [];
        this.logState("record");
    }

    undo(): void {
        const previous = this.back.pop();
        if (previous === undefined) return;

        this.forward.push(this.value);
        this.value = previous;
        this.logState("undo");
    }

    redo(): void {
        const next = this.forward.pop();
        if (next === undefined) return;

        this.back.push(this.value);
        this.value = next;
        this.logState("redo");
    }

    private logState(action: string): void {
        console.log(`${action}: back=${JSON.stringify(this.back)} current=${JSON.stringify(this.value)} forward=${JSON.stringify(this.forward)}`);
    }

    get current(): string {
        return this.value;
    }

    get canUndo(): boolean {
        return this.back.length > 0;
    }

    get canRedo(): boolean {
        return this.forward.length > 0;
    }
}
