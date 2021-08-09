import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { addProject, Project } from '../store/investmentSlice';
import { useHistory } from 'react-router';

const ProjectSelectionScreen = () => {
    const { data: projects, loading, error } = useFetch('https://fullstack.linus-capital.com/projects');
    const dispatch = useDispatch();
    const history = useHistory();

    const chooseProject = (project: Project) => {
        dispatch(addProject(project));
        history.push('/project')
    }


    return (
        <main>
            <header>
                <h3>Step 1</h3>
                <h1>Select the project You want to invest in</h1>
            </header>

            {loading && (<div> Loading... </div>)}

            <ul>
                {projects && projects.map((project) => (
                        <li key={project.id} onClick={() => chooseProject(project)}>
                            <p>{project.name}</p>
                            <p>{project.location}</p>
                        </li>
                ))} 
            </ul>

            {!isEmpty(error) && (
                <div role="alert">Required resources could not be found</div>
            )}
            
        </main>
    )
}

export default ProjectSelectionScreen
