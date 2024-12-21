import TodoCard from './TodoCard';

export default function TodoList(props) {

    const {todos,handleDeleteTodo} = props

    return (
        <div>
            <ul id='main'>
                {todos.map((todo,todoIndex) => {
                    return (
                        <TodoCard key={todoIndex} index={todoIndex}  {...props}>
                            <p>{todo}</p>
                        </TodoCard>
                    )
                })}
            </ul>
        </div>
    )
}
