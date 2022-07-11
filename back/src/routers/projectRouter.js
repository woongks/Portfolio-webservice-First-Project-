import is from "@sindresorhus/is"
import { Router } from "express"
const projectRouter = Router()

import { loginRequired } from "../middlewares/loginRequired"

import { ProjectService } from "../services/projectService"
projectRouter.use(loginRequired)

projectRouter.post("/project/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }
        const { userId, title, description, fromDate, toDate } = req.body

        const newProject = await ProjectService.addProject({
            userId,
            title,
            description,
            fromDate: fromDate,
            toDate: toDate,
        })

        res.status(201).json({
            newProject,
        })
    } catch (error) {
        next(error)
    }
})

projectRouter.get("/projects/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id

        const project = await ProjectService.getProject({ projectId })
        if (project.errorMessage) {
            throw new Error(project.errorMessage)
        }

        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
})

projectRouter.put("/projects/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id

        const title = req.body.title ?? undefined
        const description = req.body.description ?? undefined
        const fromDate = req.body.fromDate ?? undefined
        const toDate = req.body.toDate ?? undefined

        const updateData = { title, description, fromDate, toDate }

        const project = await ProjectService.updateProject({
            projectId,
            updateData,
        })
        if (project.errorMessage) {
            throw new Error(project.errorMessage)
        }

        res.status(200).json({
            project,
        })
    } catch (error) {
        next(error)
    }
})

projectRouter.get("/projectlist/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const projectList = await ProjectService.getProjectList({ userId })
        res.status(200).json(projectList)
    } catch (error) {
        next(error)
    }
})

projectRouter.delete("/projects/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id
        console.log(projectId)

        const result = await ProjectService.deleteProject({ projectId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export { projectRouter }
