import "../styles/Templates.css";
import Message from "./EmailTemplate/Message";
import Subject from "./EmailTemplate/Subject";

const Templates = () => {

  return (
    <div className="templates-root">
      <div>
        <Subject />
        <Message />
      </div>
      <div>
        <p>Drop down list of subjects and emails goes here</p>
        <p>User selects the configuration they want and click activate</p>
        <div>
          <p>The full body section with both the subject and email goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Templates;
