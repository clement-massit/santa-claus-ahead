import "./Terminal.css";

const Terminal = ({text}) => {
  return (
    <>
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title"></div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div className="text">{text}</div>
      </div>
    </>
  );
};

export default Terminal;
