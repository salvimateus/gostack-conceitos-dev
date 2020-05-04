import React, { useState } from 'react'
import api from './services/api'

import './App.css'
// import bgImage from './assets/background.jpg'

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState(['a', 'b', 'c'])

    // useState retorna um array com 2 posições: varíavel / função que altera a variável

    // imutabilidade: não altera a variável (soma, subtrai, concatena), mas sim retorna ela por completo com o novo valor, como se fosse atribuir do zero

    function handleAddProject() {
        // projects.push(`novo projeto ${Date.now()}`)

        setProjects([...projects, `novo projeto ${Date.now()}`])

        // console.log(projects)
    }

    return (
        <div>
            <Header title="Home">
                Legal A

                {/* <img width={300} src={bgImage} /> */}

                <ul>
                    {projects.map(project => <li key={project}>{project}</li>)}
                </ul>

                <button onClick={handleAddProject}>Add projeto</button>
            </Header>
        </div>
    )
}

export default App