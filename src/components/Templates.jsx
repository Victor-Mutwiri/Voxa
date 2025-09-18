import "../styles/Templates.css";
import Message from "./EmailTemplate/Message";
import Subject from "./EmailTemplate/Subject";
import EmailBodies from "./EmailTemplate/EmailBodies";
import EmailSubjects from "./EmailTemplate/EmailSubjects";
import Templatespreview from "./EmailTemplate/Templatespreview";

const Templates = () => {

  return (
    <div className="templates-root">
      <div className="templates">
        <Subject />
        <Message />
      </div>
      <div className="templates-section">
        <div>
          <h3>Saved Templates</h3>
          <div className="templates-lists">
            <EmailSubjects />
            <EmailBodies />
          </div> 
        </div>
        <div className="templates-preview">
          <Templatespreview/>
        </div>
      </div>
    </div>
  );
};

export default Templates;
