import Form from './components/Form'
import {ToggleContextProvider} from './components/ToggleContext'
import './App.css'

const App = () =>(
    <ToggleContextProvider>
        <Form />
    </ToggleContextProvider>
) 

export default App