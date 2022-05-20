import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setrewind, setrewinyear } from "../actions";
import Library from "./library";
import "./rewind_view.css";

function ViewRewind(props) {
  const [loaded, setLoaded] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [progress, setProgress] = useState(0);
  function STARTED() {
    setTimeout(() => {
      setScroll(1);
    }, 2000);
  }
  useEffect(() => {
    STARTED();
  }, []);
  return (
    <div className="rewind">
      <div className="cards_r" style={{ left: `-${100 * scroll}vw` }}>
        <div className="card_r">
          <h1>[zachęta]</h1>
        </div>
        <div className="card_r">
          <h1>{`W roku ${props.rewindyear} przesłuchałeś _ minut na Duck Music`}</h1>
        </div>
        <div className="card_r">
          <h1>{`W roku ${props.rewindyear} INFOTEXT_INSERT`}</h1>
        </div>
      </div>
      {loaded == false ? (
        <div className="loader_rewind">
          <div id="loading"></div>
        </div>
      ) : (
        ""
      )}
      <div
        className="close"
        onClick={() => {
          document
            .getElementsByClassName("rewind")[0]
            .classList.add("rewindclose");
          setTimeout(() => {
            props.setrewind(false);
          }, 1000);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
    isPlaying: state.isPlaying,
    custplay: state.custplay,
    rewindyear: state.rewindyear,
    rewind: state.rewind,
  };
};

export default connect(mapStateToProps, { setrewind, setrewinyear })(
  ViewRewind
);
