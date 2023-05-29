import "./App.css";
import WebProjects from "./components/WebProjects";
import PostData from "./components/PostData";
import DeleteData from "./components/DeleteData";
import ModifyData from "./components/ModifyData";

function App() {
  return (
    <div>
      <div className="form-container">
        <PostData />
        <DeleteData />
        <ModifyData />
      </div>
      <div className="list-container">
        <WebProjects />
      </div>
    </div>
  );
}

export default App;
