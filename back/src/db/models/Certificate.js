import { certificateModel } from "../schemas/certificate.js"

class Certificate {
    static create = async ({ newCertificate }) => {
        const createdNewCertificate = await certificateModel.create(
            newCertificate
        )
        return createdNewCertificate
    }

    static findById = async ({ certificateId }) => {
        const certificate = await certificateModel.findOne({
            id: certificateId,
        })
        return certificate
    }

    static findByUserId = async ({ userId }) => {
        const certificates = await certificateModel.find({ userId })
        return certificates
    }

    static update = async ({ certificateId, toUpdate }) => {
        const filter = { id: certificateId }
        const updatedContent = toUpdate
        const option = { returnOriginal: false }
        const updatedCertificate = await certificateModel.findOneAndUpdate(
            filter,
            updatedContent,
            option
        )
        return updatedCertificate
    }

    static deleteById = async ({ certificateId }) => {
        const deleteResult = await certificateModel.deleteOne({
            id: certificateId,
        })
        const isDataDeleted = deleteResult.deletedCount === 1
        return isDataDeleted
    }
}

export { Certificate }
