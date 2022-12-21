import css from "./Recordlist.module.css";

const Recordlist = ({ recordList }) => {
  return (
    <>
      <div className={css.recordList}>
        <span className={css.recordtitle}>List of record holders</span>
        <ul>
          <li key="header" className={css.recordItem}>
            <span className={css.titlecolumn}>name</span>
            <span className={css.titlecolumn}>points</span>
          </li>
          {recordList.map(({ id, name, points }) => {
            return (
              <li key={id} className={css.recordItem}>
                <span>{name}</span>
                <span>{points}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Recordlist;
