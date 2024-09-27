let caret: HTMLElement | null;
let activeWord: HTMLElement | null;
let activeLetter: HTMLElement | null;
let wordContainer: HTMLElement | null;

let currentIdx = -1;
let wordLength = 0;

let wordIdx = 1;
let numberOfWords = 0;

let agreementReadingCompleteCallback: Function;

export function initialize(callback: Function) {
  wordContainer = document.getElementById("word-container")!;
  activeWord = wordContainer.children[1] as HTMLElement;
  caret = document.getElementById("caret")!;

  activeWord.setAttribute("id", "active");

  wordLength = activeWord.children.length;

  numberOfWords = wordContainer.children.length;

  agreementReadingCompleteCallback = callback;
}

export function reset() {
  caret = null;
  activeWord = null;
  activeLetter = null;

  currentIdx = -1;
  wordLength = 0;
  wordIdx = 1;
  numberOfWords = 0;
  agreementReadingCompleteCallback = () => {};

  resetAgreementContent();
}

export function handleKeyPress(e: KeyboardEvent) {
  if (wordIdx === numberOfWords) return;
  if (e.key === " ") e.preventDefault();
  if (e.key === " " && activeLetter) {
    nextActiveWord();
  } else if (e.key === "Backspace") {
    setPreviousActiveLetter();
  } else if (
    e.key !== "Shift" &&
    e.key !== "CapsLock" &&
    e.key !== "Control" &&
    e.key !== " " &&
    !e.metaKey
  ) {
    setNextActiveLetter(e.key);
  }
}

function setPreviousActiveLetter() {
  if (currentIdx - 1 < 0) {
    currentIdx = -1;
    activeLetter = activeWord!.children[0] as HTMLElement;
    removeStateClass(activeLetter!);
    const { left } = getElementOffset(activeLetter!);
    moveCaretBackward(left);
  } else {
    removeStateClass(activeLetter!);
    const { left } = getElementOffset(activeLetter!);
    moveCaretBackward(left);

    currentIdx -= 1;
    activeLetter = activeWord!.children[currentIdx] as HTMLElement;
  }
}

function setNextActiveLetter(key: string) {
  if (currentIdx + 1 >= wordLength) {
    activeLetter = activeWord!.children[currentIdx] as HTMLElement;

    const hasStateClass =
      activeLetter.classList.contains("text-rose-500") ||
      activeLetter.classList.contains("text-cyan-500");

    if (key === activeLetter.textContent && !hasStateClass) {
      addCorrect(activeLetter);
    } else if (!hasStateClass) {
      addIncorrect(activeLetter);
    }

    const { top, left } = getElementOffset(activeLetter as HTMLElement);
    moveCaretForward(top, left);
  } else {
    currentIdx += 1;
    activeLetter = activeWord!.children[currentIdx] as HTMLElement;

    if (key === activeLetter.textContent) {
      addCorrect(activeLetter);
    } else {
      addIncorrect(activeLetter);
    }

    const { top, left } = getElementOffset(activeLetter as HTMLElement);
    moveCaretForward(top, left);
  }
}

function nextActiveWord() {
  if (wordIdx + 1 === numberOfWords) {
    const { top, left } = getElementOffset(
      activeWord!.children[wordLength - 1] as HTMLElement,
    );
    moveCaretForward(top, left - 2);
    wordIdx += 1;
    agreementReadingCompleteCallback();
    return;
  }
  if (wordIdx < numberOfWords) {
    wordIdx += 1;
    currentIdx = -1;

    activeWord!.setAttribute("id", "typed");
    activeWord!.removeAttribute("id");

    activeWord = wordContainer!.children[wordIdx] as HTMLElement;

    activeWord.setAttribute("id", "active");

    activeLetter = null;

    wordLength = activeWord.children.length;

    const { top, left } = getElementOffset(
      activeWord.children[0] as HTMLElement,
    );
    moveCaretForward(top, left - 6);
  }
}

function addCorrect(element: HTMLElement) {
  element.classList.remove("text-rose-500");
  element.classList.add("text-cyan-500");
}

function addIncorrect(element: HTMLElement) {
  element.classList.remove("text-cyan-500");
  element.classList.add("text-rose-500");
}

function removeStateClass(element: HTMLElement) {
  element.classList.remove("text-cyan-500");
  element.classList.remove("text-rose-500");
}

function getElementOffset(element: HTMLElement) {
  const offsetLeft = element.offsetLeft;
  const offsetTop = element.offsetTop;
  return {
    left: offsetLeft,
    top: offsetTop,
  };
}

function moveCaretForward(top: number, left: number) {
  caret!.style.top = `${top + 2}px`;
  caret!.style.left = `${left + 6}px`;
}

function moveCaretBackward(left: number) {
  caret!.style.left = `${left}px`;
}

function resetAgreementContent() {
  Array.from(wordContainer!.children).forEach((w: Element) => {
    Array.from(w.children).forEach((l: Element) => {
      removeStateClass(l as HTMLElement);
    });
  });
}
