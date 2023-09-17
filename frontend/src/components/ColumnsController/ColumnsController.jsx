import './ColumnsController.css';

const ColumnsController = () => {
  const handleClick = (columnName) => {
    if (columnName === 'CHATS') {
      const offsetTop = document.querySelector('div.column.chats-column').offsetTop;
      window.scrollTo(0, offsetTop - 100);
    } else if (columnName === 'FRIENDS') {
      const offsetTop = document.querySelector('div.column.friends-column').offsetTop;
      window.scrollTo(0, offsetTop - 100);
    } else if (columnName === 'USERS') {
      const offsetTop = document.querySelector('div.column.new-users-column').offsetTop;
      window.scrollTo(0, offsetTop - 100);
    }
  };
  return (
    <div className="columns-controller">
      <ul>
        {/* <li>
          <span className="material-symbols-outlined" onClick={() => handleClick('CHATS')}>
            mail
          </span>
        </li> */}
        <li>
          <span className="material-symbols-outlined" onClick={() => handleClick('FRIENDS')}>
            person
          </span>
        </li>
        <li>
          <span className="material-symbols-outlined" onClick={() => handleClick('USERS')}>
            person_add
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ColumnsController;
