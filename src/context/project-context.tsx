import { FC, useMemo, useState, useContext, useCallback, createContext } from 'react';

// Define the type for the project object
type Project = {
  tokenAddress: string;
  id: string;
};

// Define the initial projects object
const initialProjects: {
  projects: {
    [key: string]: Project;
  };
  setProjectValues: (uuid: string, project: Project) => void;
  getProject: (uuid: string) => Project;
  // setProjectsValuesBulk?: (Record<string, any>[]) => void;
} = {
  projects: {},
  setProjectValues: () => {},
  getProject: () => ({
    tokenAddress: '',
    id: '',
  }),
  // setProjectsValuesBulk: () => {}
};

// Create the project context
const ProjectContext = createContext(initialProjects);

type ProjectProviderProps = {
  children: React.ReactNode;
};

const ProjectProvider: FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects.projects);

  const setProjectValues = (uuid: string, project: Project) => {
    setProjects((prevProjects) => ({
      ...prevProjects,
      [uuid]: project,
    }));
  };

  const setProjectsValuesBulk = useCallback(() => {
    // Implement this function to set multiple projects at once
  }, []);

  const getProject = useCallback(
    (uuid: string) => {
      const project = projects[uuid];
      if (!project) {
        throw new Error(`Project with uuid ${uuid} not found`);
      }
      return project;
    },
    [projects]
  );

  const contextValue = useMemo(
    () => ({
      projects,
      setProjectValues,
      getProject,
    }),
    [getProject, projects]
  );

  return <ProjectContext.Provider value={contextValue}>{children}</ProjectContext.Provider>;
};

export default ProjectProvider;

export const useProjectContext = () => {
  if (!ProjectContext) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return useContext(ProjectContext);
};
