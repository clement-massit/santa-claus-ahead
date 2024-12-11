import "./Terminal.css";

const Terminal = ([text]) => {
  return (
    <>
      <div class="terminal-loader">
        <div class="terminal-header">
          <div class="terminal-title"></div>
          <div class="terminal-controls">
            <div class="control close"></div>
            <div class="control minimize"></div>
            <div class="control maximize"></div>
          </div>
        </div>
        <div class="text">{text}</div>
      </div>
    </>
  );
};

export default Terminal;
