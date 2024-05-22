import './App.css';

/*ВЕРСАЛ - ТАМ МОЖНА ЗАДЕПЛОЇТИ ЩОСЬ*/

/** Сделать select с приоритетами (от 1 до 10) и кнопки в карточке, как на скриншоте в конце этого конспекта -
 * Задача со звездочкой - доделать модалку, чтобы по кнопке Save новая задача сохранялась на сервере и появлялась на экране браузера.*/
/** В модалке - заблокировать кнопку Save, пока не будут заполнены инпуты Name и Description.
 Тоже в модалке - чтобы, открывая модалку еще раз после нажатия Save или Cancel, получали пустые инпуты (чтобы начинать добавлять задачу “с чистого листа“)
 Задачка со звездочкой - сделать функцию на кнопки по увеличению/уменьшению приоритета.
 Подсказки тут: https://docs.google.com/document/d/1E1Q62MykrEs66S4zkNmCVo69qrmITb7HiNVrILzvjvY/edit#heading=h.ef5waxa4vpzq
 PS Если кто хочет разобраться, почему сервер присылает ошибку - возможно, дело в том, что сервер ждет строку (priority), а получает число. Можно проверить. В целом сервер работает. (edited) */


/**Доделать кнопки для изменения приоритета и навесить на них disabled, чтобы приоритет можно было менять только в пределах тех чисел, которые в массиве priorities, каторый мы завели в App.js
 Написать такой канбан с нуля минимум 1 раз, в идеале - пока не будет получаться легко и без подглядывания (стянуть код колонок, кнопки или модалки - не подглядывание) (для разнообразия можно использовать MUI или Ant Design или делать запросы на свой сервер)
 Написать ToDo List с axios (вот юрл для запросов: https://expressjs-server.vercel.app/todolist)*/





/* так ми імпортуємо весь bootstrap*/
import 'bootstrap/dist/css/bootstrap.min.css';

/* через axios ми робимо http  запити від клієнта на сервер*/
import axios from 'axios';
import {useEffect, useState} from "react";
import Column from "./components/Column";
import {Button} from "react-bootstrap";
import {Modal} from "reactstrap";
import CreateModal from "./components/CreateModal";


function App() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);

    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    /*тут приклад як ми робимо http запит*/
    const getStatuses = () => {

        axios.get('https://expressjs-server.vercel.app/statuses')
            .then((res) => {
                setStatuses(res.data);
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const getTasks = () => {
        axios.get('https://expressjs-server.vercel.app/tasks').then(res => {

            setTasks(res.data);
            console.log(res.data);
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        getStatuses();
        getTasks();

    }, [])


    const createTasks = (newTask) => {
        axios.post('https://expressjs-server.vercel.app/tasks', newTask)
            .then(res => {
                getTasks();
                console.log(res);
            })
            .catch(e => {
                console.log(e);
                alert("server is unavailable");
            })
    }

   const changeStatus = (task, direction) =>{
       const stringStatuses = statuses.map(el=>el.title);
       const currentIndex = stringStatuses.indexOf(task.status);
       const newIndex = currentIndex+direction;
       const status = stringStatuses[newIndex];
       /* patch - як правило знаходимо щось одне і змінюємо це */
       axios.patch(`https://expressjs-server.vercel.app/tasks/${task._id}`, {status})
           .then(res=>{
               getTasks();
           }).catch(err=>{
               alert("something is going wrong");
       })
   }

   const updateTask = (task) => {
       axios.patch(`https://expressjs-server.vercel.app/tasks/${task._id}`,task)
           .then(res=>{
               getTasks();
           }).catch(err=>{
           alert("something is going wrong");
       })
   }

   const deleteTask = (task) =>{
       axios.delete(`https://expressjs-server.vercel.app/tasks/${task._id}`)
           .then(res=>{
               getTasks();
           }).catch(err=>{
           alert("something is going wrong");
       })
   }



    return (
        <div className="App">
            {/*columns*/}
            <h1>Kanban Bord</h1>
            <CreateModal statuses={statuses}
                         priorities={priorities}
                         createTasks={createTasks}
            />
            <div className="container text-center">
                <div className="row align-items-start">
                    {statuses.map((el, i) => (

                        <Column key={el._id}
                                column={el}
                                tasks={tasks}
                                statuses={statuses}
                                changeStatus={changeStatus}
                                priorities={priorities}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                        />

                    ))}

                </div>
            </div>
        </div>
    );
}

export default App;
