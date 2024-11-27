import "./background.scss";

const Background = () => {
  return (
    <>
      <div className="wrapper">
        <h2 className="holidays-title">Va te faire enculer !</h2>
        <div className="scene">
          <div className="xmas-tree">
            <div className="tree-star"></div>
            <div className="tree-leaves">
              <div className="tree-part">
                <div className="tree-lights left">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
                <div className="tree-lights right">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
              </div>
              <div className="tree-part">
                <div className="tree-lights left">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
                <div className="tree-lights right">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
              </div>
              <div className="tree-part">
                <div className="tree-lights left">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
                <div className="tree-lights right">
                  <div className="light-bulb red"></div>
                  <div className="light-bulb yew"></div>
                  <div className="light-bulb purple"></div>
                  <div className="light-bulb blue"></div>
                </div>
              </div>
            </div>
            <div className="tree-base">
              <div className="tree-stalk"></div>
              <div className="tree-jar"></div>
            </div>
          </div>
          <div className="room-window">
            <div className="xmas-sky">
              <div className="snow"></div>
              <div className="snow-ground"></div>
              <div className="santa-claus">
                <div className="sc-head">
                  <div className="sc-hat">
                    <div className="hat-tip"></div>
                  </div>
                  <div className="eyes"></div>
                  <div className="nose"></div>
                  <div className="beard"></div>
                  <div className="ears">
                    <div className="ear left"></div>
                    <div className="ear right"></div>
                  </div>
                </div>
                <div className="sc-body"></div>
              </div>
            </div>
          </div>
          <div className="xmas-gifts">
            <div className="xmas-gift square">
              <div className="tie-wrap">
                <div className="tie"></div>
                <div className="tie reflected"></div>
              </div>
            </div>
            <div className="xmas-gift rectangular">
              <div className="tie-wrap">
                <div className="tie"></div>
                <div className="tie reflected"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="ground"></div>
      </div>
    </>
  );
};

export default Background;
