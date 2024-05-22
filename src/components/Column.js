import React from 'react';
import Tasks from "./Tasks";

const Column = ({column,tasks,statuses,changeStatus,priorities,updateTask,deleteTask}) => {
    return (

            <div className="col" >
                <h3>{column.title}</h3>
                {
                    tasks.filter((el)=> el.status === column.status)
                    .map((el)=>
                    (<Tasks  task={el}
                             statuses={statuses}
                             changeStatus={changeStatus}
                             priorities={priorities}
                             updateTask={updateTask}
                             deleteTask={deleteTask}
                    />)
                ) }


            </div>
    )

};

export default Column;