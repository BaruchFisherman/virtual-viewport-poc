function trimUnits(size) {
  return size.slice(0, size.length - 2);
}

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function handleResize(...subjects) {
  return ({ target }) => {
    updateViewportHeight();
    subjects.forEach((s) => s.update(target));
  };
}

function main(_) {
  updateViewportHeight();
  const subject = {
    element: document.querySelector("#virtual-viewport"),
    update({ innerWidth, innerHeight }) {
      const { width, height } = getComputedStyle(this.element);
      const scale = Math.min(
        innerWidth / parseFloat(trimUnits(width)),
        innerHeight / parseFloat(trimUnits(height))
      );
      this.element.style.transform = `scale(${scale})`;
    },
  };

  const handleResizeMemo = handleResize(subject);
  handleResizeMemo({target: window})
  window.addEventListener("resize", handleResizeMemo);
}

window.addEventListener("DOMContentLoaded", main);
