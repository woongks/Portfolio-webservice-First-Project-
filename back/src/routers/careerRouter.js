import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired"
import { CareerService } from "../services/careerService"

const careerRouter = Router()

careerRouter.use(loginRequired)

careerRouter.post("/career/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const { userId, company, fromDate, toDate } = req.body
        const createdData = await CareerService.addCareer({
            userId,
            company,
            fromDate,
            toDate,
        })

        res.status(201).json(createdData)
    } catch (error) {
        next(error)
    }
})

careerRouter.get("/careers/:id", async (req, res, next) => {
    try {
        const userId = req.params.id
        const career = await CareerService.getCareer({ userId })

        if (career.errorMessage) {
            throw new Error(career.errorMessage)
        }

        res.status(200).json(career)
    } catch (error) {
        next(error)
    }
})

careerRouter.put("/careers/:id", async (req, res, next) => {
    try {
        const { company, fromDate, toDate } = req.body
        const userId = req.params.id
        console.log(req.body)

        const updatedCareer = await CareerService.updateCareer({
            userId,
            company,
            fromDate,
            toDate,
        })
        res.status(200).json(updatedCareer)
    } catch (error) {
        next(error)
    }
})

careerRouter.get("/careerlist/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const careerList = await CareerService.getCareerList({ userId })

        if (careerList.errorMessage) {
            throw new Error(careerList.errorMessage)
        }

        res.status(200).json(careerList)
    } catch (error) {
        next(error)
    }
})

careerRouter.delete("/careers/:id", async function (req, res, next) {
    try {
        const careerId = req.params.id

        const result = await CareerService.deleteCareer({ careerId })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

export { careerRouter }
