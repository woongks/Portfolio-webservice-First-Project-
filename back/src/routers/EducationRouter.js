import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { EducationService } from "../services/educationService"

const educationRouter = Router()
educationRouter.use(loginRequired)

educationRouter.post("/education/create", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }
        const { userId, school, major, position } = req.body
        const newEducation = await EducationService.addEdu({
            userId,
            school,
            major,
            position,
        })

        if (newEducation.errorMessage) {
            throw new Error(newEducation.errorMessage)
        }

        res.status(201).json(newEducation)
    } catch (error) {
        next(error)
    }
})
educationRouter.get("/educations/:id", async function (req, res, next) {
    try {
        const educationId = req.params.id
        const currentEduInfo = await EducationService.getEduInfo({
            educationId,
        })

        if (currentEduInfo.errorMessage) {
            throw new Error(currentEduInfo.errorMessage)
        }

        res.status(200).send(currentEduInfo)
    } catch (error) {
        next(error)
    }
})

educationRouter.put("/educations/:id", async function (req, res, next) {
    try {
        const educationId = req.params.id
        const school = req.body.school ?? undefined
        const major = req.body.major ?? undefined
        const position = req.body.position ?? undefined

        const toUpdate = { school, major, position }

        const updatedEducation = await EducationService.updateEducation({
            educationId,
            toUpdate,
        })

        if (updatedEducation.errorMessage) {
            throw new Error(updatedEducation.errorMessage)
        }

        res.status(200).json(updatedEducation)
    } catch (error) {
        next(error)
    }
})

educationRouter.get("/educationlist/:userId", async function (req, res, next) {
    try {
        const userId = req.params.userId
        const currentEducationInfo = await EducationService.getEducationInfo({
            userId,
        })

        if (currentEducationInfo.errorMessage) {
            throw new Error(currentEducationInfo.errorMessage)
        }

        res.status(200).send(currentEducationInfo)
    } catch (error) {
        next(error)
    }
})
educationRouter.delete("/educations/:id", async (req, res, next) => {
    try {
        const educationId = req.params.id
        console.log(educationId)

        const result = await EducationService.deleteEducation({ educationId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export { educationRouter }
