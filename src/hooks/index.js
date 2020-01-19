import React, { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import { collatedTasksExist } from '../helpers'
import moment from 'moment'

export const UserTasks = selectedProject => {
    const [tasks, setTasks] = useState([])
    const [archivedTasks, setArchivedTasks] = useState([])

    useEffect(() => {

        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', 'XSSnBJTarUMNWaxARuWA')

        unsubscribe =
            selectedProject && !collatedTasksExist(selectedProject)
                ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
                : selectedProject === 'TODAY'
                    ? (unsubscribe = unsubscribe.where(
                        'date',
                        '==',
                        moment().format('DD/YY/YYYY')
                    ))
                    : selectedProject === 'INBOX' || selectedProject === 0
                        ? (unsubscribe = unsubscribe.where('date', '==', ''))
                        : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data()
            }))
            setTasks(selectedProject === 'NEXT_7'
                ? newTasks.filter(
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                        task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            )
            setArchivedTasks(newTasks.filter(task => task.archived !== false))
        })
        return () => unsubscribe()
    }, [selectedProject])
    return { tasks, archivedTasks }
}

export const useProjects = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', 'XSSnBJTarUMNWaxARuWA')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id
            }))
            if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects)
            }
        })
    }, [projects])
    return { projects, setProjects}
}