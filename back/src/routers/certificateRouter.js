import is from "@sindresorhus/is"
import { Router } from "express"
import { loginRequired } from "../middlewares/loginRequired.js"
import { CertificateService } from "../services/certificateService.js"

const certificateRouter = Router()
certificateRouter.use(loginRequired)

certificateRouter.post("/certificate/create", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            )
        }

        const { userId, title, description, whenDate } = req.body
        const newCertificate = await CertificateService.addCertificate({
            userId,
            title,
            description,
            whenDate,
        })

        res.status(201).json(newCertificate)
    } catch (error) {
        next(error)
    }
})

certificateRouter.get("/certificates/:id", async function (req, res, next) {
    try {
        const certificateId = req.params.id

        const certificate = await CertificateService.getCertificate({
            certificateId,
        })

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage)
        }

        res.status(200).json(certificate)
    } catch (error) {
        next(error)
    }
})

certificateRouter.put("/certificates/:id", async function (req, res, next) {
    try {
        const certificateId = req.params.id

        const title = req.body.title ?? undefined
        const description = req.body.description ?? undefined
        const whenDate = req.body.whenDate ?? undefined
        const toUpdate = { title, description, whenDate }

        const certificate = await CertificateService.updateCertificate({
            certificateId,
            toUpdate,
        })

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage)
        }

        res.status(200).json(certificate)
    } catch (error) {
        next(error)
    }
})

certificateRouter.delete("/certificates/:id", async function (req, res, next) {
    try {
        const certificateId = req.params.id

        const result = await CertificateService.deleteCertificate({
            certificateId,
        })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})

certificateRouter.get(
    "/certificatelist/:userId",
    async function (req, res, next) {
        try {
            const userId = req.params.userId
            const certificateList = await CertificateService.getCertificateList(
                {
                    userId,
                }
            )
            res.status(200).json(certificateList)
        } catch (error) {
            next(error)
        }
    }
)

export { certificateRouter }
