import MyCalendar from "./Calendar/Calendar";
import "./Home.css";
const HomeAhead = () => {
  return (
    <>
      <div className="homepage-container">  
          <h1 className="app-title">Bienvenue dans l'App AHEAD</h1>
      </div>
      <MyCalendar></MyCalendar>
    </>
  );
};
export default HomeAhead;
